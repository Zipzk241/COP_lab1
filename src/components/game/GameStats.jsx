function GameStats(props) {
  return (
    <div className="game-stats">
      <div className="stat">
        <span>Ходи:</span>
        <strong>{props.moves || 0}</strong>
      </div>
      <div className="stat">
        <span>Час:</span>
        <strong>{props.time || "00:00"}</strong>
      </div>
    </div>
  );
}

export default GameStats;
