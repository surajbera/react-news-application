import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NewsProvider } from "./context/NewsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NewsProvider>
      <App />
    </NewsProvider>
  </React.StrictMode>
);
