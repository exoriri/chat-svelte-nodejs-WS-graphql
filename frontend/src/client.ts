import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
  split,
} from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authMiddleware = new ApolloLink((operation, forward) => {
  const cachedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  operation.setContext({
    headers: {
      authorization: cachedUser ? `Bearer ${cachedUser.token}` : "",
    },
  });
  return forward(operation);
});

const httplink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://localhost:3000/graphql`,
    connectionParams: () => {
      const cachedUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      return {
        headers: {
          authorization: cachedUser ? `Bearer ${cachedUser.token}` : "",
        },
      };
    },
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  concat(authMiddleware, httplink)
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
