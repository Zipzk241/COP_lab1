function Tile(props) {
  return (
    <div
      className={`tile ${props.isEmpty ? "empty" : ""}`}
      onClick={props.onClick}
    >
      {!props.isEmpty && props.number}
    </div>
  );
}

export default Tile;
