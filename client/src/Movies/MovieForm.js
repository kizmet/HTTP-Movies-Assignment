import React, { useState, useEffect } from "react";

import axios from "axios";
import MovieCard from "./MovieCard";
import { NavLink, Route, Link } from "react-router-dom";

const MovieForm = props => {
  const [movie, setMovie] = useState();
  const [id, setId] = useState(props.match.params.id);
  const [nextId, setNextId] = useState();
  const [prev, setPrev] = useState();

  useEffect(() => {
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook
    const request = async () => {
      await axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
          const next = response.data.id + 1;
          next > 5 ? setNextId(0) : setNextId(next);
          const pre = response.data.id - 1;
          pre < 0 ? setPrev(5) : setPrev(pre);
        })

        .catch(error => {
          console.error(error);
        });
    };
    request();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  //  Uncomment this only when you have moved on to the stretch goals
  const editMovie = () => {
    const request = async () => {
      await axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(response => {
          console.log(response);
          //props.setMovies(props.movies.map(mov => (mov.id === movie.id ? movie : mov)));
        })

        .catch(error => {
          console.error(error);
        });
    };
    request().then(props.history.push(`/`))
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div>
      <div className="save-wrapper">
        <form>
          <div className="movie-card">
            <label className="movie-metascore">
              Title:
              <input value={movie.title} onChange={handleChange} />
            </label>
            <label className="movie-metascore">
              Director:{" "}
              <input
                name="director"
                value={movie.director}
                onChange={handleChange}
              />
            </label>
            <label className="movie-metascore">
              Metascore:{" "}
              <input
                name="metascore"
                type="number"
                value={movie.metascore}
                onChange={handleChange}
              />
            </label>
            <label>
              Actors:
              <input name="stars" value={movie.stars} onChange={handleChange} />
            </label>

            
              <div className="save-button" onClick={editMovie}>
                Save
              </div>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
