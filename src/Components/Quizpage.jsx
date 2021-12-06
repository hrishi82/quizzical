import Question from "./Question.jsx";
import Gameover from "./Gameover";
import React, { useState, useEffect } from "react";

export default function Quizpage(props) {
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [error, setError] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (checkAnswers) {
      setScore(calculateScore());
    }
  }, [checkAnswers]);

  function handleClick() {
    if (props.allQuestions.every(el => el.answered)) {
      setCheckAnswers(true);
    } else {
      setError(true);
    }
  }

  function resetGame() {
    setError(false);
    setCheckAnswers(false);
    setScore(0);
    props.endGame();
  }

  function calculateScore() {
    let score = 0;
    props.allQuestions.forEach(el => {
      if (el.answered_correctly) {
        score++;
      }
    });
    return score;
  }

  let quesComponent = props.allQuestions.map(el => {
    return (
      <Question
        key={el.id}
        question={el}
        updateAnswer={props.updateAnswer}
        checkAnswers={checkAnswers}
        setError={setError}
      />
    );
  });

  return (
    <div className="quiz-page-container">
      {quesComponent}
      <div className="result-container">
        {error && (
          <p className="warning">
            You cannot submit until you have selected all your answers!!
          </p>
        )}
        {checkAnswers ? (
          <Gameover score={score} resetGame={resetGame} />
        ) : (
          <button className="check-answer-btn" onClick={handleClick}>
            Check answers
          </button>
        )}
      </div>
    </div>
  );
}
