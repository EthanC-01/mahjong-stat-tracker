import { useState, useEffect } from 'react'
import "../components/navTab.css"

export default function StatsPage({leaderboard}) {
    const [stats, setStats] = useState([]);
    const [showPlayers, setPlayers] = useState(false);
    const [displayedName, setName] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    
    useEffect(() => {
        if (leaderboard.length > 0) {
            setName(leaderboard[0]?.players?.player_name);
            setPlayerId(leaderboard[0]?.player_id);
        }
    }, [leaderboard]);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const res = await fetch(`http://localhost:8000/stats/${playerId}`);
            
            if (!res.ok) {
                console.log(res.status);
                return;
            }

            const data = await res.json();
            console.log(data)
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
                        {stats && (
                            <div style={{textAlign:"center", color:"black", height: "35px", width:"100%",borderLeftStyle:"none", borderRightStyle:"none", fontSize:"14px"}}>
                                Points: {stats.player_results?.[0]?.points} <br/>
                                Wins: {stats.player_results?.[0]?.wins} <br/>
                                Losses: {stats.player_results?.[0]?.losses} <br/>
                                Draws: {stats.player_results?.[0]?.draws} <br/>
                                Rank: {stats.player_results?.[0]?.rank} <br/>
                                Win Streak: {stats.player_results?.[0]?.current_win_streak} <br/>
                                Loss Streak: {stats.player_results?.[0]?.current_loss_streak} <br/>
                                Longest Win Streak: {stats.player_results?.[0]?.longest_win_streak} <br/>
                                Longest Loss Streak: {stats.player_results?.[0]?.longest_loss_streak} <br/><br/>
                                Match History
                                <div style={{display:"flex", flexDirection:"row", gap:"5px", justifyContent:"center"}}>
                                    {stats.match_history?.map((games, i) => (
                                        <div key={i}>{games.winner ? "win": "loss"}</div>
                                    ))}
                                </div>
                            </div>
                        )}
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