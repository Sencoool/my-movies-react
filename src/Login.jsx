import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const BASE_URL = "http://localhost:3000";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkLogin();
    }
  };

  return (
    <>
      <div className="form">
        <div className="wrapper">
          <div className="webname">
            <h1>Streaming</h1>
          </div>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
              onChange={(e) => setName(e.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="รหัสผ่าน"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btnlog" onClick={checkLogin}>
            Log in
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
