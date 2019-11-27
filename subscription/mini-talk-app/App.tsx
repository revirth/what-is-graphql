import React, { Suspense } from "react";
import { ApolloProvider } from "react-apollo-hooks";

import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import client from "./apollo";
import Chat from "./Chat";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}
