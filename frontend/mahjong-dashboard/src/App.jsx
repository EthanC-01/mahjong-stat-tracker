import { useState } from 'react'
import './App.css'

/*pass in tabs which is an array of tabs*/
/*lifting state for controlled component to ensure reusability*/
function NavTabs({tabs, currentTab, onTabChange, style}) {
  return(
    <div className="nav" style={style}>
      {tabs.map((tab) => (
        <button key={tab} className={currentTab === tab ? "nav-active" : "nav-tab"} onClick={() => onTabChange(tab)}>{tab}</button>
      ))}
    </div>
  );
}


function ScoringCard({wind, name, currentState, onChange}) {
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
      <div style={{ position:"relative", display: "flex", flexDirection: "row"}}>
        <span style={{width:"20%", fontSize:"1em", fontWeight: "bold"}}>{wind}</span>
        <div style={{ display:"flex", flexDirection: "column"}}>
          <span style={{fontSize:".8em", textAlign:"left"}}>{name}</span>
          <span style={{ textAlign:"left" ,fontSize:".5em"}}>{winds[wind]}</span>
        </div>
      </div>
      <div>
        <span style={{fontSize:".5em"}}>bonus points:</span>
        {/*Add css class for select style*/}
        <select style={{ position:"relative", left:"5px", background:"transparent", borderRadius: "5px"}} onChange={(e) => onChange({ bonusPoints: e.target.value })}>
          {Array.from(Array(14), (_, i) => (
            <option key={i} value={i}>{i} pts</option>
          ))}
        </select>
        {currentState === "win" && (
          <div> 
            <div style={{ borderBottom: "1px solid grey", paddingTop: "20px" }}/>
            <span style={{fontSize:".5em"}}>Winning hand</span>
            <select style={{ position: "relative", left:"5px", background:"transparent", borderRadius: "5px"}} onChange={(e) => onChange({ winningHand: e.target.value })}>
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
        style={{ width: "80%",  height: "15%", justifySelf: "center", top: "75%", position: "absolute", zIndex:"2"}}
      />
    </div>
  );
}


function App() {
  const [currentTab, setTab] = useState("scoring");
  {/* winningHand is hardcoded. Link to state or make it so it works without changing the winning hand*/}
  const [players, setPlayer] = useState([
    { wind: "北", name: "Player 1", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
    { wind: "東", name: "Player 2", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
    { wind: "西", name: "Player 3", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
    { wind: "南", name: "Player 4", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
  ]);

  const updatePlayer = (index, updates) => {
    setPlayer((prev) =>
      prev.map((player, i) => (i === index ? { ...player, ...updates } : player))
    );
  };

  return (
    <>
    <header className="header">
      <h1 className="site-title">麻將 Mahjong</h1>
      <NavTabs tabs={["scoring", "leaderboard", "stats"]} currentTab={currentTab} onTabChange={setTab}/>
    </header>
    <div className='card-container'>
      {/*Add logic for players names and player turn order*/}
      {players.map((player, i) => (
        <ScoringCard 
          key={i} 
          wind={player.wind} 
          name={player.name} 
          currentState={player.state}
          winningHand={player.winningHand} 
          bonusPoints={player.bonusPoints}
          onChange={(updates) => updatePlayer(i, updates)}
        />
      ))}
    </div>
    <button className='submit' onClick={console.log(players)}>Submit</button>
    </>
  )
}

export default App
