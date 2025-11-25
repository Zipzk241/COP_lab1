import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useScoresStore from "../stores/useScoresStore";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

function LeaderboardPage() {
  const navigate = useNavigate();

  const { getTopScores, getScoresByDifficulty, clearScores } = useScoresStore();

  const [filter, setFilter] = useState("all");

  const topScores = getTopScores(10);
  const easyScores = getScoresByDifficulty("easy").slice(0, 5);
  const mediumScores = getScoresByDifficulty("medium").slice(0, 5);
  const hardScores = getScoresByDifficulty("hard").slice(0, 5);

  const displayScores = {
    all: topScores,
    easy: easyScores,
    medium: mediumScores,
    hard: hardScores,
  }[filter];

  return (
    <Container>
      <h1 className="title">Таблиця результатів</h1>
      <div className="filters">
        <Button
          variant={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          Всі
        </Button>
        <Button
          variant={filter === "easy" ? "primary" : "secondary"}
          onClick={() => setFilter("easy")}
        >
          Легко
        </Button>
        <Button
          variant={filter === "medium" ? "primary" : "secondary"}
          onClick={() => setFilter("medium")}
        >
          Середньо
        </Button>
        <Button
          variant={filter === "hard" ? "primary" : "secondary"}
          onClick={() => setFilter("hard")}
        >
          Важко
        </Button>
      </div>

      <div className="leaderboard">
        {displayScores.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Гравець</th>
                <th>Ходів</th>
                <th>Час</th>
                <th>Складність</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {displayScores.map((score, index) => (
                <tr key={score.id}>
                  <td>{index + 1}</td>
                  <td>#{score.userId}</td>
                  <td>
                    <strong>{score.moves}</strong>
                  </td>
                  <td>{score.time}</td>
                  <td>{score.difficulty}</td>
                  <td>{new Date(score.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-state">Поки що немає результатів</p>
        )}
      </div>

      <div className="leaderboard-actions">
        <Button variant="danger" onClick={clearScores}>
          Очистити таблицю
        </Button>
        <Button variant="secondary" onClick={() => navigate("/")}>
          На головну
        </Button>
      </div>
    </Container>
  );
}

export default LeaderboardPage;