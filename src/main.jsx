import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const defaultConfig = {
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
};
// The defaultOptions object sets the default options for all queries, including a staleTime of 5 minutes. This means that if the data is older than 5 minutes, it will be refetched.
const queryClient = new QueryClient(defaultConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App className="bg-slate-900" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
