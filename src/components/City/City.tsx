import React, { Suspense, lazy } from "react";

import { Page } from "@components/Layout";

const Table = lazy(() => import("@components/Table"));
const Board = lazy(() => import("@components/Board"));
const Footer = lazy(() => import("@components/Footer"));
const CityNavBar = lazy(() => import("@components/City/CityNavBar"));

import { DISTRICT_TD_FLEX } from "@consts";
import { sortByDate } from "@utils";
import { useScrollTop } from "@hooks/useScrollTop";
import { useData } from "@hooks/useData";

const City = ({ match }) => {
  useScrollTop();

  const cityId = match.params.cityId;

  const [updatesData, statsData, mutateData] = useData();

  return (
    <Page>
      <CityNavBar {...{ cityId, mutateData }}></CityNavBar>
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
