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
      await axios.put(`${BASE_URL}/movie/${movieID}`, {
        title: movie,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <>
      <div>Hello Edit Movie {id}</div>
      <div>{movie.title}</div>
      <div>
        <input type="text" onChange={handleMovieChange} value={movie.title} />
      </div>
      <div>
        <button type="submit">แก้ไข</button>
      </div>
      <Link to={`/`}>
        <button onClick={() => updateMovie}>Homepage</button>
      </Link>
    </>
  );
}

export default Edit;
