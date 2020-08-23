import React, { lazy, Suspense } from "react";
import { Col } from "../Layout";
import { API_ROOT, TODAY_API_ROOT, CITY_TD_FLEX } from "@consts";
import { fetcher, getStatsWithUpdates, getStatsDeltaV2, sortByDate } from "@utils";
import useSWR from "swr";
import styled from "styled-components";
import { media } from "@styles";

const NavBar = lazy(() => import("./NavBar"));
const Updates = lazy(() => import("./Updates"));
const Board = lazy(() => import("./Board"));
const Table = lazy(() => import("../Table"));

const Wrapper = styled(Col)`
  padding: 20px;
  margin: auto;
  width: 400px;
  ${media.phablet} {
    width: 100%;
  }
`;

const Home = ({ theme, setTheme }) => {
  const { data: overallStats } = useSWR(TODAY_API_ROOT, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 5000,
  });

  const { data: todayUpdates } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 5000,
  });

  const { data: yesterdayUpdates } = useSWR(`${API_ROOT}/yesterday-updates.json`, fetcher, {
    refreshInterval: 0,
  });
  if (!todayUpdates || !yesterdayUpdates) return <div>ddd</div>;
  const [todayStats, todayCases] = getStatsDeltaV2(todayUpdates, yesterdayUpdates);
  return (
    <Wrapper>
      <Suspense fallback={<div />}>
        <NavBar {...{ theme, setTheme }}></NavBar>
      </Suspense>
      {todayUpdates && (
        <Suspense fallback={<div />}>
          <Updates data={sortByDate(todayUpdates)}></Updates>
        </Suspense>
      )}
      {todayCases && overallStats && (
        <Suspense fallback={<div />}>
          <Board today={todayCases} total={overallStats.totalCases}></Board>
        </Suspense>
      )}
      {todayStats && overallStats && (
        <Suspense fallback={<div />}>
          <Table
            today={todayStats}
            overall={overallStats}
            updates={sortByDate(todayUpdates)}
            tdFlex={CITY_TD_FLEX}
          ></Table>
        </Suspense>
      )}
    </Wrapper>
  );
};

export default Home;
