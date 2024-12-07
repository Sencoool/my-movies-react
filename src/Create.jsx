import { Form, Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import "./Create.css";

const BASE_URL = "http://localhost:3000";

function Create() {
  const [newmovie, setNewMovies] = useState("");
  const [newdirector, setNewDirector] = useState("");
  const [newdesc, setNewDesc] = useState("");
  const [newtype, setNewType] = useState("");
  const [newrelease, setNewRelease] = useState("");
  const [newrating, setNewRating] = useState("");
  const [newgenre, setNewGenre] = useState("");
  const [newrunningtime, setNewRunningTime] = useState("");
  const [newurl, setNewURL] = useState("");
  const [newimage, setNewImage] = useState("");
  const refResetForm = useRef(null);

  async function fetchNewMovie() {
    try {
      const formData = new FormData();
      formData.append("title", newmovie);
      formData.append("director", newdirector);
      formData.append("desc", newdesc);
      formData.append("type", newtype);
      formData.append("release_date", newrelease);
      formData.append("rating", newrating);
      formData.append("genre", newgenre);
      formData.append("running_time", newrunningtime);
      formData.append("teaser_url", newurl);
      formData.append("imageFile", newimage);
      const response = await axios.post(`${BASE_URL}/movies`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 200) {
        setNewMovies("");
        setNewDirector("");
        setNewDesc("");
        setNewType("");
        setNewRelease("");
        setNewRating("");
        setNewGenre("");
        setNewRunningTime("");
        setNewURL("");
        setNewImage("");

        refResetForm.current.reset();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="Create">
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
          <input
            type="text"
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="คำอธิบายหนัง"
          />
          <input
            type="text"
            onChange={(e) => setNewType(e.target.value)}
            placeholder="ประเภท"
          />
          <input
            type="text"
            onChange={(e) => setNewRelease(e.target.value)}
            placeholder="วันเริ่มฉาย"
          />
          <input
            type="text"
            onChange={(e) => setNewRating(e.target.value)}
            placeholder="เรตติ้ง"
          />
          <input
            type="text"
            onChange={(e) => setNewGenre(e.target.value)}
            placeholder="ประเภท"
          />
          <input
            type="text"
            onChange={(e) => setNewRunningTime(e.target.value)}
            placeholder="เวลาฉาย"
          />
          <input
            type="text"
            onChange={(e) => setNewURL(e.target.value)}
            placeholder="ลิ้งค์หนัง"
          />
          <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
          <div>
            <button
              className="btnCreate"
              type="submit"
              onClick={() => fetchNewMovie()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Create;
