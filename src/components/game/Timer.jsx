function Timer(props) {
  return <div className="timer">⏱️ {props.time || "00:00"}</div>;
}

export default Timer;
