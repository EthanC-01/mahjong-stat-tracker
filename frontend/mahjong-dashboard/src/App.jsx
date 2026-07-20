import { useState, useEffect } from 'react'
import NavTabs from './components/navTab';
import './App.css'
import ScoringPage from './pages/Scoring';
import LeaderboardPage from './pages/Leaderboard';
import StatsPage from './pages/Stats';

function App() {
  const [currentTab, setTab] = useState("scoring");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
    try {
        const res = await fetch("http://localhost:8000/leaderboard");
        
        if (!res.ok) {
            console.log(res.status);
            return;
        }

        const data = await res.json();
        setLeaderboard(data);
    } catch {
        console.log("Failed to fetch");
    }
    };
    fetchLeaderboard();
  }, []);

  return (
    <>
    <header className="header">
      <h1 className="site-title">麻將 Mahjong</h1>
      <NavTabs tabs={["scoring", "leaderboard", "stats"]} currentTab={currentTab} onTabChange={setTab}/>
    </header>
    <main className='page-view'>
      <div style={{display: currentTab === "scoring" ? "block" : "none"}}>
        <ScoringPage />
      </div>
      <div style={{display: currentTab === "leaderboard" ? "block" : "none"}}>
        <LeaderboardPage leaderboard={leaderboard}/>
      </div>
      <div style={{display: currentTab === "stats" ? "block" : "none"}}>
        <StatsPage leaderboard={leaderboard}/>
      </div>
    </main>
    </>
  )
}

export default App
