    import { useState } from 'react'
    
    export default function PlayerPage({players, visibleTab, toggleActive, addPlayers}) {
        const [newPlayer, setNew] = useState("");

        const handleSubmit = async () => {
            const name = newPlayer.trim()
            try {
                const res = await fetch("http://localhost:8000/players/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({player_name: name}),
            });
        
            if (!res.ok) {
            console.log(res.status)
            return;
            }

            const data = await res.json();
            addPlayers(prev => [...prev, data]);
            setNew("");
            } catch {
            console.log("Failed to fetch")
            }
        }

        return(
        <>
            <div className="page-container" style={{display: visibleTab ? "block" : "none"}}>
                <div style={{height:"100%", display:"flex", flexDirection:"column", gap:"10px"}}>
                    <div style={{height:"90%", overflow:"scroll"}}>
                        {players.map((player) => (
                            <button className="players" key={player.player_id} style={{backgroundColor: player.active ? "#1A1612" : "#f1f1f1", color: player.active ? "#F7F3ED" : "#1A1612"}} onClick={()=>toggleActive(player)}>{player.player_name}</button>                
                        ))}
                    </div>
                    <div style={{height:"10%", borderTop:"1px solid black", display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                        <input type='text' value={newPlayer} onChange={(e) => setNew(e.target.value)} style={{ width:"75%", borderRadius:"10px", border:"1px solid black", fontSize:"1rem", padding:"10px"}}/>
                        <button style={{width:"20%", borderRadius:"10px", border:"1px solid black", background:"#1A1612", color: "white"}} onClick={handleSubmit}>Add Player</button>
                    </div>
                </div>
            </div>
        </>
        )
    }