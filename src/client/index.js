import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap";
import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import AppRoute from "./routes/routes";
import registerServiceWorker from './registerServiceWorker';
const jsx = (
  <AppRoute />
);

ReactDOM.render(jsx, document.getElementById("root"));

registerServiceWorker();