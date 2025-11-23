function Button(props) {
  return (
    <button
      className={`btn ${props.variant || "primary"}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
