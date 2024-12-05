import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import axios from "axios";
import { useParams } from "react-router-dom";
import getYoutubeID from "get-youtube-id";
import "./Playmovie.css";
import Navbar from "./components/navbar.jsx";

const BASE_URL = "http://localhost:3000";

export default function Playmovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    teaser_url: "",
  });
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1, // ลดขนาดโลโก้ YouTube
      controls: 1, // แสดงปุ่มควบคุม
    },
  };

  async function fetchMovie(movieID) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieID}`);
      setMovie(response.data[1]);
      console.log(getYoutubeID(movie.teaser_url));
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <>
      <div className="PlaymoviePage">
        <Navbar />
        <div className="video-container">
          {movie.teaser_url ? (
            <Youtube
              videoId={getYoutubeID(movie.teaser_url)}
              opts={opts}
              className="youtube-video"
            />
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}
