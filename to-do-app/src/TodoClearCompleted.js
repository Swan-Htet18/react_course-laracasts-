import React from "react";

const TodoClearCompleted = (props) => {
  return (
    <button className="button" onClick={props.clearCompleted}>
      Clear completed
    </button>
  );
};

export default TodoClearCompleted;
