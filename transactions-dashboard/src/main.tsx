import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";

const URL = "http://localhost:4200/graphql";

const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache({ addTypename: false }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <App />
        </LocalizationProvider>
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
);
