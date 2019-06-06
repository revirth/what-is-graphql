import React from "react";
import { Query } from "react-apollo";
import { HOME_PAGE } from "./queries";
import Movie from "./Movie";
import "./Home.css";

const Home = () => (
  <Query query={HOME_PAGE}>
    {({ loading, data, error }) => {
      if (loading) return <span>loading...</span>;
      if (error) return <span>Something happens...{error}</span>;

      return (
        <div id="columns">
          {data.ytsMovies.map(movie => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              poster={movie.medium_cover_image}
            />
          ))}
        </div>
      );
    }}
  </Query>
);

export default Home;
