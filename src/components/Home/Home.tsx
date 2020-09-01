import React, { lazy, Suspense, useState } from "react";

import { Page, Row, Col } from "@components/Layout";

import { sortByDate } from "@utils";
import { CITY_TD_FLEX } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useData } from "@hooks/useData";
import { CurrentType, OverallType, TimerseriesType } from "@types";
import Modal from "@components/Modal";

const NavBar = lazy(() => import("@components/Home/HomeNavBar"));
const Updates = lazy(() => import("@components/Home/Updates"));
const Notification = lazy(() => import("@components/Notification"));
const AnnouncementPopup = lazy(() => import("@components/Home/AnnouncementPopup"));
const Announcements = lazy(() => import("@components/Home/Announcements"));
const FinishedPopup = lazy(() => import("@components/Home/FinishedPopup"));
const Board = lazy(() => import("@components/Board"));
const Table = lazy(() => import("@components/Table"));
const Footer = lazy(() => import("@components/Footer"));
const Popup = lazy(() => import("@components/Home/Popup"));
const LineChart = lazy(() => import("@components/Chart/LineChart"));

const Home = ({ theme, setTheme }) => {
  useScrollTop();
  const [isFirstVisit, setFirstVisit] = useLocalStorage("firstVisit4");
  const [showModal, setShowModal] = useState(true);

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
      <Modal show={showModal} dynamic title="당일 집계 마감" onClose={() => setShowModal(false)}>
        <Row center mb="16px" fontSize="14px">
          서버 오류
        </Row>
        <Col ai="center" fontSize="13px" opacity="0.8">
          현재 서버 오류로 인해 서비스가 지연 되고 있습니다. 양해 부탁드립니다
        </Col>
      </Modal>
      {/* <Suspense fallback={<div />}>
        <FinishedPopup></FinishedPopup>
      </Suspense> */}

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
          <LineChart
            timeseries={statsData?.timeseries as TimerseriesType}
            current={statsData.overview.current}
          ></LineChart>
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
