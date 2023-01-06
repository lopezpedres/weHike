import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MapProvider } from "react-map-gl";
import UserAuthProvider from "./context/UserAuthProvider/UserAuthProvider";
import ImageModalProvider from "./context/ImageModalProvider/ImageModalProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserAuthProvider>
      <MapProvider>
        <BrowserRouter>
          <ImageModalProvider>
            <App />
          </ImageModalProvider>
        </BrowserRouter>
      </MapProvider>
    </UserAuthProvider>
  </React.StrictMode>
);
