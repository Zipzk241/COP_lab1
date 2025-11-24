import { useState } from "react";
import "./styles/components.css";
import "./styles/global.css";
import "./styles/index.css";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);
  const [gameSettings, setGameSettings] = useState(null); 

  const handleStartGame = (settings) => {
    setGameSettings(settings); 
    setCurrentPage("game");
  };

  const handleGameWon = (result) => {
    setGameResult(result);
    setCurrentPage("results");
  };

  const handlePlayAgain = () => {
    setGameResult(null);
    setCurrentPage("game");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "start":
        return <StartPage onStartGame={handleStartGame} />;

      case "game":
        return (
          <GamePage
            settings={gameSettings} 
            onExit={() => setCurrentPage("start")}
            onGameWon={handleGameWon}
          />
        );

      case "results":
        return (
          <ResultsPage
            currentScore={gameResult}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={() => setCurrentPage("start")}
          />
        );

      default:
        return <StartPage onStartGame={handleStartGame} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;