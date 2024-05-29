import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";
import { toastWarnNotify } from "../helper/ToastNotify";
import { useAuthContext } from "../context/AuthContext";
import { useRef } from "react";

const Main = () => {
  const { movies, loading, getMovies } = useMovieContext();
  const { currentUser } = useAuthContext();
  // const [search, setSearch] = useState("");

  //* DOM elementlerine ulaşmamızı sağlayan hook
  const inputRef = useRef();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  // const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (search && currentUser) {
    //   getMovies(SEARCH_API);
    // } else if (!currentUser) {
    //   toastWarnNotify("Please log in to search a movie");
    // } else {
    //   toastWarnNotify("Please enter a text");
    // }
    //* useRef ile
    if (inputRef.current.value && currentUser) {
      getMovies(SEARCH_API + inputRef.current.value);
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie");
    } else {
      toastWarnNotify("Please enter a text");
    }
  };

  return (
    <div>
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
          // onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </div>
  );
};

export default Main;
