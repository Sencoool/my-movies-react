import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function Register() {
  const [newusername, setNewUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [newconfirm, setNewConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function fetchRegister() {
    if (newpassword !== newconfirm) {
      setError("รหัสผ่านไม่สัมพันธ์กัน");
      return;
    }

    setError("");

    try {
      const formData = new FormData();
      formData.append("name", newusername);
      formData.append("password", newpassword);

      const response = await axios.post(`${BASE_URL}/register`, formData);
      if (response.data.message === "al") {
        setError("Username นี้มีอยู่ในระบบแล้ว กรุณาใช้ชื่ออื่น");
        return;
      } else {
        setError(""); // เคลียร์ข้อความแสดงข้อผิดพลาด
        console.log("สมัครสมาชิกสำเร็จ");
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div>
      Register
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setNewConfirm(e.target.value)}
      />
      <button type="submit" onClick={fetchRegister}>
        เข้าสู่ระบบ
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
export default Register;
