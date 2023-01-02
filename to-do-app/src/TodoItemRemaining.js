import React from "react";

const TodoItemRemaining = (props) => {
  return <span>{props.remaining()} items remaining</span>;
};

export default TodoItemRemaining;
