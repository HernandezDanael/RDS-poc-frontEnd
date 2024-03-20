import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {

// Créez une instance du client Apollo
return new ApolloClient({
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache(),
});
};
