import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UIProvider } from "./contexts/UIContext";
import "./styles/components.css";
import "./styles/global.css";
import "./styles/index.css";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import UserProfilePage from "./pages/UserProfilePage"; 
import LeaderboardPage from "./pages/LeaderboardPage";
import SettingsForm from "./components/game/SettingsForm";

function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/settings" element={<SettingsForm />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
          <Route path="/game/:userId" element={<GamePage />} />
          <Route path="/results/:userId" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}

export default App;