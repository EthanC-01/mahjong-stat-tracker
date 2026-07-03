import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

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

def get_supabase() -> Client:
    return create_client(
        os.environ["SUPABASE_URL"],
        os.environ["SUPABASE_SECRET_KEY"]
    )

class PlayerScore(BaseModel):
    wind: str
    name: str
    state: str
    winningHand: str
    bonusPoints: int

class RoundScore(BaseModel):
    players: list[PlayerScore]

@app.post("/players")
def submit_score(result: RoundScore):
    print(result)
    print(result.players[0])
    return result


@app.get("/leaderboard")
def get_scores(supabase = Depends(get_supabase)):
    result = supabase.from_("player_stats").select("*, players(player_id, player_name)").order("rank", desc=False).execute()
    return result.data

@app.get("/stats/{player_id}")
def get_stats(player_id: int, supabase = Depends(get_supabase)):
    print(player_id)
    result = supabase.from_("player_stats").select("*").eq("player_id", player_id).order("rank", desc=False).execute()
    return result.data