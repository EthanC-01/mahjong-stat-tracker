    import { useState } from 'react'
    
    export default function PlayerPage({visibleTab}) {
        return(
        <>
            <div className="page-container" style={{display: visibleTab ? "block" : "none"}}>
                <div style={{height:"100%", display:"flex", flexDirection:"column", border:"1px solid black", borderRadius:"10px", background:"#f1f1f1"}}>
                    <div style={{height:"85%"}}>
                    </div>
                    <div style={{height:"15%", borderTop:"1px solid black", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <input type='text'/>
                        <button>submit</button>
                    </div>
                </div>
            </div>
        </>
        )
    }