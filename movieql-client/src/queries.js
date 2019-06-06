import gql from "graphql-tag";

export const HOME_PAGE = gql`
  {
    ytsMovies(limit: 20, rating: 5) {
      id
      title
      medium_cover_image
      rating
    }
  }
`;

export const DETAIL_PAGE = gql`
  query getYtsMovieDetails($movieId: Int!) {
    ytsMovie(id: $movieId) {
      id
      title_long
      medium_cover_image
      rating
      description_intro
      genres
      language
      imdb_code
    }
    ytsMovieSuggestions(id: $movieId) {
      id
      medium_cover_image
      title
      rating
    }
  }
`;
