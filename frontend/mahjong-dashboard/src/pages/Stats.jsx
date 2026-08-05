import { useState, useEffect } from 'react'
import "../components/navTab.css"

export default function StatsPage({leaderboard, visibleTab}) {
    const [stats, setStats] = useState([]);
    const [showPlayers, setPlayers] = useState(false);
    const [displayedName, setName] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const pstats = ["rank", "wins", "losses", "draws", "longest_win_streak", "longest_loss_streak"]
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
            <div style={{display: visibleTab ? "block" : "none"}}>
                <div>
                    <div className='nav'>
                        <button className='nav-tab'>{"<"}</button>
                        <button style={{width:"390px", borderRadius:"10px"}} onClick={()=>setPlayers(!showPlayers)}>{displayedName}</button>
                        <button className='nav-tab'>{">"}</button>
                    </div>
                    <div style={{display:"block", zIndex:"2", position:"absolute", left:"39.80%", top:"167px"}}>
                    {showPlayers && (
                    <div style={{backgroundColor:"#f1f1f1", height:"200px", width:"390px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                        <div className="table">
                            {leaderboard.map((player, i) => (
                                <button style={{textAlign:"center", color:"black", height: "35px", width:"100%",borderLeftStyle:"none", borderRightStyle:"none", fontSize:"14px"}} onClick={() => {setName(player.players.player_name); setPlayerId(player.players.player_id)}} key={i}>
                                    Rank {player.rank} - {player.players.player_name}
                                </button>
                            ))}
                        </div>
                    </div>
                    )}
                    </div>
                </div>
                
                


                <span>Overview</span>
                <div style={{height: "150px"}}>
                    {stats && (
                        <div style={{color:"black", width:"100%",borderLeftStyle:"none", borderRightStyle:"none", fontSize:"14px", display:"flex", gap: "10px", flexWrap:"wrap", justifyContent:"center"}}>
                            {pstats.map((stat) => (
                                <div style={{textAlign:"center", backgroundColor:"#f1f1f1", height: "50px", width:"60px", border: "1px solid black", borderRadius:"5px", display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:"1.5rem", fontWeight:"bold"}}>{stats.player_results?.[0]?.[stat]}</span>
                                    <span style={{fontSize:".6rem", color:"grey"}}>{stat.replace(/[_]/g, " ")}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <span>Match History</span>
                <div style={{backgroundColor:"#f1f1f1", height:"40px", borderRadius:"15px", border: "2px solid #A89B8C", margin:"5px 0 0 0"}}>
                        {stats && (
                            <div style={{display:"flex", height:"100%", alignItems:"center", paddingLeft:"10px", paddingRight:"10px", justifyContent:"space-between"}}>
                                <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                                    {stats.match_history?.map((games, i) => (
                                        <div style={{borderRadius:"1000px", border: "1px solid black", height:"30px", width:"30px", display:"flex", alignItems:"center", justifyContent:"center"}} key={i}>{games.winner ? "W": "L"}</div>
                                    ))}
                                </div>
                                <div style={{textAlign:"right", fontSize:"0.8rem"}}>{(stats.player_results?.[0]?.current_win_streak) > (stats.player_results?.[0]?.current_loss_streak) ? `↑ ${stats.player_results?.[0]?.current_win_streak} streak` : `↓ ${stats.player_results?.[0]?.current_loss_streak} streak`}</div>
                            </div>
                        )}
                        
                </div>
            </div>
        </>
    )
}