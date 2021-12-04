export default function TitlePage(props) {
  let styles = {
    display: props.startQuiz ? "none" : "flex"
  };
  return (
    <div className="first-page-container" style={styles}>
      <h1 className="title">Quizzical</h1>
      <p className="title-para">This is a quiz app, click start to continue</p>
      <button className="start-btn" onClick={props.startFunc}>
        Start Quiz
      </button>
    </div>
  );
}
