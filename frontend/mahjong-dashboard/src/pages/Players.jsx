    import { useState } from 'react'
    
    export default function PlayerPage({players, visibleTab}) {
        return(
        <>
            <div className="page-container" style={{display: visibleTab ? "block" : "none"}}>
                <div style={{height:"100%", display:"flex", flexDirection:"column", gap:"10px"}}>
                    <div style={{height:"90%", display:"flex", flexDirection:"column", gap:"10px"}}>
                    {players.map((player) => (
                        <button className="players" key={player.player_id} style={{backgroundColor: player.active ? "#1A1612" : "#f1f1f1", color: player.active ? "#F7F3ED" : "#1A1612"}}>{player.player_name}</button>                
                    ))}
                    </div>
                    <div style={{height:"10%", borderTop:"1px solid black", display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                        <input type='text' style={{ width:"75%", borderRadius:"10px", border:"1px solid black"}}/>
                        <button style={{width:"20%", borderRadius:"10px", border:"1px solid black", background:"#1A1612", color: "white"}}>Add Player</button>
                    </div>
                </div>
            </div>
        </>
        )
    }