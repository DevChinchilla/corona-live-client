import React, { Suspense, lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Page, Row } from "@components/Layout";

const Table = lazy(() => import("@components/Domestic/DomesticTable"));
const Board = lazy(() => import("@components/Domestic/DomesticBoard"));
const Footer = lazy(() => import("@components/Footer"));
const Notification = lazy(() => import("@components/Notification"));
const Updates = lazy(() => import("@components/Updates/UpdatesLiveDisplay"));
const Chart = lazy(() => import("@components/Chart/Chart"));

import { DISTRICT_TD_FLEX } from "@consts";
import { ct, getCasesSummary, getDomesticUpdates, sortByDate } from "@utils";
import { useScrollTop } from "@hooks/useScrollTop";
import Header from "@components/Home/Header";
import DomesticUpdatesModal from "./DomesticUpdatesModal";

const City = ({ theme, setTheme, match, data }) => {
  useScrollTop();

  const cityId: string = match.params.cityId;
  const [showUpdates, setShowUpdates] = useState(false);

  const {
    updatesData,
    statsData,
    timeseriesData,
    isLoading,
    notification,
    removeNotification,
    lastUpdatedDate,
  } = data;

  useEffect(() => {
    if (Number(cityId) > 16) history.push({ pathname: "/", state: "live" });
    document.title = `${ct(cityId)} | 코로나 라이브`;
  }, [cityId]);

  if (Number(cityId) > 16) return <></>;

  return (
    <Page>
      <Helmet>
        <title>{`코로나 라이브 | ${ct(cityId)}`}</title>
        <link rel="canonical" href={`https://corona-live.com/city/${cityId}`} />
      </Helmet>
      {updatesData && (
        <Suspense fallback={<div />}>
          <DomesticUpdatesModal
            data={updatesData}
            onClose={() => setShowUpdates(false)}
            show={showUpdates}
            cityId={cityId}
          ></DomesticUpdatesModal>
        </Suspense>
      )}

      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification notification={notification} closeModal={removeNotification}></Notification>
        </Suspense>
      )}

      <Header {...{ theme, setTheme }} title={ct(cityId)}></Header>

      {updatesData ? (
        <Suspense fallback={<div style={{ height: "50px" }} />}>
          <Updates
            data={getDomesticUpdates(updatesData, cityId)}
            onClick={() => setShowUpdates(true)}
          ></Updates>
        </Suspense>
      ) : (
        <Row h="30px"></Row>
      )}

      {statsData && updatesData && (
        <Board
          data={{
            confirmed: statsData.overall[cityId].cases,
            current: statsData.current[cityId].cases,
          }}
          casesSummary={getCasesSummary(updatesData.filter((a) => a.city == cityId))}
          lastUpdated={lastUpdatedDate}
        ></Board>
      )}

      {statsData && timeseriesData && (
        <Suspense fallback={<div />}>
          <Chart stats={statsData} timeseries={timeseriesData} cityId={cityId}></Chart>
        </Suspense>
      )}

      {statsData && updatesData && (
        <Suspense fallback={<div />}>
          <Table
            cityId={cityId}
            current={statsData.current[cityId].gu}
            overall={statsData.overall[cityId].gu}
            tdFlex={DISTRICT_TD_FLEX}
            updates={sortByDate(updatesData)}
          ></Table>
        </Suspense>
      )}
      {statsData && updatesData && <Footer></Footer>}
    </Page>
  );
};

export default City;
