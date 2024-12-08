import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const BASE_URL = "http://localhost:3000";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

      console.log(response.data);

      if (response.data.message === "User_not_found") {
        setError("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      if (response.data.message === "Wrong_Password") {
        setError("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }
    } catch (error) {
      console.log("error login", error);
    }
  }

  return (
    <>
      <div className="form">
        <div className="wrapper">
          <div className="webname">
            <h1>Streaming</h1>
          </div>
          <h1>เข้าสู่ระบบ</h1>
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
          {error && <p style={{ color: "#F28B82" }}>{error}</p>}
          <button type="submit" className="btnlog" onClick={checkLogin}>
            เข้าสู่ระบบ
          </button>
          <div className="register-link">
            <p>
              ถ้าคุณยังไม่มีผู้ใช้งาน <Link to="/register">สมัครสมาชิก</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
