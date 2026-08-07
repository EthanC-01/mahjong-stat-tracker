import { useState, useEffect } from 'react'
import NavTabs from './components/navTab';
import './App.css'
import ScoringPage from './pages/Scoring';
import LeaderboardPage from './pages/Leaderboard';
import StatsPage from './pages/Stats';
import PlayerPage from "./pages/Players";

function App() {
  const [currentTab, setTab] = useState("scoring");
  const [leaderboard, setLeaderboard] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    try {
        const [res, res2] = await Promise.all([
          fetch("http://localhost:8000/leaderboard"),
          fetch("http://localhost:8000/players/order"),
        ])
        
        const data = await res.json();
        const data2 = await res2.json();
        setLeaderboard(data);
        setPlayers(data2);
    } catch {
        console.log("Failed to fetch");
    }
    };
    fetchData();
  }, []);

  return (
    <>
    <header className="header">
      <h1 className="site-title">麻將 Mahjong</h1>
      <NavTabs tabs={["players", "scoring", "leaderboard", "stats"]} currentTab={currentTab} onTabChange={setTab}/>
    </header>
    <main className='page-view'>
      <PlayerPage players={players} visibleTab={currentTab === "players"}/>
      <ScoringPage visibleTab={currentTab === "scoring"}/>
      <LeaderboardPage leaderboard={leaderboard} visibleTab={currentTab === "leaderboard"}/>
      <StatsPage leaderboard={leaderboard} visibleTab={currentTab === "stats"}/>
    </main>
    </>
  )
}

export default App
