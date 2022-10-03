import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({ setUser, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with ", username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      setUser(user.data);
      blogService.setToken(user.data.token);
      setUsername("");
      setPassword("");
      notify("Logged in");
    } catch (err) {
      console.log(err.message);
      notify("Wrong credentials");
    }
  };

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        username:{" "}
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
