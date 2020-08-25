import React, { lazy, Suspense, useEffect, useState } from "react";

import { Page } from "@components/Layout";

import { sortByDate } from "@utils";
import { CITY_TD_FLEX } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useData } from "@hooks/useData";
import { CurrentType, OverallType } from "@types";

const NavBar = lazy(() => import("@components/Home/HomeNavBar"));
const Updates = lazy(() => import("@components/Home/Updates"));
const Notification = lazy(() => import("@components/Notification"));
const Board = lazy(() => import("@components/Board"));
const Table = lazy(() => import("@components/Table"));
const Footer = lazy(() => import("@components/Footer"));
const Popup = lazy(() => import("@components/Home/Popup"));

const Home = ({ theme, setTheme }) => {
  useScrollTop();
  const [isFirstVisit, setFirstVisit] = useLocalStorage("firstVisit");
  const [renderIt, setrenderIt] = useState(false);
  const {
    updatesData,
    statsData,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  } = useData();

  useEffect(() => {
    setTimeout(() => {
      setrenderIt(true);
    }, 2000);
  }, []);
  return (
    <Page>
      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification notification={notification} onClose={removeNotification}></Notification>
        </Suspense>
      )}
      <Suspense fallback={<div />}>
        <Popup show={isFirstVisit == undefined} onClose={() => setFirstVisit(true)}></Popup>
      </Suspense>

      <Suspense fallback={<div />}>
        <NavBar {...{ theme, setTheme, mutateData }}></NavBar>
      </Suspense>

      {updatesData && (
        <Suspense fallback={<div style={{ height: "120px" }} />}>
          <Updates data={sortByDate(updatesData)} {...{ mutateData, isLoading }}></Updates>
        </Suspense>
      )}

      {statsData && (
        <Suspense fallback={<div />}>
          <Board data={statsData.overview}></Board>
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
