import React, { lazy, Suspense, useEffect, useState } from "react";

import { Page, Row } from "@components/Layout";

import { sortByDate } from "@utils";
import { CITY_TD_FLEX, IMPORTANT_MESSAGE } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useData } from "@hooks/useData";
import { CurrentType, OverallType, TimerseriesType } from "@types";
import Graph from "@components/Graph";

const NavBar = lazy(() => import("@components/Home/HomeNavBar"));
const Updates = lazy(() => import("@components/Home/Updates"));
const Notification = lazy(() => import("@components/Notification"));
const AnnouncementPopup = lazy(() => import("@components/Home/AnnouncementPopup"));
const Announcements = lazy(() => import("@components/Home/Announcements"));
const Message = lazy(() => import("@components/Home/Message"));
const Board = lazy(() => import("@components/Board"));
const Table = lazy(() => import("@components/Table"));
const Footer = lazy(() => import("@components/Footer"));
const Popup = lazy(() => import("@components/Home/Popup"));

const announcement = { content: IMPORTANT_MESSAGE, date: 123213 };

const Home = ({ theme, setTheme }) => {
  useScrollTop();
  const [isFirstVisit, setFirstVisit] = useLocalStorage("firstVisit4");
  const [renderIt, setrenderIt] = useState(false);
  const {
    updatesData,
    statsData,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  } = useData();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setrenderIt(true);
  //   }, 2000);
  // }, []);
  // console.log({ updatesData, statsData });
  // const announcements = [
  //   {
  //     content: `SNS로도 보실수 있게 계정을 만들었습니다. 한시간 간격으로 현황 업로드가 될겄이니 편한곳에서 보시기 바랍니다<br></br><a href="https://twitter.com/kCm2v4r1PvpSE7A">트위터 계정</a> | <a href="https://www.instagram.com/corona.live.kr/">인스타 계정</a>`,
  //     date: 1598518334473,
  //   },
  //   { content: "안녀하세요<br></br>감사합니다", date: 1598518334233 },
  // ];
  // console.log(statsData?.announcements);
  return (
    <Page>
      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification notification={notification} onClose={removeNotification}></Notification>
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

      {statsData?.announcements && !isFirstVisit ? (
        <Suspense fallback={<div style={{ height: "50px" }} />}>
          <Announcements announcements={statsData?.announcements}></Announcements>
        </Suspense>
      ) : (
        <Row h="30px"></Row>
      )}

      {updatesData ? (
        <Suspense fallback={<div style={{ height: "50px" }} />}>
          <Updates data={sortByDate(updatesData)} {...{ mutateData, isLoading }}></Updates>
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
          <Graph
            timeseries={statsData?.timeseries as TimerseriesType}
            current={statsData.overview.current}
          ></Graph>
        </Suspense>
      )}
      {/* {statsData?.timeseries && updatesData && (
        <Suspense fallback={<div />}>
          <Message></Message>
        </Suspense>
      )} */}

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
