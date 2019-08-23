import React, { useState, useEffect } from "react";

import axios from "axios";
import MovieCard from "./MovieCard";
import { NavLink, Route, Link } from "react-router-dom";

const Movie = props => {
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

  const nextMovie = () => {
    setId(nextId);
  };
  const prevMovie = () => {
    setId(prev);
  };

  //  Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
  };

  const editMovie = () => {
    props.history.push(`/update-movie/${id}`)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div>
      <div className="save-wrapper">
        <Link to={`/movies/${prev}`}>
          <div className="next-button" onClick={prevMovie}>{`<`}</div>
        </Link>
        <div className="movie-card" >
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
          <Link to={`/`}>
            <div className="save-button" onClick={saveMovie}>
              Save
            </div>
            </Link>
            <div className="save-button" onClick={editMovie}>
              Update
            </div>            
          
        </div>
        <Link to={`/movies/${nextId}`}>
          <div className="next-button" onClick={nextMovie}>
            >
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Movie;
