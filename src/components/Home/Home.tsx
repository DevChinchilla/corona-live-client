import React, { Suspense, lazy } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AnnouncementPopup from "@components/Home/AnnouncementPopup";

import { Page } from "@components/Layout";

import { useLocalStorage } from "@hooks/useLocalStorage";
import Meta from "@components/Meta";
import Header from "./Header";
import NavBar from "./Navbar";
import Domestic from "@components/Domestic";
import World from "@components/World";

const FinishedPopup = lazy(() => import("@components/Home/FinishedPopup"));
const ThemePopup = lazy(() => import("@components/Home/ThemePopup"));
const Notification = lazy(() => import("@components/Notification"));

const Home = ({ theme, setTheme, data }) => {
  const history = useHistory();
  const routerMatch = useRouteMatch();
  const { path } = routerMatch;

  const [isFirstVisitor, setIsFirstVisitor] = useLocalStorage("firstVisitor", 1);
  const { statsData, isLoading, notification, removeNotification, casesSummary } = data;

  const helmet = () => {
    if (path == "/") {
      return (
        <Meta
          data={{
            title: `코로나 라이브 | 실시간 코로나 현황`,
            canonical: ``,
            description: `코로나 라이브 공식 사이트 | 코로나 확진자 현황을 실시간으로 제공합니다`,
          }}
        ></Meta>
      );
    }

    if (path == "/world") {
      return (
        <Meta
          data={{
            title: `코로나 라이브 | 세계 코로나 현황`,
            canonical: `world`,
            description: `세계 코로나 확진자 현황을 실시간으로 제공합니다`,
          }}
        ></Meta>
      );
    }

    if (path == "/daily") {
      return (
        <Meta
          data={{
            title: `코로나 라이브 | 일별 확진자`,
            canonical: `daily`,
            description: `코로나 확진자 추세를 일별로 제공합니다`,
          }}
        ></Meta>
      );
    }

    if (path == "/rates") {
      return (
        <Meta
          data={{
            title: `코로나 라이브 | 확진율`,
            canonical: `rates`,
            description: `국내 코로나 검사완료수 대비 확진율을 제공합니다 `,
          }}
        ></Meta>
      );
    }
  };

  return (
    <>
      {helmet()}
      <Suspense fallback={<div />}>
        {statsData && casesSummary && path == "/" && (
          <Suspense fallback={<div />}>
            <FinishedPopup casesSummary={casesSummary}></FinishedPopup>
            {isFirstVisitor == 1 && (
              <ThemePopup
                {...{ theme, setTheme }}
                onClose={() => setIsFirstVisitor(0)}
              ></ThemePopup>
            )}
          </Suspense>
        )}
      </Suspense>
      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification
            notification={notification}
            closeModal={removeNotification}
            openUpdates={() => history.push("/live/")}
          ></Notification>
        </Suspense>
      )}

      {statsData?.announcements && (
        <Suspense fallback={<div />}>
          <AnnouncementPopup announcement={statsData?.announcements[0]}></AnnouncementPopup>
        </Suspense>
      )}

      <Page>
        <Header {...{ theme, setTheme }}></Header>
        <NavBar></NavBar>

        {path != "/world" && <Domestic data={data}></Domestic>}
        {path == "/world" && <World data={data}></World>}
      </Page>
    </>
  );
};

export default Home;
