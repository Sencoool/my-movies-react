import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Youtube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function App() {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const scrollContainerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  const opts = {
    width: "100%",
    height: "100%",
    border: "none",
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      disablekb: 1,
      fs: 0,
      mute: 1,
    },
  };

  async function fetchMovie() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      const movieData = response.data;

      if (movieData.length > 0) {
        setMovies(movieData);
        const randomIndex = Math.floor(Math.random() * movieData.length);
        setRandomMovie(movieData[randomIndex]);
      } else {
        console.log("No movies available.");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -1200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 1200, behavior: "smooth" });
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    if (isMuted) {
      playerRef.current.mute();
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    if (movies.length > 0 && randomMovie === null) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  }, [movies, randomMovie]);

  return (
    <>
      <Navbar />
      {randomMovie && (
        <div className="BigImage">
          <div className="info">
            <h1>{randomMovie.title}</h1>
            <p>{randomMovie.desc}</p>
            <div className="btn">
              <Link to={`/playmovie/${randomMovie.movie_id}`}>
                <button className="button">▶เริ่ม</button>
              </Link>
              <button onClick={toggleMute} className="button">
                {isMuted ? "🔇 ปิดเสียง" : "🔊 เปิดเสียง"}
              </button>
            </div>
          </div>
          <Youtube
            videoId={getYouTubeID(randomMovie.teaser_url)}
            opts={opts}
            className={`youtube-video ${isVideoReady ? "visible" : "hidden"}`}
            onReady={onPlayerReady}
          />
        </div>
      )}
      <div className="MovieWrapper">
        <div className="MovieSection">
          <h1>Movie</h1>
          <div className="Movieslide-container">
            <button className="scroll-btn left-btn" onClick={scrollLeft}>
              ←
            </button>
            <div className="Movieslide" ref={scrollContainerRef}>
              {movies.map((movie, index) => (
                <div className="card" key={index}>
                  <Link to={`/playmovie/${movie.movie_id}`}>
                    <img
                      src={`${BASE_URL}/images/${movie.imageFile}`}
                      alt={`Image of ${movie.title}`}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <button className="scroll-btn right-btn" onClick={scrollRight}>
              →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
