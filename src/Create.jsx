import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function Create() {
  const [newmovie, setNewMovies] = useState("");
  const [newdirector, setNewDirector] = useState("");
  const refResetForm = useRef(null);

  async function fetchNewMovie() {
    try {
      const response = await axios.post(`${BASE_URL}/movies`, {
        title: newmovie,
        director: newdirector,
      });
      if (response.status == 200) {
        setNewMovies("");
        setNewDirector("");

        refResetForm.current.reset();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  console.log(newmovie);
  console.log(newdirector);

  return (
    <>
      <div>Hello Create</div>
      <form ref={refResetForm}>
        <input type="text" onChange={(e) => setNewMovies(e.target.value)} />
        <input type="text" onChange={(e) => setNewDirector(e.target.value)} />
        <div>
          <button type="submit" onClick={() => fetchNewMovie()}>
            Submit
          </button>
        </div>
      </form>
      <div>
        <Link to={`/movies`}>
          <button>Homepage</button>
        </Link>
      </div>
    </>
  );
}

export default Create;
