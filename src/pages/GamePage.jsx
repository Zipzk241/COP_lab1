import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import GameBoard from "../components/game/GameBoard";
import GameStats from "../components/game/GameStats";
import WinModal from "../components/game/WinModal";
import usePuzzleGame from "../hooks/usePuzzleGame";

function GamePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const settings = location.state?.settings || {
    gridSize: 4,
    timerEnabled: true,
    soundEnabled: false,
  };
  const gridSize = settings.gridSize || 4;
  const soundEnabled = settings.soundEnabled || false;
  const { tiles, moves, time, isWon, startGame, moveTile } = usePuzzleGame(
    gridSize,
    soundEnabled
  );
  const [showWinModal, setShowWinModal] = useState(false);
  const gameRegistered = useRef(false);
  const initialMoves = useRef(0);
  useEffect(() => {
    if (!gameRegistered.current && userId) {
      const key = `user_${userId}_stats`;
      const currentStats = JSON.parse(
        localStorage.getItem(key) ||
          '{"gamesStarted":0,"gamesWon":0,"totalMoves":0,"bestScore":null}'
      );
      const newStats = {
        ...currentStats,
        gamesStarted: currentStats.gamesStarted + 1,
      };

      localStorage.setItem(key, JSON.stringify(newStats));
      gameRegistered.current = true;
    }
  }, [userId]);

  useEffect(() => {
    if (isWon && userId) {
      const key = `user_${userId}_stats`;
      const currentStats = JSON.parse(
        localStorage.getItem(key) ||
          '{"gamesStarted":0,"gamesWon":0,"totalMoves":0,"bestScore":null}'
      );

      const newStats = {
        gamesStarted: currentStats.gamesStarted, 
        gamesWon: currentStats.gamesWon + 1,
        totalMoves: currentStats.totalMoves + moves, 
        bestScore:
          !currentStats.bestScore || moves < currentStats.bestScore.moves
            ? { moves, time }
            : currentStats.bestScore,
      };

      localStorage.setItem(key, JSON.stringify(newStats));
      setShowWinModal(true);
    }
  }, [isWon, userId, moves, time]);

  useEffect(() => {
    return () => {
      if (userId && !isWon && moves > 0) {
        const key = `user_${userId}_stats`;
        const currentStats = JSON.parse(
          localStorage.getItem(key) ||
            '{"gamesStarted":0,"gamesWon":0,"totalMoves":0,"bestScore":null}'
        );

        const newStats = {
          ...currentStats,
          totalMoves: currentStats.totalMoves + moves, 
        };

        localStorage.setItem(key, JSON.stringify(newStats));
      }
    };
  }, [userId, isWon, moves]);

  useEffect(() => {
    startGame();
  }, [startGame]);

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

  const handleRestart = () => {
    if (userId && moves > 0 && !isWon) {
      const key = `user_${userId}_stats`;
      const currentStats = JSON.parse(
        localStorage.getItem(key) ||
          '{"gamesStarted":0,"gamesWon":0,"totalMoves":0,"bestScore":null}'
      );

      const newStats = {
        ...currentStats,
        totalMoves: currentStats.totalMoves + moves,
      };

      localStorage.setItem(key, JSON.stringify(newStats));
    }

    gameRegistered.current = false;
    startGame();
  };

  return (
    <Container>
      <div className="game-header">
        <h1 className="title">Гра в процесі</h1>
        <p className="user-id">
          Гравець: <strong>#{userId}</strong>
        </p>
      </div>

      {settings.timerEnabled && <GameStats moves={moves} time={time} />}

      <GameBoard tiles={tiles} onTileClick={moveTile} gridSize={gridSize} />

      <div className="game-controls">
        <Button variant="secondary" onClick={handleRestart}>
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
