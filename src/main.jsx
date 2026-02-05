import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css"; // optionnel, si tu as du CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <div style={{ backgroundColor: "#defad7", minHeight: "100vh" }}> */}
      <App />
    {/* </div> */}
  </React.StrictMode>
);