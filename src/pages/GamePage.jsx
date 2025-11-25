import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import GameBoard from "../components/game/GameBoard";
import GameStats from "../components/game/GameStats";
import WinModal from "../components/game/WinModal";
import usePuzzleGame from "../hooks/usePuzzleGame";
import useSettingsStore from "../stores/useSettingsStore";
import useUserStore from "../stores/useUserStore";
import useScoresStore from "../stores/useScoresStore";

function GamePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const settings = useSettingsStore((state) => state.settings);
  const registerGameStart = useUserStore((state) => state.registerGameStart);
  const registerWin = useUserStore((state) => state.registerWin);
  const addMoves = useUserStore((state) => state.addMoves);
  const addScore = useScoresStore((state) => state.addScore);
  const [showWinModal, setShowWinModal] = useState(false);
  const gameRegistered = useRef(false);
  const { tiles, moves, time, isWon, startGame, moveTile } = usePuzzleGame(
    settings.gridSize,
    settings.soundEnabled
  );
  const prevGridSize = useRef(settings.gridSize);

  useEffect(() => {
    if (prevGridSize.current !== settings.gridSize) {
      prevGridSize.current = settings.gridSize;
      startGame(); 
    }
  }, [settings.gridSize, startGame]);

  useEffect(() => {
    if (!gameRegistered.current && userId) {
      registerGameStart(userId);
      gameRegistered.current = true;
    }
  }, [userId, registerGameStart]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (isWon && userId) {
      registerWin(userId, moves);
      addScore({
        userId,
        moves,
        time,
        difficulty: settings.difficulty,
        gridSize: settings.gridSize,
      });
      setShowWinModal(true);
    }
  }, [isWon, userId, moves, time, settings, registerWin, addScore]);

  useEffect(() => {
    return () => {
      if (userId && !isWon && moves > 0) {
        addMoves(userId, moves);
      }
    };
  }, [userId, isWon, moves, addMoves]);

  const handlePlayAgain = () => {
    setShowWinModal(false);
    gameRegistered.current = false;
    startGame();
  };

  const handleNewGame = () => {
    navigate(`/results/${userId}`, { state: { moves, time } });
  };

  const handleExit = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <Container>
      <div className="game-header">
        <h1 className="title">Гра в процесі</h1>
        <p className="user-id">
          Гравець: <strong>#{userId}</strong>
        </p>
        <p className="game-settings">
          {settings.gridSize}×{settings.gridSize} • {settings.difficulty}
        </p>
      </div>

      {settings.timerEnabled && <GameStats moves={moves} time={time} />}

      <GameBoard
        tiles={tiles}
        onTileClick={moveTile}
        gridSize={settings.gridSize}
      />

      <div className="game-controls">
        <Button
          variant="secondary"
          onClick={() => {
            gameRegistered.current = false;
            startGame();
          }}
        >
          Почати заново
        </Button>
        <Button variant="danger" onClick={handleExit}>
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
