import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/components.css";
import "./styles/global.css";
import "./styles/index.css";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import UserProfilePage from "./pages/UserProfilePage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/user/:userId" element={<UserProfilePage />} />
        <Route path="/game/:userId" element={<GamePage />} />
        <Route path="/results/:userId" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;