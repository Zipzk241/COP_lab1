import Tile from "./Tile";

function GameBoard({ tiles, onTileClick }) {
  if (!tiles || tiles.length === 0) {
    return <div className="game-board">Завантаження...</div>;
  }

  return (
    <div className="game-board">
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
