export default function Question(props) {
  function answerShuffle() {
    let ind = Math.floor(Math.random() * 4);
    let ansArr = [...props.incorrect_answers];
    ansArr.splice(ind, 0, props.correct_answer);
    return ansArr;
  }

  let answerArray = answerShuffle();

  let answerList = answerArray.map(el => {
    return <li className="options">{el}</li>;
  });

  return (
    <div className="ques-ans-container" key={props.id}>
      <h1 className="question">{props.question}</h1>
      <ul className="option-list">{answerList}</ul>
    </div>
  );
}
