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
import ThemePopup from "@components/ThemePopup";

const NavBar = lazy(() => import("../Home/NavBar"));
const Updates = lazy(() => import("../Updates"));
const FinishedPopup = lazy(() => import("./FinishedPopup"));
const Popup = lazy(() => import("./Popup"));

const Notification = lazy(() => import("@components/Notification"));
const AnnouncementPopup = lazy(() => import("@components/Domestic/AnnouncementPopup"));
const Board = lazy(() => import("@components/Board"));
const Table = lazy(() => import("@components/Table"));
const Footer = lazy(() => import("@components/Footer"));
const Chart = lazy(() => import("@components/Chart/Chart"));

const Domestic = ({ theme, setTheme, data }) => {
  const routerMatch = useRouteMatch();
  useScrollTop();
  const [isFirstVisitor, setIsFirstVisitor] = useLocalStorage("firstVisitor", 1);
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
    <>
      {statsData && casesSummary && routerMatch.path == "/" && (
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
    </>
  );
};

export default Domestic;
