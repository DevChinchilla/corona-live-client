import React, { Suspense, lazy } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";

import AnnouncementPopup from "@components/Home/AnnouncementPopup";
import ThemePopup from "@components/Home/ThemePopup";
import FinishedPopup from "@components/Home/FinishedPopup";
import Notification from "@components/Notification";
import Domestic from "@components/Domestic";
import World from "@components/World";
import { Col, Page } from "@components/Layout";

import { useLocalStorage } from "@hooks/useLocalStorage";

const NavBar = lazy(() => import("@components/Home/Navbar"));
const Header = lazy(() => import("@components/Home/Header"));

const Home = ({ theme, setTheme, data }) => {
  const history = useHistory();
  const routerMatch = useRouteMatch();
  const { path } = routerMatch;

  const [isFirstVisitor, setIsFirstVisitor] = useLocalStorage("firstVisitor", 1);
  const { statsData, isLoading, notification, removeNotification, casesSummary } = data;

  console.log(path);

  const helmet = () => {
    if (path == "/") {
      return (
        <Helmet>
          <title>코로나 라이브 | 실시간</title>
          <link rel="canonical" href="https://corona-live.com/live" />
        </Helmet>
      );
    }

    if (path == "/daily") {
      return (
        <Helmet>
          <title>코로나 라이브 | 일별</title>
          <link rel="canonical" href="https://corona-live.com/daily" />
        </Helmet>
      );
    }

    if (path == "/rates") {
      return (
        <Helmet>
          <title>코로나 라이브 | 확진율</title>
          <link rel="canonical" href="https://corona-live.com/rates" />
        </Helmet>
      );
    }
  };
  return (
    <>
      {helmet()}
      {statsData && casesSummary && path == "/" && (
        <Suspense fallback={<div />}>
          <FinishedPopup casesSummary={casesSummary}></FinishedPopup>
          {isFirstVisitor == 1 && (
            <ThemePopup {...{ theme, setTheme }} onClose={() => setIsFirstVisitor(0)}></ThemePopup>
          )}
        </Suspense>
      )}

      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification
            notification={notification}
            closeModal={removeNotification}
            openUpdates={() => history.push("/live")}
          ></Notification>
        </Suspense>
      )}

      {statsData?.announcements && (
        <Suspense fallback={<div />}>
          <AnnouncementPopup announcement={statsData?.announcements[0]}></AnnouncementPopup>
        </Suspense>
      )}

      <Page>
        <Suspense fallback={<div />}>
          <Header {...{ theme, setTheme }}></Header>
        </Suspense>
        <Suspense fallback={<div />}>
          <NavBar></NavBar>
        </Suspense>

        <Col>
          {path != "/world" && <Domestic data={data}></Domestic>}
          {path == "/world" && <World></World>}
        </Col>
      </Page>
    </>
  );
};

export default Home;
