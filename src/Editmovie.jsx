import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import "./Editmovie.css";

const BASE_URL = "http://localhost:3000";

function Edit() {
  const { id } = useParams();
  const [newimage, setNewImage] = useState("");
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    desc: "",
    type: "",
    release_date: "",
    rating: "",
    genre: "",
    running_time: "",
    teaser_url: "",
  });
  const refResetForm = useRef(null);

  async function fetchMovie(movieID) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieID}`);
      setMovie(response.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  }
  async function updateMovie() {
    try {
      const formData = new FormData();
      formData.append("title", movie.title);
      formData.append("director", movie.director);
      formData.append("desc", movie.desc);
      formData.append("type", movie.type);
      formData.append("release", movie.release_date);
      formData.append("rating", movie.rating);
      formData.append("genre", movie.genre);
      formData.append("running_time", movie.running_time);
      formData.append("teaser_url", movie.teaser_url);
      formData.append("imageFile", newimage);

      const response = await axios.put(`${BASE_URL}/movie/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);

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
        <div>กำลังปรับแต่ง {movie.title}</div>
        <form ref={refResetForm}>
          <div className="input-box">
            <input
              type="text"
              value={movie.title}
              onChange={(e) => setMovie({ ...movie, title: e.target.value })}
              placeholder="ชื่อหนัง"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={movie.director}
              onChange={(e) => setMovie({ ...movie, director: e.target.value })}
              placeholder="ชื่อผู้กำกับ"
            />
          </div>
          <div className="input-box">
            <textarea
              className="description-textarea"
              value={movie.desc}
              onChange={(e) => setMovie({ ...movie, desc: e.target.value })}
              placeholder="คำอธิบายหนัง"
            ></textarea>
          </div>
          <div className="input-box">
            <select
              onChange={(e) => setMovie({ ...movie, type: e.target.value })}
              placeholder="ประเภท"
            >
              <option value="">เลือกประเภท</option>
              <option value="Movie">Movie</option>
              <option value="Series">Series</option>
            </select>
          </div>
          <div className="input-box">
            <input
              type="text"
              value={movie.release_date}
              onChange={(e) =>
                setMovie({ ...movie, release_date: e.target.value })
              }
              placeholder="วันเริ่มฉาย"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={movie.rating}
              onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
              placeholder="เรตติ้ง"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={movie.genre}
              onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
              placeholder="แท็กหนัง"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={movie.running_time}
              onChange={(e) =>
                setMovie({ ...movie, running_time: e.target.value })
              }
              placeholder="เวลาฉาย"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              value={movie.teaser_url}
              onChange={(e) =>
                setMovie({ ...movie, teaser_url: e.target.value })
              }
              placeholder="ลิ้งค์หนัง"
            />
          </div>
          <div className="input-box">
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </div>
          <div className="submit-container">
            <button className="btnCreate" type="submit" onClick={updateMovie}>
              แก้ไข
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Edit;
