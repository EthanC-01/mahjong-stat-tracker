import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


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