import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

const BASE_URL = "http://localhost:3000";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMovie() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {movies.map((movie) => (
          <div key={movie.movie_id}>
            {movie.title}
            {
              <img
                src={`${BASE_URL}/images/${movie.imageFile}`}
                alt={`Image of ${movie.title}`}
              />
            }
            <p>รหัสหนัง {movie.movie_id}</p>
            <p>รูปภาพ {movie.imageFile}</p>
            <Link to={`/editmovie/${movie.movie_id}`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
