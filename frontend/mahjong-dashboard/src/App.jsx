import { useState } from 'react'
import './App.css'

function ScoringCard() {
  const states = ['Win', 'Feed', 'Neutral']
  const [stateIndex, setState] = useState(2);
  const currentState = states[stateIndex];

  const cycleState = () => {
    setState((prev) => (prev + 1) % states.length);
  };

  return (
    <div
      className={ currentState == "Win" ? "win-card" :
                  currentState == "Feed" ? "feed-card" :
                  "card"
      }
      onClick={cycleState}
      role="button"
      tabIndex={0}
    >
    </div>
  );
}


function App() {
  const [currentTab, setTab] = useState('scoring');
  return (
    <>
    <header className="header">
      <div className="set-counter">Set 4 · Round 1</div> {/*Set and round will eventually increment*/}
      <h1 className="site-title">麻將 Mahjong</h1>
      <div className="nav">
        <button className={currentTab == "scoring" ? "nav-active" : "nav-tab"} onClick={() => setTab("scoring")}>Scoring</button>
          <button className={currentTab == "leaderboard" ? "nav-active" : "nav-tab"} onClick={() => setTab("leaderboard")}>Leaderboard</button>
          <button className={currentTab == "stats" ? "nav-active" : "nav-tab"} onClick={() => setTab("stats")}>Stats</button>
      </div>
    </header>
    <div className='card-container'>
      <ScoringCard/>
      <ScoringCard/>
      <ScoringCard/>
      <ScoringCard/>
    </div>
    <button className='submit'>Submit</button>
    </>
  )
}

export default App
