import axios from "axios";

const BASE_URL = "http://localhost:3000";

function Edit() {
  async function fetchMovie(movieID) {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      <div>Hello Edit</div>
      <Link to={`/`}>
        <button>Homepage</button>
      </Link>
    </>
  );
}

export default Edit;
