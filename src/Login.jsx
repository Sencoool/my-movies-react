import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const BASE_URL = "http://localhost:3000";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();

  async function checkLogin() {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);

      const response = await axios.post(`${BASE_URL}/login`, formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token create successful");
        navigate("/");
      }
    } catch (error) {
      console.log("error login", error);
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={checkLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className="btn">
          Log in
        </button>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
