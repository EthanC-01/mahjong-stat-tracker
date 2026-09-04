import './scoringCard.css'
import NavTabs from './navTab'

export default function ScoringCard({wind, name, currentState, onChange, validHands, winningHand, bonusPoints}) {
  const states = [ 'win', 'none', 'feed']
  const winds = {"北": "North", "東": "East", "西": "West", "南": "South"}

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
        <select className='drop-down' value= {bonusPoints} onChange={(e) => onChange({ bonusPoints: e.target.value })}>
          {Array.from(Array(14), (_, i) => (
            <option key={i} value={i}>{i} pts</option>
          ))}
        </select>
        {currentState === "win" && (
          <div> 
            <div style={{ borderBottom: "1px solid grey", paddingTop: "10px" }}/>
            <span style={{fontSize:".8rem"}}>Winning hand</span>
            <select className='drop-down' value= {winningHand} onChange={(e) => onChange({ winningHand: e.target.value })}>
              <option value="" disabled hidden>Select a hand</option>
              { validHands.map((hand) => (
                <option key={hand.hand_id} value={hand.hand_id}>{hand.hand_name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <NavTabs 
        tabs={states}
        currentTab={currentState}
        onTabChange={(tab) => onChange({ state: tab })}
        style={{ width: "96%",  height: "18%", justifySelf: "center", marginTop:"auto"}}
      />
    </div>
  );
}