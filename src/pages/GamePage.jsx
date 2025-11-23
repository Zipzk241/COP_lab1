import Container from "../components/common/Container";
import Button from "../components/common/Button";
import GameBoard from "../components/game/GameBoard";
import GameStats from "../components/game/GameStats";

function GamePage(props) {
  return (
    <Container>
      <h1 className="title">Гра в процесі</h1>

      <GameStats moves={0} time="00:00" />

      <GameBoard />

      <div className="game-controls">
        <Button variant="secondary" onClick={props.onPause}>
          Пауза
        </Button>
        <Button variant="danger" onClick={props.onReset}>
          Почати заново
        </Button>
        <Button variant="warning" onClick={props.onExit}>
          Вийти
        </Button>
      </div>
    </Container>
  );
}

export default GamePage;
