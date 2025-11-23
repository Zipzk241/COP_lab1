function ScoreDisplay(props) {
  return (
    <div className="score-display">
      <div className="score-item">
        <span>Ходів:</span>
        <strong>{props.moves || 0}</strong>
      </div>
      <div className="score-item">
        <span>Час:</span>
        <strong>{props.time || "00:00"}</strong>
      </div>
    </div>
  );
}

export default ScoreDisplay;
