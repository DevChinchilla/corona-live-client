import React, { Suspense, lazy } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
const App = lazy(() => import("./App"));
const rootElement = document.getElementById("root");

const main = () =>
  render(
    <Suspense fallback={<div />}>
      <Router>
        <App />
      </Router>
    </Suspense>,
    rootElement
  );

main();
