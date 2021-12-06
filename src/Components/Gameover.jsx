import React from "react";

function Gameover({ score, resetGame }) {
  return (
    <div className="score-container">
      <span className="score-text">You scored {score}/5 correct answers</span>
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default Gameover;
