import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import Movie from "./Movie";

const MovieList = props => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.error("Server Error", error);
        });
    };

    getMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link to={`/movies/${movie.id}`} key={movie.id} setMovies={setMovies} movies={movies} >
          <MovieCard key={movie.id} movie={movie} setMovies={setMovies} />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
