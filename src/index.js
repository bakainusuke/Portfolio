import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initUsers } from "./data/repository";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

initUsers();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
