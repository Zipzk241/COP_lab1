import { useState } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import SettingsForm from "../components/game/SettingsForm";
import useGameSettings from "../hooks/useGameSettings";

function StartPage({ onStartGame }) {
  const { settings, updateSettings } = useGameSettings();
  const [showSettings, setShowSettings] = useState(false);

  const handleSaveSettings = (newSettings) => {
    updateSettings(newSettings);
    setShowSettings(false);
  };

  const handleStartGame = () => {
    onStartGame(settings); 
  };

  return (
    <Container>
      <h1 className="title">П'ятнашки </h1>
      <div className="start-content">
        {showSettings ? (
          <SettingsForm
            currentSettings={settings}
            onSave={handleSaveSettings}
            onCancel={() => setShowSettings(false)}
          />
        ) : (
          <>
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
              <p>
                Таймер:{" "}
                <strong>
                  {settings.timerEnabled ? "Увімкнено" : "Вимкнено"}
                </strong>
              </p>
            </div>

            <Button onClick={handleStartGame}>Почати гру</Button>
            <Button variant="secondary" onClick={() => setShowSettings(true)}>
              Налаштування
            </Button>
          </>
        )}
      </div>
    </Container>
  );
}

export default StartPage;
