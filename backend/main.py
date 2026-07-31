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

app = FastAPI()

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
    name: str
    state: str
    winningHand: str 
    bonusPoints: int

class RoundScore(BaseModel):
    players: list[PlayerScore]

class ActiveStatus(BaseModel):
    active: bool

player_order = []

@app.post("/players")
def submit_score(result: RoundScore, supabase = Depends(get_supabase)):
    match = supabase.table("matches").insert({
        "set_id": 4
    }).execute()

    match_id = match.data[0]["match_id"]

    for player in result.players:
        print(player.name)



    return result

@app.get("/players/order")
def get_player_order():
    return player_order

@app.post("/players/shuffle")
def shuffle():    
    random.shuffle(player_order)
    return player_order

# Everytime attendance is updated the new list will be sent
@app.patch("/players/{player_id}/active")
def set_active(player_id: int, status: ActiveStatus, supabase = Depends(get_supabase)):
    supabase.table("players").update({"active": status.active}).eq("player_id", player_id).execute()

    result = supabase.table("players").select("player_name").eq("active", True).execute()
    players = result.data
    player_order.clear()
    player_order.extend(players)
    return player_order


@app.get("/leaderboard")
def get_scores(supabase = Depends(get_supabase)):
    t0 = time.time()
    result = supabase.from_("player_stats").select("*, players(player_id, player_name)").order("rank", desc=False).execute()
    print(f"query: {time.time() - t0:.3f}s")
    return result.data

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