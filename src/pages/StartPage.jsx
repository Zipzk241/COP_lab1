import Container from "../components/common/Container";
import Button from "../components/common/Button";

function StartPage(props) {
  return (
    <Container>
      <h1 className="title">П'ятнашки </h1>
      <div className="start-content">
        <p className="game-description">
          Зібери плитки від 1 до 15 у правильному порядку!
        </p>
        <div className="difficulty-selector">
          <h3>Оберіть складність:</h3>
          <Button variant="primary">Легко</Button>
          <Button variant="secondary">Середньо</Button>
          <Button variant="danger">Важко</Button>
        </div>
        <Button onClick={props.onStartGame}>Почати гру!</Button>
      </div>
    </Container>
  );
}

export default StartPage;
