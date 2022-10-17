import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { getSwordToken } from "./services/sword";
import { Layout } from "./pages/_layout";
import "./assets/styles/index.css";
import "antd/dist/antd.css";

getSwordToken();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>
);
