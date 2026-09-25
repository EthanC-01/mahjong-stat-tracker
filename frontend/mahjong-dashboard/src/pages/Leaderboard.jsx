export default function LeaderboardPage({leaderboard, visibleTab}) {
                    
    return (
        <>
            <div style={{display: visibleTab ? "block" : "none"}}>
            <div>
                <div className="table" style={{overflow:"scroll", backgroundColor:"#f1f1f1"}}>
                    {leaderboard.map((player, i) => {
                        const totalGames = player.wins + player.losses + player.draws;
                        const winrate = totalGames === 0 ? (0).toFixed(2) : ((player.wins / totalGames) * 100).toFixed(2);

                        return (
                            <div style={{textAlign:"center", color:"black", height: "50px", borderTop:"1px solid black", fontSize:"14px"}} key={i}>
                                Rank: {player.rank} | Name: {player.players.player_name} | Pts: {player.total_points} | Wins: {player.wins} | Losses: {player.losses} | Draws: {player.draws} | Winrate: {winrate}%
                            </div>
                        );
                    })}
                </div>
            </div>
            </div>
        </>
    )
}