import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ id, title, rating, poster }) => (
  <Link to={`/details/${id}`}>
    <figure>
      <img
        src={poster}
        alt={title}
        onError={e => {
          e.target.onerror = null;
          e.target.src = "//placekitten.com/230/300";
        }}
      />
      <figcaption>
        <span>{title}</span>
        <span>
          {new Array(Math.floor(Math.floor(rating) / 2)).fill("★").join("")}
        </span>
      </figcaption>
    </figure>
  </Link>
);

export default Movie;
