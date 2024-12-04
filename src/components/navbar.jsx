import "./navbar.css";
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <>
      <header>
        <img
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="netflix logo"
          className="logo"
        />
        <nav>
          <ul>
            <Link to={`/`}>Home</Link>
            <Link to={``}>Dashboard Edit</Link>
            <Link to={`/createmovie`}>Edit</Link>
            <Link to={`/deletemovie`}>Delete</Link>
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
