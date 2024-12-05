import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import { Carousel } from "react-responsive-carousel";

const BASE_URL = "http://localhost:3000";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMovie() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <Navbar />
      <div className="BigImage">
        <img src={``} alt="A random big picture" />
      </div>
      <div className="Movieslide">
        {/* {movies.map((movie) => (
          <div key={movie.movie_id}>
            <Carousel>
              <img src={`${BASE_URL}/images/${movie.imageFile}`} />
            </Carousel>
            {
              <img
                src={`${BASE_URL}/images/${movie.imageFile}`}
                alt={`Image of ${movie.title}`}
              />
            }
          </div>
        ))} */}
        <Carousel showThumbs={false} infiniteLoop={true}>
          {/* showThumbs={false} */}
          {movies.map((movie) => (
            <img src={`${BASE_URL}/images/${movie.imageFile}`} alt="" />
          ))}
        </Carousel>
      </div>
      <Footer />
    </>
  );
}

export default App;
