import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const SavedList = props => {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => (
        <div className="saved-movie" key={movie.id}>
          
<NavLink to={`/movies/${movie.id}`} key={movie.id} activeClassName="saved-active">
            <div className="saved-movie">{movie.title}</div>
            </NavLink>

            
        
          <div onClick={() => props.removeFromSavedList(movie.id)}>X </div>
        </div>
      ))}
      <Link to={`/`}>
        <div className="home-button">Home</div>
      </Link>
    </div>
  );
};

export default SavedList;
