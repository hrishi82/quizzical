import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  let idQues = nanoid();

  // const styles = {
  //   backgroundColor: props.selected ? "#59E391" : "white"
  // };

  function answerShuffle() {
    let ind = Math.floor(Math.random() * 4);
    let ansArr = [...props.incorrect_answers];
    ansArr.splice(ind, 0, props.correct_answer);
    return ansArr;
  }

  let answerArray = answerShuffle();
  let answerList = answerArray.map(el => {
    let idAns = nanoid();
    return (
      <li
        className="options"
        key={idAns}
        id={idAns}
        // style={styles}
        onClick={e => props.getAnswerData(e, props.id)}
      >
        {el}
      </li>
    );
  });

  return (
    <div className="ques-ans-container">
      <h1 className="question" key={idQues}>
        {props.question}
      </h1>
      <ul className="option-list">{answerList}</ul>
    </div>
  );
}
