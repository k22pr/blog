import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";

import Config from "../config";

export default new ApolloClient({
   link: new HttpLink({
      uri: `http://${Config.serverUrl}:${Config.serverPort}/graphql`,
      fetch: fetch,
   }),
   cache: new InMemoryCache(),
   //  defaultOptions: {
   //     query: {
   //        fetchPolicy: "no-cache",
   //        errorPolicy: "all",
   //     },
   //  },
});
