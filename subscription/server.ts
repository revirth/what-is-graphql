require("dotenv-expand")(require("dotenv").config());
import { GraphQLServer } from "graphql-yoga";
import { PubSub } from "graphql-subscriptions";
import axios from "axios";

const typeDefs = `
  type Message{
    id: String!
    text: String!
  }
  type Query {
    messages: [Message!]!
  }
  type Mutation {
    sendMessage(text:String!): Message!
  }
  type Subscription {
    newMessage: Message!
  }
`;

import morgan = require("morgan");

const pubsub = new PubSub();

// default messages
const messages = [{ id: 0, text: "::: Welcome to minitalk :::" }];

const resolvers = {
  Query: {
    // messages: () => prisma.messages()
    messages: () => messages.sort((a, b) => b.id - a.id)
  },
  Mutation: {
    sendMessage: async (_, { text }) => {
      // prisma.createMessage({
      //   text
      // })
      var message = {
        id: messages.length,
        text: text
      };

      // publish graphql subscription
      pubsub.publish("newMessage", message);

      // https://docs.expo.io/versions/latest/guides/push-notifications/
      // send notification
      const { data } = await axios.post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: process.env.NOTIFICATION_TOKEN,
          title: "New Message",
          body: text
        }
      ); // TODO: check with a real phone

      // store message
      messages.push(message);
      return message;
    }
  },
  Subscription: {
    newMessage: {
      // subscribe: () => prisma.$subscribe.message().node(),
      subscribe: async () => pubsub.asyncIterator("newMessage"),
      resolve: payload => payload
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.use(morgan("dev"));

server.start(() => console.log("Server is running on http://localhost:4000"));
