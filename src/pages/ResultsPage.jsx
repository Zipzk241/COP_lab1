import { useParams, useNavigate, useLocation } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import ResultCard from "../components/results/ResultCard";
import ScoreDisplay from "../components/results/ScoreDisplay";
import useLocalStorage from "../hooks/useLocalStorage";

function ResultsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentScore = location.state || { moves: 0, time: "00:00" };

  const [scores, setScores] = useLocalStorage(`user_${userId}_scores`, []);

  return (
    <Container>
      <h1 className="title">Результати</h1>
      <p className="user-id">
        Гравець: <strong>#{userId}</strong>
      </p>

      <ResultCard title="Ваш результат">
        <ScoreDisplay moves={currentScore.moves} time={currentScore.time} />
      </ResultCard>

      <div className="results-actions">
        <Button onClick={() => navigate(`/game/${userId}`)}>
          Грати ще раз
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/user/${userId}`)}>
          Профіль
        </Button>
        <Button variant="secondary" onClick={() => navigate("/")}>
          На головну
        </Button>
      </div>

      <ResultCard title="Ваші результати">
        {scores.length > 0 ? (
          scores.slice(-5).map((score, i) => (
            <div key={i} className="score-row">
              {score.moves} ходів - {score.time}
            </div>
          ))
        ) : (
          <p>Поки що немає результатів</p>
        )}
      </ResultCard>
    </Container>
  );
}

export default ResultsPage;
