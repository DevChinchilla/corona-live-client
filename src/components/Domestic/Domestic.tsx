import React, { lazy, Suspense, useMemo, useState } from "react";
import { Row } from "@components/Layout";

import { getDomesticUpdates, sortByDate } from "@utils";
import { CITY_TD_FLEX } from "@consts";
import { useScrollTop } from "@hooks/useScrollTop";
import { StatsType, ToggleOptionType, UpdateType } from "@types";

import MapExplorer from "./MapExplorer";
import ToggleButtons from "@components/ToggleButtons";
import Spinner from "@components/Spinner";

const Updates = lazy(() => import("@components/Updates/UpdatesLiveDisplay"));
const Board = lazy(() => import("@components/Domestic/DomesticBoard"));
const Table = lazy(() => import("@components/Domestic/DomesticTable"));
const Footer = lazy(() => import("@components/Footer"));
const Chart = lazy(() => import("@components/Chart/Chart"));

interface DataSectionProps {
  statsData: StatsType;
  updatesData: UpdateType[];
}

const DataSection: React.FC<DataSectionProps> = ({ statsData, updatesData }) => {
  const [showMap, setShowMap] = useState(false);
  const sortedUpdatesData = useMemo(() => sortByDate(updatesData), [updatesData]);

  const mapToggleOptions = useMemo<ToggleOptionType[]>(
    () => [
      { name: "지도", value: true, visible: true, icon: "Map" },
      { name: "지역별 표", value: false, visible: true, icon: "Table" },
    ],
    []
  );

  return (
    <>
      {statsData && (
        <Row jc="center" mt="12px" mb="4px" fadeInUp delay={5}>
          <ToggleButtons
            noBg
            divider
            options={mapToggleOptions}
            activeOption={showMap}
            setOption={setShowMap}
          ></ToggleButtons>
        </Row>
      )}

      {statsData && showMap && <MapExplorer stats={statsData}></MapExplorer>}
      {statsData && updatesData && !showMap && (
        <Table
          current={statsData.current}
          overall={statsData.overall}
          overview={statsData.overview}
          updates={sortedUpdatesData}
          tdFlex={CITY_TD_FLEX}
        ></Table>
      )}
    </>
  );
};

const MemoDataSection = React.memo(DataSection, (prev, next) => {
  return (
    prev.statsData.overview.confirmed[0] == next.statsData.overview.confirmed[0] &&
    prev.statsData.overview.confirmed[1] == next.statsData.overview.confirmed[1] &&
    prev.statsData.overview.current[0] == next.statsData.overview.current[0] &&
    prev.statsData.overview.current[1] == next.statsData.overview.current[1]
  );
});

const UPDATES_LIVE_LINK = { href: "/live", name: "실시간" };

const Domestic = ({ data, path }) => {
  useScrollTop();
  const {
    updatesData,
    statsData,
    timeseriesData,
    casesSummary,
    lastUpdatedDate,
    lastUpdated,
  } = data;

  const domesticUpdates = useMemo(() => getDomesticUpdates(updatesData), [updatesData]);

  if (!updatesData)
    return (
      <Row ai="center" jc="center" flex={1}>
        <Spinner size={30} color={"semiDarkGreyText"}></Spinner>
      </Row>
    );

  return (
    <>
      {updatesData ? (
        <Updates data={domesticUpdates} link={UPDATES_LIVE_LINK}></Updates>
      ) : (
        <Row h="30px"></Row>
      )}

      {statsData && casesSummary && (
        <Board
          data={statsData.overview}
          casesSummary={casesSummary}
          lastUpdatedDate={lastUpdatedDate}
          lastUpdatedTime={lastUpdated}
        ></Board>
      )}

      {statsData && <Chart stats={statsData} timeseries={timeseriesData} path={path}></Chart>}

      {statsData && updatesData && (
        <>
          <MemoDataSection {...{ updatesData, statsData }}></MemoDataSection>
          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default Domestic;
