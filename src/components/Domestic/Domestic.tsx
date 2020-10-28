import React, { lazy, Suspense, useState } from "react";
import { Row } from "@components/Layout";

import { getDomesticUpdates, sortByDate } from "@utils";
import { CITY_TD_FLEX } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { CurrentType, OverallType } from "@types";

import MapExplorer from "./MapExplorer";
import ToggleButtons from "@components/ToggleButtons";

const Updates = lazy(() => import("@components/Updates/UpdatesLiveDisplay"));
const Board = lazy(() => import("@components/Domestic/DomesticBoard"));
const Table = lazy(() => import("@components/Domestic/DomesticTable"));
const Footer = lazy(() => import("@components/Footer"));
const Chart = lazy(() => import("@components/Chart/Chart"));

const Domestic = ({ data }) => {
  useScrollTop();
  const [showMap, setShowMap] = useState(false);
  const { updatesData, statsData, timeseriesData, casesSummary } = data;

  return (
    <>
      {updatesData ? (
        <Suspense fallback={<div style={{ height: "50px" }} />}>
          <Updates
            data={getDomesticUpdates(updatesData)}
            link={{ href: "/live", name: "실시간" }}
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
            divider
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
