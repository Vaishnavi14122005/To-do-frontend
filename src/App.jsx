import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const URL = `${import.meta.env.VITE_API_URL}/todos`;

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    const list = await axios.get(URL);
    setTodo(list.data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const list = await axios.post(URL, { text: input });
    setTodo([...todo, list.data.data]);
    setInput("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${URL}/${id}`);
    setTodo(todo.filter((item) => item._id !== id));
  };

  return (
    <div className="app">
      <h1>To-do App</h1>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todo.map((item, index) => (
          <li
            key={item._id}
            style={{
              backgroundColor: [
                "#FFD6D6",
                "#D6FFD6",
                "#D6E8FF",
                "#FFF3D6",
                "#EDD6FF",
                "#D6FFF6",
              ][index % 6],
            }}
          >
            {item.text}
            <button onClick={() => deleteTodo(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;