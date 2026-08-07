    import { useState } from 'react'
    
    export default function PlayerPage({players, visibleTab}) {
        return(
        <>
            <div className="page-container" style={{display: visibleTab ? "block" : "none"}}>
                <div style={{height:"100%", display:"flex", flexDirection:"column", border:"1px solid black", borderRadius:"10px", background:"#f1f1f1"}}>
                    <div style={{height:"85%"}}>
                    {players.map((player) => (
                        <div key={player.player_id}>{player.player_name}</div>                
                    ))}
                    </div>
                    <div style={{height:"15%", borderTop:"1px solid black", display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"10px"}}>
                        <input type='text'/>
                        <button>submit</button>
                    </div>
                </div>
            </div>
        </>
        )
    }