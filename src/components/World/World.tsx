import UpdatesLiveDisplay from "@components/Updates/UpdatesLiveDisplay";
import Chart from "@components/Chart/Chart";
import { WorldOverviewType } from "@types";
import { getWorldUpdates } from "@utils";
import React, { Suspense } from "react";
import styled, { css } from "styled-components";
import WorldBoard from "./WorldBoard";
import WorldTable from "./WorldTable";
import WorldChart from "@components/Chart/WorldChart";
import { Row } from "@components/Layout";
import Spinner from "@components/Spinner";
import { theme } from "@styles/themes";
import Footer from "@components/Footer";

const Wrapper = styled.div``;

type Props = {
  data: { worldOverview: WorldOverviewType };
};

const World: React.FC<Props> = ({ data }) => {
  const { worldOverview } = data;

  if (!worldOverview)
    return (
      <Row ai="center" jc="center" flex={1}>
        <Spinner size={30} color={"semiDarkGreyText"}></Spinner>
      </Row>
    );

  const { updates, stats, timeseries, yesterdayTimeseries } = worldOverview;

  return (
    <Wrapper>
      <UpdatesLiveDisplay
        data={getWorldUpdates(updates)}
        link={{ href: "/world/live", name: "세계 확진자 실시간" }}
      ></UpdatesLiveDisplay>
      <WorldBoard worldData={stats["WORLD"]}></WorldBoard>
      <Row h="12px"></Row>
      <WorldChart timeseries={timeseries} yesterdayTimeseries={yesterdayTimeseries}></WorldChart>
      <Row h="6px"></Row>
      <WorldTable data={worldOverview}></WorldTable>
      <Footer></Footer>
    </Wrapper>
  );
};

export default World;
