import { useRef, useEffect } from "react";
// import "../reset.css";
import "../src/App.css";
import NoTodos from "./NoTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useLocalStroge from "./hooks/useLocalStroge";
import { CSSTransition, SwitchTransition } from "react-transition-group";
function App() {
  const [name, setName] = useLocalStroge("name", "");

  const nameInputEl = useRef(null);

  const [todos, setTodos] = useLocalStroge("todos", []);

  const [idForTodo, setIdForTodo] = useLocalStroge("idForTodo", 1);

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);

    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(event, id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function remaining() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos([...todos].filter((todo) => !todo.isComplete));
  }

  function completeAllTodos() {
    const updatedTodos = todos.map((todo) => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }

  function todosFiltered(filter) {
    if (filter === "all") {
      return todos;
    } else if (filter === "active") {
      return todos.filter((todo) => !todo.isComplete);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.isComplete);
    }
  }
  function handleNameInput(event) {
    setName(event.target.value);
    // localStorage.setItem("name", JSON.stringify(event.target.value));
  }
  useEffect(() => {
    nameInputEl.current.focus();
    // setName(JSON.parse(localStorage.getItem("name")) ?? "");
    return function cleanup() {};
  }, []);

  return (
    <div className="todo-app">
      <div className="name-container">
        <h2>What is your name?</h2>
        <form action="#">
          <input
            type="text"
            className="todo-input"
            ref={nameInputEl}
            placeholder="What is your name"
            value={name}
            onChange={handleNameInput}
          />
        </form>
        <CSSTransition
          in={name.length > 0}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <p className="name-label">Hello, {name}</p>
        </CSSTransition>
      </div>
      <h2>Todo App</h2>
      <TodoForm addTodo={addTodo} />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={todos.length > 0}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              completeTodo={completeTodo}
              markAsEditing={markAsEditing}
              updateTodo={updateTodo}
              cancelEdit={cancelEdit}
              deleteTodo={deleteTodo}
              remaining={remaining}
              clearCompleted={clearCompleted}
              completeAllTodos={completeAllTodos}
              todosFiltered={todosFiltered}
            />
          ) : (
            <NoTodos />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
