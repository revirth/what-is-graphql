import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import client from "./apollolClient";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <Route exact={true} path={"/"} component={Home} />
      <Route exact={true} path={"/details/:movieId"} component={Detail} />
    </HashRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
