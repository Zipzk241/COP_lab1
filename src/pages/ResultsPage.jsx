import Container from "../components/common/Container";
import Button from "../components/common/Button";
import ResultCard from "../components/results/ResultCard";
import ScoreDisplay from "../components/results/ScoreDisplay";

function ResultsPage(props) {
  return (
    <Container>
      <h1 className="title">Вітаємо!</h1>

      <ResultCard title="Ваш результат">
        <ScoreDisplay moves={0} time="00:00" />
      </ResultCard>

      <div className="results-actions">
        <Button onClick={props.onPlayAgain}>Грати ще раз 🔄</Button>
        <Button variant="secondary" onClick={props.onBackToMenu}>
          В меню 🏠
        </Button>
      </div>

      <ResultCard title="Таблиця рекордів">
        <div className="leaderboard-placeholder">
          <p>Тут буде таблиця найкращих результатів</p>
        </div>
      </ResultCard>
    </Container>
  );
}

export default ResultsPage;
