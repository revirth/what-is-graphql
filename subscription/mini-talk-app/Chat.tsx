import React, { useState, useEffect } from "React";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import gql from "graphql-tag";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import withSuspense from "./withSuspense";

const MESSAGE_QUERY = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      id
      text
    }
  }
`;

const Chat = () => {
  const {
    data: { messages: oldMessages },
    error
  } = useQuery(MESSAGE_QUERY, {
    suspend: true
  });
  const [messages, setMessages] = useState(oldMessages || []);
  const { data } = useSubscription(NEW_MESSAGE);
  const handleNewMessage = () => {
    if (data) {
      console.log(data);

      const { newMessage } = data;
      setMessages(previous => [newMessage, ...previous]);
    }
  };

  useEffect(() => {
    handleNewMessage();
  }, [data]);

  const [message, setMessage] = useState("");
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: { text: message },
    refetchQueries: [{ query: MESSAGE_QUERY }]
  });

  const onSubmit = async () => {
    try {
      if (message === "") {
        Alert.alert("message is reuqired");
        return;
      }

      await sendMessageMutation();
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingVertical: 50
        }}
      >
        {messages.map(_ => (
          <View key={_.id} style={{ marginBottom: 10 }}>
            <Text>{_.text}</Text>
          </View>
        ))}
        <TextInput
          placeholder="Type a message"
          style={{
            width: "80%",
            borderRadius: 20
          }}
          returnKeyType="send"
          value={message}
          onChangeText={_ => setMessage(_)}
          onSubmitEditing={onSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default withSuspense(Chat);
