import Question from "./Question.jsx";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quizpage() {
  const [allQuestions, setAllQuestions] = useState([]);
  let url =
    "https://opentdb.com/api.php?amount=5&category=14&difficulty=easy&type=multiple";

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllQuestions(data.results));
  }, [url]);

  let quesComponent = allQuestions.map(el => {
    let id = nanoid();
    return (
      <Question
        key={id}
        question={el.question}
        correct_answer={el.correct_answer}
        incorrect_answers={el.incorrect_answers}
      />
    );
  });

  return <div className="quiz-page-container">{quesComponent}</div>;
}
