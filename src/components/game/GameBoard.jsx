import Tile from "./Tile";

function GameBoard() {
  return (
    <div className="game-board">
      {[...Array(16)].map((_, i) => (
        <Tile 
          key={i}
          number={i < 15 ? i + 1 : null}
          isEmpty={i === 15}
        />
      ))}
    </div>
  );
}

export default GameBoard;
