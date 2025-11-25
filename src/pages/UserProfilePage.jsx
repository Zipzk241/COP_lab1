import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userStats, setUserStats] = useState({
    gamesStarted: 0,
    gamesWon: 0,
    totalMoves: 0,
    bestScore: null,
  });

  useEffect(() => {
    const key = `user_${userId}_stats`;
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserStats(parsed);
      } catch (error) {
        console.error("Помилка парсингу:", error);
      }
    }
  }, [userId]);
  const winRate =
    userStats.gamesStarted > 0
      ? ((userStats.gamesWon / userStats.gamesStarted) * 100).toFixed(1)
      : 0;

  const avgMoves =
    userStats.gamesStarted > 0
      ? Math.round(userStats.totalMoves / userStats.gamesStarted)
      : 0;

  return (
    <Container>
      <h1 className="title">Профіль гравця #{userId}</h1>

      <div className="user-profile">
        <div className="stat-card">
          <h3>Статистика</h3>
          <div className="stat-row">
            <span>Ігор розпочато:</span>
            <strong>{userStats.gamesStarted}</strong>
          </div>
          <div className="stat-row highlight">
            <span>Перемог:</span>
            <strong>{userStats.gamesWon}</strong>
          </div>
          <div className="stat-row">
            <span>Відсоток перемог:</span>
            <strong>{winRate}%</strong>
          </div>
          <div className="stat-row">
            <span>Всього ходів:</span>
            <strong>{userStats.totalMoves}</strong>
          </div>
          <div className="stat-row">
            <span>Середня к-сть ходів:</span>
            <strong>{avgMoves}</strong>
          </div>
          {userStats.bestScore && (
            <>
              <div className="stat-row best-score">
                <span>⭐ Найкращий результат:</span>
                <strong>{userStats.bestScore.moves} ходів</strong>
              </div>
              <div className="stat-row">
                <span>Час найкращого:</span>
                <strong>{userStats.bestScore.time}</strong>
              </div>
            </>
          )}

          {userStats.gamesStarted === 0 && (
            <p className="empty-state">Ви ще не грали жодної гри!</p>
          )}
        </div>

        <div className="actions">
          <Button
            onClick={() =>
              navigate(`/game/${userId}`, { state: { settings: {} } })
            }
          >
            Почати гру
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            На головну
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default UserProfilePage;
