import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";

const link = createHttpLink({
    uri: 'http://localhost:3000/graphql'
})

export default new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});