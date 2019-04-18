import React, { useState } from 'react';
import './App.css';

function Todo({todo, index, toggleTodoCompletion, removeTodo}) {
  return (
      <div className="todo"
           style={{ textDecoration: todo.isCompleted ? "line-through": "", color: todo.isCompleted ? "green" : "red"}}
      >
        {todo.text}
        <div>
          <button  className="button3" onClick={() => toggleTodoCompletion(index, todo.isCompleted)}>
            {todo.isCompleted ? "In complete": "Complete"}
          </button>
          <button onClick={ () => removeTodo(index)}>X</button>
        </div>
      </div>
  );
}
function TodoForm({addTodo}) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("")
  };
  return (
      <form onSubmit={handleSubmit}>
        <input type="text"
               className="input"
               value={value}
               onChange={e => setValue(e.target.value)}
        />
      </form>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);
  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos)
  }
  const toggleTodoCompletion = (index, status) => {
    const newTodos = [...todos];
    if (status){
      newTodos[index].isCompleted = false
    } else {
      newTodos[index].isCompleted = true
    }
    setTodos(newTodos);
  }
  const removeTodo = index => {
    const newTodos = todos.filter(todo => todo !== todos[index]);
    setTodos(newTodos);
  }
  return (
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
              <Todo
                  key = {index}
                  index = {index}
                  todo= {todo}
                  toggleTodoCompletion = {toggleTodoCompletion}
                  removeTodo = {removeTodo}
              />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
  )
}

export default App;
