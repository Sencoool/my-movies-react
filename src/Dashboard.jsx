import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import "./Dashboard.css";

const BASE_URL = "http://localhost:3000";

function Delete() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const btn = [
    {
      action: (
        <div>
          <button className="editBtn"></button>
          <button className="deleteBtn"></button>
        </div>
      ),
    },
  ];

  const columns = [
    {
      name: "MovieID",
      selector: (row) => row.movie_id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Director",
      selector: (row) => row.director,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link to={`/editmovie/${row.movie_id}`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={async () => {
              const isConfirmed = window.confirm(
                "คุณแน่ใจว่าจะลบข้อมูลหนังเรื่องนี้?"
              );
              if (isConfirmed) {
                await deleteMovie(row.movie_id);
              }
            }}
          >
            ลบ
          </button>
        </div>
      ),
    },
  ];

  async function fetchMovie() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      setMovies(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteMovie(id) {
    try {
      setIsLoading(true);
      console.log(id);

      await axios.delete(`${BASE_URL}/movie/${id}`);
      await fetchMovie();
      setIsLoading(false);
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="Dashboard">
          <DataTable columns={columns} data={movies}></DataTable>
          Dashboard
          {movies.map((movie, index) => (
            <div key={index}>
              {movie.movie_id}&nbsp;
              {movie.title}&nbsp;
              <Link to={`/editmovie/${movie.movie_id}`}>
                <button>Edit</button>
              </Link>
              <button
                onClick={async () => {
                  await deleteMovie(movie.movie_id);
                }}
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Delete;
