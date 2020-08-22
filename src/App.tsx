import React, { useState, lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themes } from "@styles";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

const Home = lazy(() => import("@components/Home"));

const pages = [
  {
    pageLink: "/",
    view: Home,
  },
];

const App = () => {
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Suspense fallback={<div>aaa</div>}>
        <Switch location={location}>
          {pages.map((page, index) => {
            return <Route exact path={page.pageLink} render={() => <page.view />} key={index} />;
          })}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
