import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function Delete() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMovie() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      setMovies(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteMovie(id) {
    try {
      setIsLoading(true);
      console.log(id);

      await axios.delete(`${BASE_URL}/movie/${id}`);
      await fetchMovie();
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          ลบหนัง
          {movies.map((movie, index) => (
            <div key={index}>
              {movie.movie_id}&nbsp;
              {movie.title}&nbsp;
              <button
                onClick={async () => {
                  await deleteMovie(movie.movie_id);
                }}
              >
                ลบ
              </button>
            </div>
          ))}
          <div>
            <Link to={`/`}>
              <button>Homepage</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Delete;
