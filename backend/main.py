import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
from contextlib import asynccontextmanager
import random
import time

load_dotenv()

# Players
player_order = []
rotations = 0

@asynccontextmanager
async def lifespan(app: FastAPI):
    player_order.extend(fetch_all(supabase))
    yield

def fetch_all(supabase) -> list:
    result = supabase.table("players").select("*").execute()
    return result.data    

def fetch_active(supabase) -> list:
    result = supabase.table("players").select("*").eq("active", True).execute()
    return result.data

# shift the array by 3 so 1 player stays on. Once a full cycle occurs shuffle
def rotate():
    global rotations

    if len(player_order) <= 4:
        return player_order
    
    if (len(player_order) % 3 == 0):
        max_rotations = len(player_order) // 3
    else:
        max_rotations = len(player_order)

    rotations += 1
    if rotations > max_rotations:
        rotations = 0
        random.shuffle(player_order)
    else:
        for i in range(3):
            player_order.append(player_order.pop(0))

    return player_order

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url: str = os.environ["SUPABASE_URL"]
key: str = os.environ["SUPABASE_SECRET_KEY"]
supabase: Client = create_client(url, key)

def get_supabase() -> Client:
    return supabase

class PlayerScore(BaseModel):
    player_id: int
    state: str
    winning_hand: int | None
    bonus_points: int = 0

class RoundScore(BaseModel):
    players: list[PlayerScore]

class ActiveStatus(BaseModel):
    active: bool

@app.get("/hands")
def get_hands(supabase = Depends(get_supabase)):
    result = supabase.table("hand_type").select("*").order("hand_id").execute()
    return result.data

# All players in group
@app.get("/players/attending")
def get_players(supabase = Depends(get_supabase)):
    return fetch_all(supabase)

# Player order
@app.get("/players/order")
def get_player_order():
    return player_order

@app.post("/players/shuffle")
def shuffle():    
    random.shuffle(player_order)
    return player_order

@app.get("/players/seated")
def get_seated():
    return player_order[:4]


# setting active status for players
@app.patch("/players/active/{player_id}")
def set_active(player_id: int, status: ActiveStatus, supabase = Depends(get_supabase)):
    supabase.table("players").update({"active": status.active}).eq("player_id", player_id).execute()
    result = fetch_active(supabase)
    player_order.clear()
    player_order.extend(result)
    print(player_order)
    return player_order


# Scoring
@app.post("/players")
def submit_score(result: RoundScore, supabase = Depends(get_supabase)):
    match = supabase.table("matches").insert({"set_id": 4}).execute()
    match_id = match.data[0]["match_id"]
    rows = []
    print(result)
    for player in result.players:
        stats = {
            "match_id": match_id,
            "player_id": player.player_id,
            "winner": player.state == "win",
            "feed": player.state == "feed",
            "draw": player.state == "draw",
            "hand_id": player.winning_hand,
            "bonus_points": player.bonus_points,
        }
        rows.append(stats)

    supabase.table("match_stats").insert(rows).execute()

    rotate()
    print({"order": player_order})
    return {"match_id": match_id, "order": player_order}

# Leaderboard
@app.get("/leaderboard")
def get_scores(supabase = Depends(get_supabase)):
    t0 = time.time()
    result = supabase.from_("player_stats").select("*, players(player_id, player_name)").order("rank", desc=False).execute()
    print(f"query: {time.time() - t0:.3f}s")
    return result.data

# Stats
'''
@app.get("/stats/{player_id}")
def get_stats(player_id: int, supabase = Depends(get_supabase)):
    t0 = time.time()
    hand_data = []
    player_results = supabase.from_("player_stats").select("*").eq("player_id", player_id).order("rank", desc=False).execute()
    match_history = supabase.from_("match_stats").select("*").eq("player_id", player_id).execute()
    hands_played = supabase.from_("hand_played").select("times_used, hand_type(hand_id, hand_name)").eq("player_id", player_id).execute()
    print(f"query: {time.time() - t0:.3f}s")
    for hand in hands_played.data:
        hand_data.append({
            "hand_id": hand["hand_type"]["hand_id"],
            "hand_name": hand["hand_type"]["hand_name"],
            "times_used": hand["times_used"]
        })

    return {
        "player_results": player_results.data,
        "match_history": match_history.data,
        "hands_played": hand_data
    }
'''