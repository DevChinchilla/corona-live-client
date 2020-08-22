import "./i18n";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Suspense fallback={<div />}>
    <Router>
      <App />
    </Router>
  </Suspense>,
  document.getElementById("root")
);
