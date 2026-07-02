import { useState } from 'react'
import NavTabs from './components/navTab';
import './App.css'
import ScoringPage from './pages/Scoring';
import LeaderboardPage from './pages/Leaderboard';
import StatsPage from './pages/Stats';

function App() {
  const [currentTab, setTab] = useState("scoring");
  return (
    <>
    <header className="header">
      <h1 className="site-title">麻將 Mahjong</h1>
      <NavTabs tabs={["scoring", "leaderboard", "stats"]} currentTab={currentTab} onTabChange={setTab}/>
    </header>
    <div style={{display: currentTab === "scoring" ? "block" : "none"}}>
      <ScoringPage />
    </div>
    <div style={{display: currentTab === "leaderboard" ? "block" : "none"}}>
      <LeaderboardPage />
    </div>
    <div style={{display: currentTab === "stats" ? "block" : "none"}}>
      <StatsPage />
    </div>
    </>
  )
}

export default App
