import styles from "./GameBoard.module.css";

function Tile({ number, isEmpty, onClick }) {
  return (
    <div
      className={`${styles.tile} ${isEmpty ? styles.empty : ""}`}
      onClick={onClick}
    >
      {!isEmpty && number}
    </div>
  );
}

export default Tile;
