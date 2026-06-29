import { useState } from 'react'
import NavTabs from './components/navTab';
import './App.css'
import ScoringPage from './pages/Scoring';
import LeaderboardPage from './pages/Leaderboard';

/*pass in tabs which is an array of tabs*/
/*lifting state for controlled component to ensure reusability*/



function App() {
  const [currentTab, setTab] = useState("scoring");
  return (
    <>
    <header className="header">
      <h1 className="site-title">麻將 Mahjong</h1>
      <NavTabs tabs={["scoring", "leaderboard", "stats"]} currentTab={currentTab} onTabChange={setTab}/>
    </header>
    {currentTab === "scoring" && <ScoringPage />}
    {currentTab === "leaderboard" && <LeaderboardPage />}
    </>
  )
}

export default App
