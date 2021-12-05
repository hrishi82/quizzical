import Question from "./Question.jsx";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Quizpage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  let url =
    "https://opentdb.com/api.php?amount=5&category=14&difficulty=easy&type=multiple";

  function generateDatabase(data) {
    let database = data.results.map(el => {
      return {
        question: el.question,
        correct_answer: el.correct_answer,
        incorrect_answers: el.incorrect_answers,
        id: nanoid()
      };
    });
    setAllQuestions(database);
  }

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => generateDatabase(data));
  }, [url]);

  useEffect(() => {
    let refAns = allQuestions.map(el => {
      return {
        ques_id: el.id,
        user_answer: "",
        selected: false,
        isCorrect: false
      };
    });
    setAllAnswers(refAns);
  }, [allQuestions]);

  function getAnswerData(e, quesid) {
    // setAllAnswers(
    //   allAnswers.map(el => {
    //     if (quesid === el.ques_id) {
    //       return {
    //         ...el,
    //         user_answer: e.target.innerText,
    //         selected: true
    //       };
    //     } else {
    //       return { ...el };
    //     }
    //   })
    // );
    console.log(allAnswers);
  }

  console.log(allAnswers);

  let quesComponent = allQuestions.map(el => {
    let id = nanoid();
    return (
      <Question
        key={id}
        id={el.id}
        question={el.question}
        correct_answer={el.correct_answer}
        incorrect_answers={el.incorrect_answers}
        getAnswerData={getAnswerData}
      />
    );
  });

  return (
    <div className="quiz-page-container">
      {quesComponent}
      <div className="result-container">
        <button className="check-answer-btn">Check Answer</button>
      </div>
    </div>
  );
}
