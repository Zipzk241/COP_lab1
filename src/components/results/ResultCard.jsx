function ResultCard(props) {
  return (
    <div className="result-card">
      <h2>{props.title}</h2>
      <div className="result-content">{props.children}</div>
    </div>
  );
}

export default ResultCard;
