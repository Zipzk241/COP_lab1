import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import SettingsForm from "../components/game/SettingsForm";
import useGameSettings from "../hooks/useGameSettings";

function StartPage() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useGameSettings();
  const [showSettings, setShowSettings] = useState(false);
  const [userId, setUserId] = useState("");

  const handleStartGame = () => {
    const id = userId || Date.now().toString();
    navigate(`/game/${id}`, { state: { settings } });
  };

  const handleViewProfile = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <Container>
      <h1 className="title">П'ятнашки </h1>
      <div className="start-content">
        {!showSettings && (
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

            {userId && (
              <Button variant="secondary" onClick={handleViewProfile}>
                Переглянути профіль
              </Button>
            )}

            <Button variant="secondary" onClick={() => setShowSettings(true)}>
              Налаштування
            </Button>
          </>
        )}

        {showSettings && (
          <SettingsForm
            currentSettings={settings}
            onSave={(newSettings) => {
              updateSettings(newSettings);
              setShowSettings(false);
            }}
            onCancel={() => setShowSettings(false)}
          />
        )}
      </div>
    </Container>
  );
}

export default StartPage;
