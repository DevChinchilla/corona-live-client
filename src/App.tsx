import React, { useState, lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themes } from "@styles";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

const Home = lazy(() => import("@components/Home"));
const City = lazy(() => import("@components/City"));

const pages = [
  {
    pageLink: "/",
    view: Home,
  },
  {
    pageLink: "/city/:id",
    view: City,
  },
];

const App = () => {
  const [theme, setTheme] = useState("dark");
  const location = useLocation();

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Suspense fallback={<div />}>
        <Switch location={location}>
          {pages.map((page, index) => {
            return (
              <Route
                exact
                path={page.pageLink}
                render={({ match }) => <page.view {...{ theme, setTheme }} match={match} />}
                key={index}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
