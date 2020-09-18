import React, { lazy, Suspense, useState } from "react";

import { Page, Row } from "@components/Layout";

import { sortByDate } from "@utils";
import { CITY_TD_FLEX } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useData } from "@hooks/useData";
import { CurrentType, OverallType, TimerseriesType } from "@types";

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
const BarChart = lazy(() => import("@components/Chart/BarChart"));

const Home = ({ theme, setTheme }) => {
  useScrollTop();
  const [isFirstVisit, setFirstVisit] = useLocalStorage("firstVisit4");
  const [showUpdates, setShowUpdates] = useState(false);

  const {
    updatesData,
    statsData,
    timeseriesData,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  } = useData();

  return (
    <Page>
      {/* <BarChart timeseries={timeseriesData}></BarChart> */}
      <Suspense fallback={<div />}>
        <FinishedPopup></FinishedPopup>
      </Suspense>

      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification
            notification={notification}
            onClose={() => {
              removeNotification();
              setShowUpdates(true);
            }}
          ></Notification>
        </Suspense>
      )}

      {statsData?.announcements && (
        <Suspense fallback={<div />}>
          <AnnouncementPopup announcement={statsData?.announcements[0]}></AnnouncementPopup>
        </Suspense>
      )}

      <Suspense fallback={<div />}>
        <Popup show={isFirstVisit == undefined} onClose={() => setFirstVisit(true)}></Popup>
      </Suspense>

      <Suspense fallback={<div />}>
        <NavBar {...{ theme, setTheme, mutateData }}></NavBar>
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

      {statsData && (
        <Suspense fallback={<div style={{ height: "110px" }} />}>
          <Board data={statsData.overview}></Board>
        </Suspense>
      )}

      {statsData && updatesData && (
        <Suspense fallback={<div />}>
          <Chart
            timeseries={statsData?.timeseries as TimerseriesType}
            current={statsData.overview.current}
          ></Chart>
        </Suspense>
      )}

      {statsData && updatesData && (
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
