import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

function Edit() {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
  });

  async function fetchMovie(movieID) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieID}`);
      setMovie(response.data[1]);
      console.log(response.data[1]);
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleMovieChange(event) {
    setMovie((previousState) => ({
      ...previousState,
      title: event.target.value,
    }));
  }

  async function updateMovie() {
    try {
      // console.log(movie.title);

      await axios.put(`${BASE_URL}/movie/${id}`, {
        title: movie.title,
      });
      // alert("Update Successful");
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <>
      <div>Hello Edit Movie {movie.movie_id}</div>
      <div>{movie.title}</div>
      <div>
        <input type="text" onChange={handleMovieChange} value={movie.title} />
      </div>
      <div>
        <Link to={`/`}>
          <button onClick={updateMovie} type="submit">
            แก้ไข
          </button>
        </Link>
      </div>
      <Link to={`/`}>
        <button>Homepage</button>
      </Link>
    </>
  );
}

export default Edit;
