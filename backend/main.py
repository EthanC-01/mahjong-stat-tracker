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
    result = supabase.table("player_stats").select("*").order("rank", desc=False).execute()
    return result.data
