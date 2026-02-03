import { useState } from "react";
import { login, register } from "./api/auth.api";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister() {
    try {
      await register(email, password);
      setMessage("Registered successfully");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleLogin() {
    try {
      const result = await login(email, password);
      window.dispatchEvent(
        new CustomEvent("auth:login", { detail: { token: result.token } }),
      );
      setMessage("Login successful");
    } catch (error) {
      setMessage(error.message);
    }
  }
  return (
    <>
      <div>
        <h2>Auth React Microfrontend</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>

        <p>{message}</p>
      </div>
    </>
  );
}

export default App;
