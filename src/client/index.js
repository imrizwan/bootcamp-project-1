import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap";
import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import AppRoute from "./routes/routes";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRoute />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
