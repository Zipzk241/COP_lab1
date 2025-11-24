import { useEffect } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import ResultCard from "../components/results/ResultCard";
import ScoreDisplay from "../components/results/ScoreDisplay";
import useLocalStorage from "../hooks/useLocalStorage";

function ResultsPage({ currentScore, onPlayAgain, onBackToMenu }) {
  const [scores, setScores] = useLocalStorage("puzzleScores", []);

  useEffect(() => {
    if (currentScore) {
      setScores([...scores, currentScore].slice(-5)); 
    }
  }, [currentScore]);

  return (
    <Container>
      <h1 className="title">Вітаємо!</h1>

      <ResultCard title="Ваш результат">
        <ScoreDisplay
          moves={currentScore?.moves || 0}
          time={currentScore?.time || "00:00"}
        />
      </ResultCard>

      <div className="results-actions">
        <Button onClick={onPlayAgain}>Грати ще раз</Button>
        <Button variant="secondary" onClick={onBackToMenu}>
          Назад
        </Button>
      </div>

      <ResultCard title="Останні результати">
        {scores.length > 0 ? (
          scores.map((score, i) => (
            <div key={i}>
              {score.moves} ходів • {score.time}
            </div>
          ))
        ) : (
          <p>Поки що немає результатів!</p>
        )}
      </ResultCard>
    </Container>
  );
}

export default ResultsPage;
