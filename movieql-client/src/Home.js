import React from "react";
import { Query } from "react-apollo";
import { HOME_PAGE } from "./queries";
import Movie from "./Movie";
import "./Home.css";
import Loading from "./Loading";
import ScrollTop from "./ScrollTop";

const Home = () => (
  <ScrollTop>
    <Query query={HOME_PAGE}>
      {({ loading, data, error }) => {
        if (loading) return <Loading />;
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
  </ScrollTop>
);

export default Home;
