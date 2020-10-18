import React, { lazy, Suspense, useEffect, useState } from "react";
import { Page, Row } from "@components/Layout";

import { sortByDate } from "@utils";
import { CITY_TD_FLEX } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { CurrentType, OverallType } from "@types";
import { useRouteMatch } from "react-router-dom";
import MapExplorer from "./MapExplorer";
import ToggleButtons from "@components/ToggleButtons";

const NavBar = lazy(() => import("@components/Home/HomeNavBar"));
const Updates = lazy(() => import("@components/Home/Updates"));
const Notification = lazy(() => import("@components/Notification"));
const AnnouncementPopup = lazy(() => import("@components/Home/AnnouncementPopup"));
const FinishedPopup = lazy(() => import("@components/Home/FinishedPopup"));
const Board = lazy(() => import("@components/Board"));
const Table = lazy(() => import("@components/Table"));
const Footer = lazy(() => import("@components/Footer"));
const Popup = lazy(() => import("@components/Home/Popup"));
const Chart = lazy(() => import("@components/Chart/Chart"));

const Home = ({ theme, setTheme, data }) => {
  const routerMatch = useRouteMatch();
  useScrollTop();
  const [isFirstVisit, setFirstVisit] = useLocalStorage("firstVisit4");
  const [showUpdates, setShowUpdates] = useState(routerMatch.path == "/live");
  const [showMap, setShowMap] = useState(false);

  const {
    updatesData,
    statsData,
    timeseriesData,
    mutateData,
    isLoading,
    notification,
    removeNotification,
    casesSummary,
  } = data;

  useEffect(() => {
    if (routerMatch.path == "/live") setShowUpdates(true);
  }, [routerMatch]);

  return (
    <Page>
      {statsData && casesSummary && routerMatch.path == "/" && (
        <Suspense fallback={<div />}>
          <FinishedPopup casesSummary={casesSummary}></FinishedPopup>
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

      <Suspense fallback={<div />}>
        <NavBar {...{ theme, setTheme, setShowUpdates }}></NavBar>
      </Suspense>

      {updatesData ? (
        <Suspense fallback={<div style={{ height: "50px" }} />}>
          <Updates
            data={sortByDate(updatesData)}
            {...{ mutateData, isLoading, showUpdates, setShowUpdates }}
          ></Updates>
        </Suspense>
      ) : (
        <Row h="30px"></Row>
      )}

      {statsData && casesSummary && (
        <Suspense fallback={<div style={{ height: "110px" }} />}>
          <Board data={statsData.overview} casesSummary={casesSummary}></Board>
        </Suspense>
      )}

      {statsData && (
        <Suspense fallback={<div />}>
          <Chart stats={statsData} timeseries={timeseriesData}></Chart>
        </Suspense>
      )}

      {statsData && (
        <Row jc="center" mt="6px" fadeInUp delay={5}>
          <ToggleButtons
            noBg
            options={[
              { name: "지도", value: true, visible: true, icon: "Map" },
              { name: "지역별 표", value: false, visible: true, icon: "Table" },
            ]}
            activeOption={showMap}
            setOption={setShowMap}
          ></ToggleButtons>
        </Row>
      )}

      {statsData && showMap && (
        <Suspense fallback={<div />}>
          <MapExplorer stats={statsData}></MapExplorer>
        </Suspense>
      )}

      {statsData && updatesData && !showMap && (
        <Suspense fallback={<div />}>
          <Table
            current={statsData.current as CurrentType}
            overall={statsData.overall as OverallType}
            updates={sortByDate(updatesData)}
            tdFlex={CITY_TD_FLEX}
          ></Table>
        </Suspense>
      )}
      {statsData && updatesData && (
        <Suspense fallback={<div />}>
          <Footer></Footer>
        </Suspense>
      )}
    </Page>
  );
};

export default Home;
