import React, { useState, useEffect } from "react";
import shuffle from "../helpers/helper.jsx";
import { decode } from "he";

export default function Question({
  question,
  updateAnswer,
  checkAnswers,
  setError
}) {
  const [answers, setAnswers] = useState([]);

  const {
    id,
    correct_answer,
    incorrect_answers,
    answered,
    answered_correctly
  } = question;

  const mapAnswers = [
    { answer: decode(correct_answer), correct: true, selected: false },
    ...incorrect_answers.map(ans => ({
      answer: decode(ans),
      correct: false,
      selected: false
    }))
  ];

  function handleClick(ans) {
    if (!checkAnswers) {
      updateAnswer(question.id, ans.correct);
      setAnswers(state =>
        state.map(item =>
          item.answer === ans.answer
            ? { ...item, selected: true }
            : { ...item, selected: false }
        )
      );
      setError(false);
    }
  }

  function answerStyle(ans) {
    if (ans.selected) {
      if (checkAnswers) {
        return ans.correct ? "correct" : "incorrect";
      } else return "selected";
    } else if (checkAnswers && ans.correct) {
      return "correct";
    } else return "";
  }

  useEffect(() => {
    setAnswers(shuffle(mapAnswers));
  }, []);

  return (
    <div className="question-container">
      <h2 className="question-title">{decode(question.question)}</h2>
      <div className="answer-container">
        {answers.map(ans => (
          <button
            key={ans.answer}
            disabled={checkAnswers}
            className={`answer-btn ${answerStyle(ans)}`}
            onClick={() => handleClick(ans)}
          >
            {ans.answer}
          </button>
        ))}
      </div>
    </div>
  );
}
