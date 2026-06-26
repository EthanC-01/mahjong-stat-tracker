import { useState } from 'react'
import NavTabs from './components/navTab';
import ScoringCard from './components/scoringCard';
import './App.css'

/*pass in tabs which is an array of tabs*/
/*lifting state for controlled component to ensure reusability*/



function App() {
  const [currentTab, setTab] = useState("scoring");
  {/* TODO winningHand is hardcoded. Link to state or make it so it works without changing the winning hand*/}
  const [players, setPlayer] = useState([
    { wind: "東", name: "Player 1", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
    { wind: "南", name: "Player 2", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
    { wind: "北", name: "Player 3", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
    { wind: "西", name: "Player 4", state: "none", winningHand: "Chicken Hand", bonusPoints: 0 },
  ]);

  const updatePlayer = (index, updates) => {
    setPlayer((prev) =>
      prev.map((player, i) => (i === index ? { ...player, ...updates } : player))
    );
  };

  {/*TODO add error checks e.g. valid winning hand, only 1 winner, only 1 loser*/}
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({players: players}),
    });
  
    if (!res.ok) {
      console.log(res.status)
      return;
    }

    const data = await res.json();
    console.log(data);
    } catch {
      console.log("Failed to fetch")
    }
  }

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
    <button className='submit' onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default App
