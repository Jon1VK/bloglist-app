import React, { useState } from "react";
import loginService from "../services/login";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const LoginForm = ({ onSuccess, onError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    loginService
      .login(username, password)
      .then((user) => {
        setUsername("");
        setPassword("");
        onSuccess(user);
      })
      .catch((error) => {
        setPassword("");
        onError(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label>
        Username{" "}
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Password{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
