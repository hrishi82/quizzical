import "./App.css";
import Quizpage from "./Components/Quizpage.jsx";
import TitlePage from "./Components/TitlePage.jsx";
import Loading from "./Components/Loading.jsx";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [loading, setLoading] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);

  let url =
    "https://opentdb.com/api.php?amount=5&category=14&difficulty=easy&type=multiple";

  function generateDatabase(data) {
    let database = data.results.map(el => {
      return {
        ...el,
        id: nanoid(),
        answered: false,
        answered_correctly: false
      };
    });
    setAllQuestions(database);
    setLoading(false);
  }

  useEffect(() => {
    if (startQuiz) {
      setLoading(true);
      fetch(url)
        .then(res => res.json())
        .then(data => generateDatabase(data));
    }
  }, [startQuiz]);

  function startFunc() {
    setStartQuiz(true);
  }

  function updateAnswer(questionId, correct) {
    setAllQuestions(prevState =>
      prevState.map(question =>
        question.id === questionId
          ? { ...question, answered: true, answered_correctly: correct }
          : question
      )
    );
  }

  return (
    <div className="App">
      {startQuiz ? (
        !loading ? (
          <Quizpage
            allQuestions={allQuestions}
            endGame={() => setStartQuiz(false)}
            updateAnswer={updateAnswer}
          />
        ) : (
          <Loading />
        )
      ) : (
        <TitlePage startFunc={startFunc} />
      )}
    </div>
  );
}

export default App;
