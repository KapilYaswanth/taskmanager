import React, { useState } from "react";
import "./styles.css";

function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const usersData = localStorage.getItem("usersdb")?.length
        ? JSON.parse(localStorage.getItem("usersdb"))
        : [];
      const findUser = usersData.find((data) => data.username === username);
      if (findUser && findUser.password === password) {
        handleLogin(username);
      } else if (!findUser) {
        localStorage.setItem(
          "usersdb",
          JSON.stringify([...usersData, { username, password }])
        );
        handleLogin(username);
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("enter username and password.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="loginField">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="loginField">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
