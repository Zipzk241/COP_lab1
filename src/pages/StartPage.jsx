import { useState } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

function StartPage({ onStartGame }) {
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <Container>
      <h1 className="title">П'ятнашки </h1>
      <div className="start-content">
        <div className="difficulty-selector">
          <Button
            variant={difficulty === "easy" ? "primary" : "danger"}
            onClick={() => setDifficulty("easy")}
          >
            Легко
          </Button>
          <Button
            variant={difficulty === "medium" ? "primary" : "danger"}
            onClick={() => setDifficulty("medium")}
          >
            Середньо
          </Button>
          <Button
            variant={difficulty === "medium" ? "primary" : "danger"}
            onClick={() => setDifficulty("danger")}
          >
            Важко
          </Button>
        </div>

        <Button onClick={onStartGame}>Почати гру</Button>
      </div>
    </Container>
  );
}

export default StartPage;
