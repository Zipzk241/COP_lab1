import { useEffect, useState } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import GameBoard from "../components/game/GameBoard";
import GameStats from "../components/game/GameStats";
import WinModal from "../components/game/WinModal";
import usePuzzleGame from "../hooks/usePuzzleGame";

function GamePage({ onExit, onGameWon, settings }) {
  const gridSize = settings?.gridSize || 4;
  const { tiles, moves, time, isWon, startGame, moveTile } =
    usePuzzleGame(gridSize);
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (isWon) {
      setShowWinModal(true);
    }
  }, [isWon]);

  const handlePlayAgain = () => {
    setShowWinModal(false);
    startGame();
  };

  const handleNewGame = () => {
    setShowWinModal(false);
    onExit();
  };

  return (
    <Container>
      <h1 className="title">Гра в процесі</h1>
      <div className="game-info">
        <p>
          Складність: <strong>{settings?.difficulty || "medium"}</strong>
        </p>
        <p>
          Розмір:{" "}
          <strong>
            {gridSize}×{gridSize}
          </strong>
        </p>
      </div>

      {settings?.timerEnabled && <GameStats moves={moves} time={time} />}
      <GameBoard tiles={tiles} onTileClick={moveTile} gridSize={gridSize} />

      <div className="game-controls">
        <Button variant="secondary" onClick={startGame}>
          Почати заново
        </Button>
        <Button variant="danger" onClick={onExit}>
          Вийти
        </Button>
      </div>
      <WinModal
        isOpen={showWinModal}
        onClose={() => setShowWinModal(false)}
        gameStats={{ moves, time }}
        onPlayAgain={handlePlayAgain}
        onNewGame={handleNewGame}
      />
    </Container>
  );
}

export default GamePage;
