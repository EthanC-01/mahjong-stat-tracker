import { useState, useEffect } from 'react'
import "../components/navTab.css"

export default function StatsPage({leaderboard}) {
    const [stats, setStats] = useState([]);
    const [showPlayers, setPlayers] = useState(false);
    const [displayedName, setName] = useState("");
    const [playerId, setPlayerId] = useState(0);
    
    useEffect(() => {
        const fetchStats = async () => {
        try {
            const res = await fetch(`http://localhost:8000/stats/${playerId}`);
            
            if (!res.ok) {
                console.log(res.status);
                return;
            }

            const data = await res.json();
            setStats(data);
        } catch {
            console.log("Failed to fetch");
        }
        };
        fetchStats();
    }, [playerId]);
                    
    return (
        <>
            <div className='page-container'>
                <div className='nav'>
                    <button className='nav-tab'>{"<"}</button>
                    <button style={{width:"70%", borderRadius:"10px"}} onClick={()=>setPlayers(!showPlayers)}>{displayedName}</button>
                    <button className='nav-tab'>{">"}</button>
                </div>
                <div style={{backgroundColor:"#f1f1f1", height:"300px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                    <div className="table">
                        {stats.map((player, i) => (
                            <div style={{textAlign:"center", color:"black", height: "35px", width:"100%",borderLeftStyle:"none", borderRightStyle:"none", fontSize:"14px"}} onClick={() => {setName(player.players.player_name); setPlayerId(player.players.player_id)}} key={i}>
                                Rank {player.rank} - {player.points}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showPlayers && (
                <div style={{backgroundColor:"#f1f1f1", height:"200px", width:"200px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                    <div className="table">
                        {leaderboard.map((player, i) => (
                            <button style={{textAlign:"center", color:"black", height: "35px", width:"100%",borderLeftStyle:"none", borderRightStyle:"none", fontSize:"14px"}} onClick={() => {setName(player.players.player_name); setPlayerId(player.players.player_id)}} key={i}>
                                Rank {player.rank} - {player.players.player_name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}