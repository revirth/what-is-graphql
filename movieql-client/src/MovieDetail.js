import React from "react";

const MovieDetail = ({ id, title, rating, poster, desc, genres, imdb }) => (
  <div className="detail">
    <div>
      <img src={poster} alt={title} />
    </div>
    <div>
      <h1 className="flexbetween">
        <span>{title}</span>
        <span>
          {new Array(Math.floor(Math.floor(rating) / 2)).fill("★").join("")}
        </span>
      </h1>
      <h2>{desc}</h2>
      <h2 className="flexbetween">
        <span>genres: {genres.join(", ")}</span>
        <span>
          <a href={`http://www.imdb.com/title/${imdb}`}>
            <img
              alt={title}
              src="https://cdn4.iconfinder.com/data/icons/socialmediaicons_v120/48/imdb.png"
            />
          </a>
        </span>
      </h2>
    </div>
  </div>
);

export default MovieDetail;
