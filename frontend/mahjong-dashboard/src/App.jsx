import { useState } from 'react'
import './App.css'

/*pass in tabs which is an array of tabs*/
function NavTabs({tabs, currentTab, onTabChange, style}) {
  return(
    <div className="nav" style={style}>
      {tabs.map((tab) => (
        <button key={tab} className={currentTab === tab ? "nav-active" : "nav-tab"} onClick={() => onTabChange(tab)}>{tab}</button>
      ))}
    </div>
  );
}


function ScoringCard({wind}) {
  const states = [ 'win', 'none', 'feed']
  const [currentState, setState] = useState("none");
  const winds = {"北": "North", "東": "East", "西": "West", "南": "South"}

  return (
    <div
      className={ currentState == "win" ? "win-card" : currentState == "feed" ? "feed-card" : "card" }
      role="button"
    >
      <div style={{ position:"relative", display: "flex", flexDirection: "row"}}>
        <span style={{width:"20%", fontSize:"1em", fontWeight: "bold"}}>{wind}</span>
        <div style={{ display:"flex", flexDirection: "column"}}>
          <span style={{fontSize:".8em", textAlign:"left"}}>Name</span>
          <span style={{ textAlign:"left" ,fontSize:".5em"}}>{winds[wind]}</span>
        </div>
      </div>
      <div>
        <span style={{fontSize:".8em"}}>bonus points</span>
        <select style={{ position:"relative" }}>
          {Array.from(Array(13), (_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        {currentState === "win" && (
          <div> 
            <span>Winning hand</span>
            <select style={{ position: "relative" }}>
              {Array.from(Array(13), (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <NavTabs 
        tabs={states}
        currentTab={currentState}
        onTabChange={(tab) => setState(tab)} 
        style={{ width: "80%",  height: "15%", justifySelf: "center", top: "75%", position: "absolute", zIndex:"2"}}
      />
    </div>
  );
}


function App() {
  const [currentTab, setTab] = useState("scoring");

  return (
    <>
    <header className="header">
      <h1 className="site-title">麻將 Mahjong</h1>
      <NavTabs tabs={["scoring", "leaderboard", "stats"]} currentTab={currentTab} onTabChange={setTab}/>
    </header>
    <div className='card-container'>
      <ScoringCard wind={"北"}/>
      <ScoringCard wind={"東"}/>
      <ScoringCard wind={"西"}/>
      <ScoringCard wind={"南"}/>
    </div>
    <button className='submit'>Submit</button>
    </>
  )
}

export default App
