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
  const [records, setRecords] = useState(movies);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      name: "MovieID",
      selector: (row) => row.movie_id,
      sortable: true,
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
            <button className="Edit">ปรับแต่ง</button>
          </Link>
          <button
            className="Delete"
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

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "white",
        color: "black",
        fontWeight: "bolder",
        fontSize: "20px",
      },
    },
  };

  const handleChange = (e) => {
    let query = e.target.value;
    const newrecords = movies.filter((item) =>
      item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setRecords(newrecords);
  };

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
          <div className="search">
            <h2>Movies List</h2>
            <input
              type="text"
              placeholder="ค้นหาชื่อหนัง"
              onChange={handleChange}
            />
          </div>
          <DataTable
            columns={columns}
            data={records.length > 0 ? records : movies}
            customStyles={customStyles}
            pagination
          ></DataTable>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Delete;
