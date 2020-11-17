import React, { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themes } from "@styles";
import { Switch, Redirect, Route, useLocation, useHistory } from "react-router-dom";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useData } from "@hooks/useData";
import { IE9ErrorBoundary } from "@components/ErrorBoundary";

const DomesticLive = lazy(() => import("@components/Domestic/DomesticLive"));
const WorldLive = lazy(() => import("@components/World/WorldLive"));
const Country = lazy(() => import("@components/World/Country"));
const Home = lazy(() => import("@components/Home"));
const City = lazy(() => import("@components/Domestic/City"));

const pages = [
  {
    pageLink: "/",
    view: Home,
  },
  {
    pageLink: "/live",
    view: DomesticLive,
  },
  {
    pageLink: "/city/:cityId",
    view: City,
  },

  {
    pageLink: "/world/live",
    view: WorldLive,
  },
  {
    pageLink: "/world",
    view: Home,
  },

  {
    pageLink: "/country/:countryId",
    view: Country,
  },

  {
    pageLink: "/daily",
    view: Home,
  },
  {
    pageLink: "/rates",
    view: Home,
  },
];

const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const location = useLocation();

  const data = useData(location.pathname);

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
