import { GraphQLServer } from "graphql-yoga";
import { PubSub } from "graphql-subscriptions";

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
    sendMessage: (_, { text }) => {
      // prisma.createMessage({
      //   text
      // })
      var message = { id: messages.length, text: text };

      pubsub.publish("newMessage", message);

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
