import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("start");

  const renderPage = () => {
    switch (currentPage) {
      case "start":
        return <StartPage onStartGame={() => setCurrentPage("game")} />;
      case "game":
        return (
          <GamePage
            onPause={() => console.log("Pause")}
            onReset={() => console.log("Reset")}
            onExit={() => setCurrentPage("start")}
          />
        );
      case "results":
        return (
          <ResultsPage
            onPlayAgain={() => setCurrentPage("game")}
            onBackToMenu={() => setCurrentPage("start")}
          />
        );
      default:
        return <StartPage />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
