import "./navbar.css";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

export default function Navbar() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    navigate(0);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
        console.log(decoded);
      } catch (error) {
        console.log("Invalid token");
      }
    }
  }, []);

  return (
    <>
      <header>
        <img src="../public/navlogo.png" alt="Jflix logo" className="logo" />
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            {userInfo?.roles?.includes("Admin") && (
              <>
                <li>
                  <Link to={`/dashboard`}>Dashboard</Link>
                </li>
                <li>
                  <Link to={`/addmovie`}>Add</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <nav>
          {userInfo ? (
            <>
              <img
                src={`${BASE_URL}/images/${userInfo.profilePicture}`}
                alt="user profile picture"
                className="profile-image"
              />
              <ul>
                <li className="username">Hello, {userInfo.name}</li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </>
          ) : (
            <ul>
              <li>
                <Link to={`/login`}>Login</Link>
                <Link to={`/register`}>Register</Link>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </>
  );
}
