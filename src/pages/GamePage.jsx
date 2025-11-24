import { useEffect } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import GameBoard from "../components/game/GameBoard";
import GameStats from "../components/game/GameStats";
import usePuzzleGame from "../hooks/usePuzzleGame";

function GamePage({ onExit, onGameWon }) {
  const { tiles, moves, time, isWon, startGame, moveTile } = usePuzzleGame();
  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (isWon) {
      onGameWon({ moves, time });
    }
  }, [isWon, moves, time, onGameWon]);

  return (
    <Container>
      <h1 className="title">Гра в процесі</h1>

      <GameStats moves={moves} time={time} />

      <GameBoard tiles={tiles} onTileClick={moveTile} />

      <div className="game-controls">
        <Button variant="secondary" onClick={startGame}>
          Почати заново
        </Button>
        <Button variant="danger" onClick={onExit}>
          Вийти
        </Button>
      </div>
    </Container>
  );
}

export default GamePage;
