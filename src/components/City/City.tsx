import React, { Suspense, lazy, useState } from "react";

import { Page, Row } from "@components/Layout";

const Table = lazy(() => import("@components/Table"));
const Board = lazy(() => import("@components/Board"));
const Footer = lazy(() => import("@components/Footer"));
const CityNavBar = lazy(() => import("@components/City/CityNavBar"));
const Notification = lazy(() => import("@components/Notification"));
const UpdateModal = lazy(() => import("@components/UpdateModal"));
const Updates = lazy(() => import("@components/Home/Updates"));

import { DISTRICT_TD_FLEX } from "@consts";
import { sortByDate } from "@utils";
import { useScrollTop } from "@hooks/useScrollTop";
import { useData } from "@hooks/useData";

const City = ({ match }) => {
  useScrollTop();

  const cityId: string = match.params.cityId;
  const [showUpdates, setShowUpdates] = useState(false);

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
          <Notification
            notification={notification}
            onClose={() => {
              removeNotification();
              setShowUpdates(true);
            }}
          ></Notification>
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

      {statsData && (
        <Board
          data={{
            confirmed: statsData.overall[cityId].cases,
            current: statsData.current[cityId].cases,
          }}
        ></Board>
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
