import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import SettingsForm from "../components/game/SettingsForm";
import useSettingsStore from "../stores/useSettingsStore";

function StartPage() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [userId, setUserId] = useState("");
  const settings = useSettingsStore((state) => state.settings);

  const handleStartGame = () => {
    const id = userId || Date.now().toString();
    navigate(`/game/${id}`);
  };

  return (
    <Container>
      <h1 className="title">П'ятнашки </h1>
      <div className="start-content">
        {!showSettings ? (
          <>
            <div className="user-input">
              <label htmlFor="userId">Введіть ID гравця:</label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Введіть ваш ID або залиште пустим"
              />
            </div>

            <div className="current-settings">
              <h3>Поточні налаштування:</h3>
              <p>
                Складність: <strong>{settings.difficulty}</strong>
              </p>
              <p>
                Розмір:{" "}
                <strong>
                  {settings.gridSize}×{settings.gridSize}
                </strong>
              </p>
            </div>

            <Button onClick={handleStartGame}>Почати гру</Button>
            <Button variant="secondary" onClick={() => setShowSettings(true)}>
              Налаштування
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/leaderboard")}
            >
              Таблиця результатів
            </Button>
          </>
        ) : (
          <SettingsForm onCancel={() => setShowSettings(false)} />
        )}
      </div>
    </Container>
  );
}

export default StartPage;
