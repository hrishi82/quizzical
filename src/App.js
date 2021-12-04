import "./App.css";
import Quizpage from "./Components/Quizpage.js";
import TitlePage from "./Components/TitlePage.jsx";
import React, { useState } from "react";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [QuizPage, setQuizPage] = useState(false);

  function startFunc() {
    setStartQuiz(prevState => !prevState);
  }

  return (
    <div className="App">
      <TitlePage startFunc={startFunc} startQuiz={startQuiz} />
      {startQuiz && <Quizpage />}
    </div>
  );
}

export default App;
