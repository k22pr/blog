import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
const fetch = require("isomorphic-fetch");

import Config from "~/config";

const httpLink = new HttpLink({
  uri: `http://${Config.serverUrl}:${Config.serverPort}/graphql`,
});

const authLink = setContext((_: any, { headers }: any) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  //  defaultOptions: {
  //     query: {
  //        fetchPolicy: "no-cache",
  //        errorPolicy: "all",
  //     },
  //  },
});
