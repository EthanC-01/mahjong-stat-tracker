import './scoringCard.css'
import NavTabs from './navTab'

export default function ScoringCard({wind, name, currentState, onChange}) {
  const states = [ 'win', 'none', 'feed']
  const winds = {"北": "North", "東": "East", "西": "West", "南": "South"}
  const winningHands = ["Chicken Hand", 
                        "All Triplets",
                        "Mixed One Suit",
                        "All Pairs",
                        "Small Dragons",
                        "Small Winds",
                        "All One Suit",
                        "Great Dragons",
                        "All Honor",
                        "Concealed Triplet",
                        "Orphans",
                        "Nine Gates",
                        "Great Winds",
                        "Thirteen Orphans",
                        "All Kongs"]

  return (
    <div
      className={ currentState == "win" ? "win-card" : currentState == "feed" ? "feed-card" : "card" }
      role="button"
    >
      <div style={{ position:"relative", display: "flex", justifyContent:"space-between", flexDirection: "row"}}>
        <span style={{width:"25%", fontSize:"2rem", fontWeight: "bold"}}>{wind}</span>
        <div style={{ display:"flex", flexDirection: "column", justifyContent:"end"}}>
          <span style={{ fontSize:"1rem", textAlign:"left"}}>{name}</span>
          <span style={{ textAlign:"left" ,fontSize:".8rem"}}>{winds[wind]}</span>
        </div>
      </div>
      <div>
        <span style={{fontSize:".8rem"}}>bonus points:</span>
        <select className='drop-down' onChange={(e) => onChange({ bonusPoints: e.target.value })}>
          {Array.from(Array(14), (_, i) => (
            <option key={i} value={i}>{i} pts</option>
          ))}
        </select>
        {currentState === "win" && (
          <div> 
            <div style={{ borderBottom: "1px solid grey", paddingTop: "10px" }}/>
            <span style={{fontSize:".8rem"}}>Winning hand</span>
            <select className='drop-down' defaultValue= {""} onChange={(e) => onChange({ winningHand: e.target.value })}>
              <option value="" disabled hidden>Select a hand</option>
              { winningHands.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <NavTabs 
        tabs={states}
        currentTab={currentState}
        onTabChange={(tab) => onChange({ state: tab })}
        style={{ width: "96%",  height: "15%", justifySelf: "center", top: "75%", position: "absolute"}}
      />
    </div>
  );
}