import "./navbar.css";
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <>
      <header>
        <h1>Jiramet</h1>
        <nav>
          <ul>
            <Link to={`/`}>Home</Link>
            <Link to={`/dashboard`}>Dashboard</Link>
            <Link to={`/addmovie`}>Add</Link>
          </ul>
        </nav>
        <nav>
          <img
            src="https://randomuser.me/api/portraits/women/3.jpg"
            alt="user profile picture"
            className="profile-image"
          />
        </nav>
      </header>
    </>
  );
}
