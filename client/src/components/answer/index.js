import React from "react";

// import "./answer.css";

const Answer = () => (
  <div className="answer-container">
    <input id="yearInput" type="year" min="1" max="9999"></input>
    <p>
      Answer: <span>x</span>
    </p>
    <p>
      Current score: <span>x</span>
    </p>
    <button>Check</button>
    <button>Next</button>
    <button>New game</button>
  </div>
);

export default Answer;
