import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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
      <div>
        {movies.map((movie) => (
          <div key={movie.movie_id}>
            {movie.title}
            {<img src={movie.imageFile} alt={`Image of ${movie.title}`} />}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
