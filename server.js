const express = require("express");
const graphqlHTTP = require("express-graphql");
const { graphql, GraphQLSchema } = require("graphql");

const { queryType } = require("./query.js");
const { mutationType } = require("./mutation.js");

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });

//#region express server
const app = express();

const morgan = require("morgan");
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      JSON.stringify(req.body),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms"
    ].join(" ");
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log(`GraphQL Server Running at localhost:5000`);
});
//#endregion

//#region graphql
// var root = { hello: () => "Hello world!" };

// graphql(schema, "{ hello }", root).then(response => {
//   console.log(response);  // { data: { hello: 'Hello world!' } }
// });
//#endregion
