import { Form, Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function Create() {
  const [newmovie, setNewMovies] = useState("");
  const [newdirector, setNewDirector] = useState("");
  const [newimage, setNewImage] = useState("");
  const refResetForm = useRef(null);

  async function fetchNewMovie() {
    try {
      const formData = new FormData();
      formData.append("title", newmovie);
      formData.append("director", newdirector);
      formData.append("imageFile", newimage);
      const response = await axios.post(`${BASE_URL}/movies`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 200) {
        setNewMovies("");
        setNewDirector("");
        setNewImage("");

        refResetForm.current.reset();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  console.log(newmovie);
  console.log(newdirector);
  console.log(newimage);

  return (
    <>
      <div>Hello Create</div>
      <form ref={refResetForm}>
        <input
          type="text"
          onChange={(e) => setNewMovies(e.target.value)}
          placeholder="ชื่อหนัง"
        />
        <input
          type="text"
          onChange={(e) => setNewDirector(e.target.value)}
          placeholder="ชื่อผู้กำกับ"
        />
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
        <div>
          <button type="submit" onClick={() => fetchNewMovie()}>
            Submit
          </button>
        </div>
      </form>
      <div>
        <Link to={`/`}>
          <button>Homepage</button>
        </Link>
      </div>
    </>
  );
}

export default Create;
