    import { useState } from 'react'
    import ScoringCard from '../components/scoringCard';
    
    export default function ScoringPage({visibleTab}) {
        
        const [turnOrder, setTurn] = useState([])

        const [players, setPlayer] = useState([
            { wind: "東", id: "1", name: "Player 1", state: "none", winningHand: "", bonusPoints: 0 },
            { wind: "南", id: "2",name: "Player 2", state: "none", winningHand: "", bonusPoints: 0 },
            { wind: "北", id: "3",name: "Player 3", state: "none", winningHand: "", bonusPoints: 0 },
            { wind: "西", id: "4",name: "Player 4", state: "none", winningHand: "", bonusPoints: 0 },
        ]);

        const updatePlayer = (index, updates) => {
            setPlayer((prev) =>
            prev.map((player, i) => (i === index ? { ...player, ...updates } : player))
            );
        };

        const shuffleOrder = async () => {
        try {
            const res = await fetch("http://localhost:8000/players/shuffle", {
                method: "POST",
            });
            
            if (!res.ok) {
                console.log(res.status);
                return;
            }

            const data = await res.json();
            setTurn(data);
        } catch {
            console.log("Failed to fetch");
        }
        };

        {/*TODO add error checks e.g. valid winning hand, only 1 winner, only 1 loser*/}
        const handleSubmit = async () => {
            try {
            const res = await fetch("http://localhost:8000/players", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({players: players}),
            });
        
            if (!res.ok) {
            console.log(res.status)
            return;
            }

            const data = await res.json();
            console.log(data);
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
                    {turnOrder.map((player) => (
                        <div key={player.player_id} className='player-turns'>{player.player_name}</div>                
                    ))}
                </div>
                <div style={{display:"flex", paddingTop:"1%", justifyContent:"center"}}>
                    <button className='button1' onClick={shuffleOrder}>Shuffle</button>
                </div>
            </div>
            
                <div className='card-container'>
                {/*Add logic for players names and player turn order*/}
                {players.map((player, i) => (
                <ScoringCard 
                    key={i} 
                    wind={player.wind} 
                    id={player.id}
                    name={player.name} 
                    currentState={player.state}
                    winningHand={player.winningHand} 
                    bonusPoints={player.bonusPoints}
                    onChange={(updates) => updatePlayer(i, updates)}
                />
                ))}
            </div>
            <button className='submit' onClick={handleSubmit}>Submit</button>

            </div>
        </>
        )
    }