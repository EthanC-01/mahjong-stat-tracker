import { useState, useEffect } from 'react'
export default function StatsPage() {
    const [stats, setStats] = useState([]);
    
    useEffect(() => {
        const fetchStats = async () => {
        try {
            const res = await fetch("http://localhost:8000/stats");
            
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
    }, []);
                    
    return (
        <>
            <div className='page-container'>
                <div style={{backgroundColor:"#f1f1f1", height:"300px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                    <div className="table">
                    </div>
                </div>
            </div>
        </>
    )
}