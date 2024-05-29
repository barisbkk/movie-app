import { createContext, useContext } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const MovieContextProvider = ({ children }) => {
  return <MovieContext.Provider value={null}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
