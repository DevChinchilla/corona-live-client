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
  box-sizing: border-box;
  padding: 20px;
  margin: auto;
  width: 400px;
  ${media.phablet} {
    width: 100%;
  }
`;

const Home = ({ theme, setTheme }) => {
  const { data: updatesData } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 10000,
  });

  const { data: statsData } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 10000,
  });

  return (
    <Wrapper>
      <Suspense fallback={<div />}>
        <NavBar {...{ theme, setTheme }}></NavBar>
      </Suspense>
      {updatesData && (
        <Suspense fallback={<div />}>
          <Updates data={sortByDate(updatesData)}></Updates>
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
            current={statsData.current}
            overall={statsData.overall}
            updates={sortByDate(updatesData)}
            tdFlex={CITY_TD_FLEX}
          ></Table>
        </Suspense>
      )}
    </Wrapper>
  );
};

export default Home;
