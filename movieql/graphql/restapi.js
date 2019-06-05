import fetch from "node-fetch";

const API_URL = {
  LIST: "https://yts.am/api/v2/list_movies.json",
  DETAIL: "https://yts.am/api/v2/movie_details.json?movie_id=",
  SUGGESTION: "https://yts.am/api/v2/movie_suggestions.json?movie_id="
};

export const getYtsMovies = (limit = 10, rating) => {
  let options = [];
  limit > 0 && options.push(`limit=${limit}`);
  rating > 0 && options.push(`minimum_rating=${rating}`);

  return fetch(`${API_URL.LIST}?${options.join("&")}`)
    .then(res => res.json())
    .then(json => json.data.movies);
};

export const getYtsMovie = movie_id =>
  fetch(`${API_URL.DETAIL}${movie_id}`)
    .then(res => res.json())
    .then(json => json.data.movie);

export const getYtsMovieSuggestions = movie_id =>
  fetch(`${API_URL.SUGGESTION}${movie_id}`)
    .then(res => res.json())
    .then(json => json.data.movies);
