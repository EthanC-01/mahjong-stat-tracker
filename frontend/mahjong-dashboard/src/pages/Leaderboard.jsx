export default function LeaderboardPage() {
    const names = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]
    return (
        <>
            <div className='page-container'>
                <span>Leader</span>
                <div style={{backgroundColor:"#1A1612", height:"150px", borderRadius:"15px", textAlign:"center", color:"white", margin:"0 0 10px 0"}}>Rank 1</div>
                <div style={{backgroundColor:"#f1f1f1", height:"100px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0"}}>rank 2</div>
                <div style={{backgroundColor:"#f1f1f1", height:"100px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0"}}>rank 3</div>
                <span>Rankings</span>
                <div style={{backgroundColor:"#f1f1f1", height:"250px", borderRadius:"15px", textAlign:"center", color:"black", border: "2px solid #A89B8C", margin:"5px 0 0 0", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                    <div style={{backgroundColor:"#A89B8C", height:"10%", textAlign:"center", color:"black"}}>header</div>
                    <div className="table">
                        {names.map((name, i) => (
                            <div style={{textAlign:"center", color:"black", height: "35px", border:"1px solid black"}} key={name}>rank {i+1}</div>
                        ))}
                </div>
                    </div>
            </div>
        </>
    )
}