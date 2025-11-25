import { useState, useEffect, useCallback, useRef } from "react";

function usePuzzleGame(gridSize = 4, soundEnabled = false) {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const moveSound = useRef(null);
  const winSound = useRef(null);
  useEffect(() => {
    moveSound.current = new Audio("/sounds/move.mp3");
    winSound.current = new Audio("/sounds/win.mp3");
  }, []);

  useEffect(() => {
    if (tiles.length > 0 && tiles.length !== gridSize * gridSize) {
      console.log("🔄 Розмір змінився, перезапускаємо гру");
      startGame();
    }
  }, [gridSize]); 

  useEffect(() => {
    let interval = null;
    if (isActive && !isWon) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isWon]);

  const startGame = useCallback(() => {
    const totalTiles = gridSize * gridSize;
    let newTiles;
    let attempts = 0;

    do {
      newTiles = [...Array(totalTiles - 1).keys()].map((i) => i + 1);
      newTiles.push(0);
      for (let i = totalTiles - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
      }
      attempts++;
    } while (!isSolvable(newTiles) && attempts < 100);

    setTiles(newTiles);
    setMoves(0);
    setSeconds(0);
    setIsActive(true);
    setIsWon(false);
  }, [gridSize]);

  const isSolvable = (tiles) => {
    let inversions = 0;
    const filtered = tiles.filter((tile) => tile !== 0);

    for (let i = 0; i < filtered.length - 1; i++) {
      for (let j = i + 1; j < filtered.length; j++) {
        if (filtered[i] > filtered[j]) {
          inversions++;
        }
      }
    }

    return inversions % 2 === 0;
  };

  const moveTile = useCallback(
    (index) => {
      if (!isActive || isWon) return;

      const emptyIndex = tiles.indexOf(0);
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const emptyRow = Math.floor(emptyIndex / gridSize);
      const emptyCol = emptyIndex % gridSize;

      const isNeighbor =
        (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow);

      if (isNeighbor) {
        const newTiles = [...tiles];
        [newTiles[emptyIndex], newTiles[index]] = [
          newTiles[index],
          newTiles[emptyIndex],
        ];

        setTiles(newTiles);
        setMoves((m) => m + 1);

        if (soundEnabled && moveSound.current) {
          moveSound.current.currentTime = 0;
          moveSound.current.play().catch(() => {});
        }

        const solved = newTiles.every((tile, i) => {
          if (i === newTiles.length - 1) return tile === 0;
          return tile === i + 1;
        });

        if (solved) {
          setIsWon(true);
          setIsActive(false);

          if (soundEnabled && winSound.current) {
            setTimeout(() => {
              winSound.current.play().catch(() => {});
            }, 100);
          }
        }
      }
    },
    [tiles, isActive, isWon, gridSize, soundEnabled]
  );

  const formatTime = useCallback(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, [seconds]);

  return {
    tiles,
    moves,
    time: formatTime(),
    isWon,
    startGame,
    moveTile,
    gridSize,
  };
}

export default usePuzzleGame;
