import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ContractProvider } from "./context/contractContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContractProvider>
      <App />
    </ContractProvider>
  </React.StrictMode>
);
