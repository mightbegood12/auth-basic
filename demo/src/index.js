import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppProvider } from "./context/AppContext";
import { scan } from "react-scan";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

//development
scan({
  enabled: true,
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
