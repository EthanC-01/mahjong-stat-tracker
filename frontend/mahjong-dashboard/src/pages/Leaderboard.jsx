import { useState, useEffect } from 'react'
export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState([]);
    
    useEffect(() => {
        const fetchLeaderboard = async () => {
        try {
            const res = await fetch("http://localhost:8000/leaderboard");
            
            if (!res.ok) {
                console.log(res.status);
                return;
            }

            const data = await res.json();
            setLeaderboard(data);
        } catch {
            console.log("Failed to fetch");
        }
        };
        fetchLeaderboard();
    }, []);
    return (
        <>
            <div className='page-container'>
                {/*
                <span>Leader</span>
                <div style={{backgroundColor:"#1A1612", height:"150px", borderRadius:"15px", textAlign:"center", color:"white", margin:"0 0 10px 0"}}>Rank 1</div>
                <div style={{backgroundColor:"#f1f1f1", height:"100px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0"}}>rank 2</div>
                <div style={{backgroundColor:"#f1f1f1", height:"100px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0"}}>rank 3</div>
                */}
                <span>Rankings</span>
                <div style={{backgroundColor:"#f1f1f1", height:"300px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                    <div style={{backgroundColor:"#A89B8C", height:"15%", textAlign:"center", color:"black"}}>header</div>
                    <div className="table">
                        {leaderboard.map((player, i) => (
                            <div style={{textAlign:"center", color:"black", height: "35px", border:"1px solid black"}} key={i}>name:{player.player_id} rank:{player.rank}</div>
                        ))}
                </div>
                    </div>
            </div>
        </>
    )
}