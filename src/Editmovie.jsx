import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import "./Editmovie.css";

const BASE_URL = "http://localhost:3000";

function Edit() {
  const { id } = useParams();
  const [newimage, setNewImage] = useState("");
  const [movie, setMovie] = useState({
    title: "",
  });

  async function fetchMovie(movieID) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieID}`);
      setMovie(response.data[1]);
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
      const formData = new FormData();
      formData.append("title", movie.title);
      formData.append("imageFile", newimage);

      await axios.put(`${BASE_URL}/movie/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      <Navbar />
      <div className="Edit">
        <div>Hello Edit Movie {movie.movie_id}</div>
        <div>{movie.title}</div>
        <div>
          <input type="text" onChange={handleMovieChange} value={movie.title} />
        </div>
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
        <div>
          <Link to={`/dashboard`}>
            <button className="onEdit" onClick={updateMovie} type="submit">
              แก้ไข
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Edit;
