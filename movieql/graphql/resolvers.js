import {
  people,
  getById,
  getMovies,
  getMovieById,
  addMovie,
  deleteMovieById
} from "./db";

import { getYtsMovies, getYtsMovieSuggestions, getYtsMovie } from "./restapi";

const resolvers = {
  Query: {
    name: () => "JT",

    people: () => people,

    person: (_, { id }) => getById(id),

    movies: () => getMovies(),

    movie: (_, { id }) => getMovieById(id),

    ytsMovies: (_, { limit, rating }) => getYtsMovies(limit, rating),
    ytsMovie: (_, { id }) => getYtsMovie(id),
    ytsMovieSuggestions: (_, { id }) => getYtsMovieSuggestions(id)
  },
  Mutation: {
    addMovie: (_, { title, time }) => addMovie(title, time),

    deleteMovieById: (_, { id }) => deleteMovieById(id)
  }
};

export default resolvers;
