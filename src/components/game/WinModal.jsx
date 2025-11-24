import { useEffect } from "react";
import Portal from "../common/Portal";

function WinModal({ isOpen, onClose, gameStats, onPlayAgain, onNewGame }) {
  // Закриття на ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; 
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Вітаємо! Ви виграли!</h2>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="game-result">
              <div className="result-item">
                <span className="result-label">Ходів:</span>
                <span className="result-value">{gameStats?.moves || 0}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Час:</span>
                <span className="result-value">
                  {gameStats?.time || "00:00"}
                </span>
              </div>
            </div>

            <p className="modal-message">
              Чудова робота! Хочете спробувати ще раз?
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn primary" onClick={onPlayAgain}>
              Грати цей рівень заново 
            </button>
            <button className="btn secondary" onClick={onNewGame}>
              Новий рівень
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default WinModal;
