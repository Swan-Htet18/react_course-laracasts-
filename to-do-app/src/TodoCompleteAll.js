import React from "react";

function TodoCompleteAll(props) {
  return (
    <div>
      <div onClick={props.completeAllTodos} className="button">
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAll;
