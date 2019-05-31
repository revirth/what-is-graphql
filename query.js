const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const { movieType, directorType } = require("./types");
const { movies, directors } = require("./data.js");

const _ = require("lodash");

exports.queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello World"
    },
    movie: {
      type: movieType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(source, args) {
        return _.find(movies, { id: args.id });
      }
    },
    director: {
      type: directorType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(source, args) {
        return _.find(directors, { id: args.id });
      }
    }
  }
});
