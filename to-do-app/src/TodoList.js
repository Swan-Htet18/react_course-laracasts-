import React from "react";
import TodoItemRemaining from "./TodoItemRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";
import useToggle from "./hooks/useToggle";

// import { CSSTransition } from "react-transition-group";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const TodoList = (props) => {
  const [isFeatureOneVisible, setFeatureOneVisible] = useToggle();
  const [isFeatureTwoVisible, setFeatureTwoVisible] = useToggle();
  const [filter, setFilter] = React.useState("active");
  return (
    <>
      <TransitionGroup component="ul" className="todo-list">
        {props.todosFiltered(filter).map((todo, index) => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="slide-horizontal"
          >
            <li className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => props.completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />

                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => props.markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={(event) => props.updateTodo(event, todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        props.updateTodo(event, todo.id);
                      } else if (event.key === "Escape") {
                        props.cancelEdit(event, todo.id);
                      }
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button
                onClick={() => props.deleteTodo(todo.id)}
                className="x-button"
              >
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="toggle_container">
        <button onClick={setFeatureOneVisible} className="button btn1">
          Features One Toggle
        </button>
        <button onClick={setFeatureTwoVisible} className="button ">
          Features Two Toggle
        </button>
      </div>

      <CSSTransition
        in={isFeatureOneVisible}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div className="check-all-container">
          <TodoCompleteAll completeAllTodos={props.completeAllTodos} />
          <TodoItemRemaining remaining={props.remaining} />
        </div>
      </CSSTransition>

      <CSSTransition
        in={isFeatureTwoVisible}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div className="other-buttons-container">
          <TodoFilters
            todosFiltered={props.todosFiltered}
            filter={filter}
            setFilter={setFilter}
          />
          <div>
            <TodoClearCompleted clearCompleted={props.clearCompleted} />
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default TodoList;
