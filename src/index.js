import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routes/router";
import store from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
