import { nanoid } from "nanoid";

export default function Question(props) {
  let idQues = nanoid();

  function answerShuffle() {
    let ind = Math.floor(Math.random() * 4);
    let ansArr = [...props.incorrect_answers];
    ansArr.splice(ind, 0, props.correct_answer);
    return ansArr;
  }

  function checkAnswer(e) {
    if (e.target.innerText === props.correct_answer) {
      console.log("ok");
    } else {
      console.log("not ok");
    }
  }

  let answerArray = answerShuffle();
  let answerList = answerArray.map(el => {
    let idAns = nanoid();
    return (
      <li className="options" key={idAns} onClick={checkAnswer}>
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
