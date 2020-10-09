import React, { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themes } from "@styles";
import { Switch, Redirect, Route, useLocation, useHistory } from "react-router-dom";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useData } from "@hooks/useData";
const Home = lazy(() => import("@components/Home"));
const City = lazy(() => import("@components/City"));

const pages = [
  {
    pageLink: "/",
    view: Home,
  },
  {
    pageLink: "/live",
    view: Home,
  },
  {
    pageLink: "/report",
    view: Home,
  },
  {
    pageLink: "/daily",
    view: Home,
  },
  {
    pageLink: "/rates",
    view: Home,
  },
  {
    pageLink: "/city/:cityId",
    view: City,
  },
];

const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const location = useLocation();
  const history = useHistory();

  const data = useData();

  useEffect(() => {
    history.replace({ pathname: location.pathname, state: null });
  }, []);

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
                render={({ match }) => <page.view {...{ theme, setTheme, data }} match={match} />}
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
