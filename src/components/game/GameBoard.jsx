import Tile from "./Tile";

function GameBoard({ tiles, onTileClick, gridSize = 4 }) {
  if (!tiles || tiles.length === 0) {
    return <div className="game-board">Завантаження...</div>;
  }

  return (
    <div
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        width: `${gridSize * 90}px`,
        height: `${gridSize * 90}px`,
      }}
    >
      {tiles.map((number, index) => (
        <Tile
          key={index}
          number={number}
          isEmpty={number === 0}
          onClick={() => onTileClick(index)}
        />
      ))}
    </div>
  );
}

export default GameBoard;
