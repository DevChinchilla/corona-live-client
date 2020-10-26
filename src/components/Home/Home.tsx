import React, { Suspense, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AnnouncementPopup from "@components/Home/AnnouncementPopup";
import FinishedPopup from "@components/Home/FinishedPopup";
import NavBar from "@components/Home/NavBar";
import Notification from "@components/Notification";
import ToggleButtons from "@components/ToggleButtons";

import Domestic from "@components/Domestic";
import World from "@components/World";

import { Page, Row } from "@components/Layout";

import { useLocalStorage } from "@hooks/useLocalStorage";
import ThemePopup from "./ThemePopup";

const Home = ({ theme, setTheme, data }) => {
  const history = useHistory();
  const routerMatch = useRouteMatch();
  const { path } = routerMatch;

  const [isFirstVisitor, setIsFirstVisitor] = useLocalStorage("firstVisitor", 1);
  const [showUpdates, setShowUpdates] = useState(path == "/live");

  const { statsData, isLoading, notification, removeNotification, casesSummary } = data;

  useEffect(() => {
    if (path == "/live") setShowUpdates(true);
  }, [routerMatch]);

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
            openUpdates={() => setShowUpdates(true)}
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
          <NavBar {...{ theme, setTheme }}></NavBar>
        </Suspense>
        <Row jc="center" mt="6px" fadeInUp delay={5}>
          <ToggleButtons
            noBg
            options={[
              { name: "한국 현황", value: "/", icon: "Domestic" },
              { name: "세계 현황", value: "/world", icon: "World" },
            ]}
            activeOption={path}
            setOption={(option) => history.push(option)}
          ></ToggleButtons>
        </Row>
        {path == "world" && <World></World>}
        {path == "/" && (
          <Domestic {...{ showUpdates, setShowUpdates, theme, setTheme, data }}></Domestic>
        )}
      </Page>
    </>
  );
};

export default Home;
