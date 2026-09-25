import { useState, useEffect } from 'react'
import "../components/navTab.css"

export default function StatsPage({leaderboard, visibleTab}) {
    const [stats, setStats] = useState([]);
    const [showPlayers, setPlayers] = useState(false);
    const [displayedName, setName] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const pstats = ["rank", "wins", "losses", "draws", "feeds", "points", "bonus_points", "total_points"]

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
                    <div style={{display:"block", zIndex:"2", position:"absolute", left:"39.80%", top:"132px"}}>
                    {showPlayers && (
                    <div style={{backgroundColor:"#f1f1f1", height:"200px", width:"390px", borderRadius:"15px", textAlign:"center", color:"black", margin:"5px 0 0 0", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                        <div className="table">
                            {leaderboard.map((player, i) => (
                                <button style={{textAlign:"center", color:"black", height: "35px", width:"100%", fontSize:"14px"}} onClick={() => {setName(player.players.player_name); setPlayerId(player.players.player_id); setPlayers(!showPlayers)}} key={i}>
                                    Rank {player.rank} - {player.players.player_name}
                                </button>
                            ))}
                        </div>
                    </div>
                    )}
                    </div>
                </div>
                
                
                <span>Overview</span>
                <div style={{paddingBottom:"10%"}}>
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

                <span>Hands Played</span>
                <div>
                    <div style={{backgroundColor:"#f1f1f1", borderRadius:"15px", border: "2px solid #A89B8C", margin:"5px 0 0 0", display:"flex", flexDirection:"column"}}>
                        {stats.hands_played?.map((hand) =>(
                            <div>{hand.hand_name}: {hand.times_played}</div>
                        ))}
                    </div>
                </div>

                <span>Feeds</span>
                <div>
                    <div style={{backgroundColor:"#f1f1f1", borderRadius:"15px", border: "2px solid #A89B8C", margin:"5px 0 0 0", display:"flex", flexDirection:"column"}}>
                        {stats.feeds?.map((feed) =>(
                            <div>{feed.winner_name}: {feed.times_fed}</div>
                        ))}
                    </div>
                </div>


                <span>Match History</span>
                <div style={{backgroundColor:"#f1f1f1", height:"50px", borderRadius:"15px", border: "2px solid #A89B8C", margin:"5px 0 0 0"}}>
                        {stats && (
                            <div style={{display:"flex", height:"100%", alignItems:"center", paddingLeft:"10px", paddingRight:"10px", justifyContent:"space-between"}}>
                                <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                                    {stats.match_history?.map((games, i) => (
                                        <div className='win-loss' style={ games.winner ? {backgroundColor: "green"} : {backgroundColor: "red"} } key={i}>{games.winner ? "W": "L"}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                </div>
            </div>
        </>
    )
}