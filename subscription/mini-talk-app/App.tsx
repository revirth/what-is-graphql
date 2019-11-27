import React, { Suspense, useState, useEffect } from "react";
import { ApolloProvider } from "react-apollo-hooks";

import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import client from "./apollo";
import Chat from "./Chat";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default function App() {
  const [notificationStatus, setNotificationStatus] = useState();
  const askPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    setNotificationStatus(status);

    let token = await Notifications.getExpoPushTokenAsync(); // Must be on a physical device to get an Expo Push Token]
    // TODO: test with a real phone

    console.log(token);
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}
