// src/App.js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [todos, setTodos] = useState([]);

  const register = async () => {
    await axios.post("http://localhost:3000/api/register", {
      username,
      password,
    });
    alert("User registered!");
  };

  const login = async () => {
    const response = await axios.post("http://localhost:3000/api/login", {
      username,
      password,
    });
    setToken(response.data.token);
    alert("User logged in!");
  };

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/api/todos", {
      headers: { Authorization: token },
    });
    setTodos(response.data.todos);
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>
      <div>
        <button onClick={fetchTodos}>Get ToDos</button>
        <ul>
          {todos &&
            todos.map((todo, index) => <li key={index}>{todo.task}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
