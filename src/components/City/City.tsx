import React, { Suspense, lazy, useState, useEffect } from "react";

import { Page, Row } from "@components/Layout";

const Table = lazy(() => import("@components/Table"));
const Board = lazy(() => import("@components/Board"));
const Footer = lazy(() => import("@components/Footer"));
const CityNavBar = lazy(() => import("@components/City/CityNavBar"));
const Notification = lazy(() => import("@components/Notification"));
const UpdateModal = lazy(() => import("@components/UpdateModal"));
const Updates = lazy(() => import("@components/Home/Updates"));
const Chart = lazy(() => import("@components/Chart/Chart"));

import { DISTRICT_TD_FLEX } from "@consts";
import { getCasesSummary, sortByDate } from "@utils";
import { useScrollTop } from "@hooks/useScrollTop";
import { useHistory } from "react-router-dom";

const City = ({ match, data }) => {
  useScrollTop();
  const history = useHistory();

  const cityId: string = match.params.cityId;
  const [showUpdates, setShowUpdates] = useState(false);

  const {
    updatesData,
    statsData,
    timeseriesData,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  } = data;

  useEffect(() => {
    if (Number(cityId) > 16) history.push({ pathname: "/", state: "live" });
  }, [cityId]);

  if (Number(cityId) > 16) return <></>;

  return (
    <Page>
      {updatesData && (
        <Suspense fallback={<div />}>
          <UpdateModal
            isDistrict
            {...{ onClose: () => setShowUpdates(false), showUpdates, data: updatesData, cityId }}
          ></UpdateModal>
        </Suspense>
      )}

      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification notification={notification} closeModal={removeNotification}></Notification>
        </Suspense>
      )}

      <CityNavBar {...{ cityId }}></CityNavBar>

      {updatesData ? (
        <Suspense fallback={<div style={{ height: "50px" }} />}>
          <Updates
            data={sortByDate(updatesData)}
            {...{ mutateData, isLoading, showUpdates, setShowUpdates, cityId }}
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
