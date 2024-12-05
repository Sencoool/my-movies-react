import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function App() {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const scrollContainerRef = useRef(null);

  async function fetchMovie() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      const movieData = response.data;

      if (movieData.length > 0) {
        setMovies(movieData);

        // เลือกรูปภาพแบบสุ่มในครั้งแรกที่มีข้อมูล
        const randomIndex = Math.floor(Math.random() * movieData.length);
        setRandomMovie(movieData[randomIndex]);
      } else {
        console.log("No movies available.");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  // ตรวจสอบว่าหาก `movies` มีข้อมูล จะสุ่ม `randomMovie` ใหม่ทุกครั้ง
  useEffect(() => {
    if (movies.length > 0 && randomMovie === null) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  }, [movies, randomMovie]);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -1200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 1200, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      {randomMovie && (
        <div className="BigImage">
          <img
            src={`${BASE_URL}/images/${randomMovie.imageFile}`}
            alt="A random big picture"
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
