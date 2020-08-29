import React, { lazy, Suspense, useEffect, useState } from "react";

import { Page, Row, Col } from "@components/Layout";

import { sortByDate } from "@utils";
import { CITY_TD_FLEX, IMPORTANT_MESSAGE } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useData } from "@hooks/useData";
import { CurrentType, OverallType, TimerseriesType } from "@types";
import Graph from "@components/Graph";
import Modal from "@components/Modal";

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
  const [showModal, setShowModal] = useState(true);
  const [renderIt, setrenderIt] = useState(false);
  const {
    updatesData,
    statsData,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  } = useData();

  return (
    <Page>
      <Modal show={showModal} dynamic title="29일 집계 마감" onClose={() => setShowModal(false)}>
        <Row center mb="16px" fontSize="14px">
          집계 시간 09시-23시
        </Row>
        <Col ai="center" fontSize="13px" opacity="0.8">
          *본사이트에서 제공하는 오늘 확진자수는 다음날 제공하는 질본 수치와 오차가 발생할수
          있습니다<br></br>
          <br></br>
          *본사이트에서 제공하는 정보 사용/공유로 인해 발생된 문제의 책임은 전적으로 사용자에게
          있습니다.
        </Col>
      </Modal>
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

      {statsData?.announcements ? (
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
