import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
    <div>
      Login
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => setPassWord(e.target.value)}
      />
      <button type="submit" onClick={checkLogin}>
        เข้าสู่ระบบ
      </button>
    </div>
  );
}

export default Login;
