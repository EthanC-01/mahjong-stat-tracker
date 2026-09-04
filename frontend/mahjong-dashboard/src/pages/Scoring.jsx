    import { useState } from 'react'
    import ScoringCard from '../components/scoringCard';
    
    export default function ScoringPage({visibleTab, turnOrder, shuffle, validHands, changeOrder}) {
        
        const playing = turnOrder.slice(0,4);

        const winds = ["東", "南", "北", "西"]

        const [scores, setScores] = useState([
            { state: "none", winningHand: "", bonusPoints: 0 },
            { state: "none", winningHand: "", bonusPoints: 0 },
            { state: "none", winningHand: "", bonusPoints: 0 },
            { state: "none", winningHand: "", bonusPoints: 0 },
        ]);

        const updateScore = (index, updates) => {
            setScores((prev) =>
            prev.map((score, i) => {
                if (i !== index) {
                    return score;
                }

                const j = { ...score, ...updates };
                if (j.state !== "win") {
                    j.winningHand = "";
                }
                return j
        }));
    };

        {/*TODO add error checks e.g. valid winning hand, only 1 winner, only 1 loser*/}
        const handleSubmit = async () => {
            const submission = scores.map((score, i) => ({
                player_id: playing[i].player_id,
                state: score.state,
                winning_hand: score.winningHand ? Number(score.winningHand) : null,
                bonus_points: Number(score.bonusPoints),
            }));
            try {
                const res = await fetch("http://localhost:8000/players", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({players: submission}),
            });
        
            if (!res.ok) {
            console.log(res.status)
            return;
            }

            const data = await res.json();
            changeOrder(data.order)
            setScores(scores.map(() => ({ state: "none", winningHand: "", bonusPoints: 0 })));
            } catch {
            console.log("Failed to fetch")
            }
        }

        return(
        <>
            <div className="page-container" style={{display: visibleTab ? "block" : "none"}}>
                <div style={{paddingBottom:"10%"}}>
                turn order
                <div className='turn-order'>
                    {turnOrder.map((player, i) => (
                        <div
                            key={player.player_id}
                            className='player-turns'
                            style={{
                                backgroundColor: i < 4 ? "#1A1612" : "#f1f1f1",
                                color: i < 4 ? "#F7F3ED" : "#1A1612"
                            }}
                        >
                            {player.player_name}
                        </div>
                    ))}
                </div>
                <div style={{display:"flex", paddingTop:"1%", justifyContent:"center"}}>
                    <button className='button1' onClick={shuffle}>Shuffle</button>
                </div>
            </div>
            
                <div className='card-container'>
                {scores.map((score, i) => {
                    const player = playing[i];
                    if (!player) return null;

                    return (
                        <ScoringCard
                            validHands={validHands}
                            key={player.player_id}
                            wind={winds[i]}
                            id={player.player_id}
                            name={player.player_name}
                            currentState={score.state}
                            winningHand={score.winningHand}
                            bonusPoints={score.bonusPoints}
                            onChange={(updates) => updateScore(i, updates)}
                        />
                    );
                })}
            </div>
            <button className='submit' onClick={handleSubmit}>Submit</button>

            </div>
        </>
        )
    }