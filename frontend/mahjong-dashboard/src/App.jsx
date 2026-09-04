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
  const [turnOrder, setTurn] = useState([]);
  const [validHands, setHands] = useState([]);

  const toggleActive = async (player) => {

    setPlayers(prev => prev.map(p =>
      p.player_id === player.player_id ? { ...p, active: !p.active } : p
    ));
    
    try {
      const res = await fetch(`http://localhost:8000/players/active/${player.player_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !player.active })
    });
    setTurn(await res.json());
    } catch {
      setPlayers(prev => prev.map(p =>
        p.player_id === player.player_id ? { ...p, active: player.active } : p
      ));
    }
  };


    const shuffleOrder = async () => {
      try {
          const res = await fetch("http://localhost:8000/players/shuffle", {
              method: "POST",
          });
          
          if (!res.ok) {
              console.log(res.status);
              return;
          }

          const data = await res.json();
          setTurn(data);
      } catch {
          console.log("Failed to fetch");
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, res2, res3] = await Promise.all([
          fetch("http://localhost:8000/leaderboard"),
          fetch("http://localhost:8000/players/attending"),
          fetch("http://localhost:8000/hands")
        ])
        
        const data = await res.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        setLeaderboard(data);
        setPlayers(data2);
        setHands(data3);
      } catch {
          console.log("Failed to fetch");
      }
    };
    shuffleOrder();
    fetchData();
  }, []);

  return (
    <>
    <header className="header">
      <h1 className="site-title">麻將 Mahjong</h1>
      <NavTabs tabs={["players", "scoring", "leaderboard", "stats"]} currentTab={currentTab} onTabChange={setTab}/>
    </header>
    <main className='page-view'>
      <PlayerPage players={players} visibleTab={currentTab === "players"} toggleActive={toggleActive}/>
      <ScoringPage visibleTab={currentTab === "scoring"} turnOrder={turnOrder} changeOrder={setTurn} shuffle={shuffleOrder} validHands={validHands}/>
      <LeaderboardPage leaderboard={leaderboard} visibleTab={currentTab === "leaderboard"}/>
      <StatsPage leaderboard={leaderboard} visibleTab={currentTab === "stats"}/>
    </main>
    </>
  )
}

export default App
