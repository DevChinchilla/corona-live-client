import React, { Suspense, lazy } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

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

  return (
    <>
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
          {path == "/" && <Domestic data={data}></Domestic>}
          {path == "/world" && <World></World>}
        </Col>
      </Page>
    </>
  );
};

export default Home;
