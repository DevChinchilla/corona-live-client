import React, { lazy, Suspense, useState } from "react";
import { Col } from "../Layout";
import { API_ROOT, CITY_TD_FLEX } from "@consts";
import { fetcher, sortByDate } from "@utils";
import useSWR, { mutate } from "swr";
import styled from "styled-components";
import { media } from "@styles";
import useScrollTop from "@hooks/useScrollTop";
import { useLocalStorage } from "@hooks/useLocalStorage";

const NavBar = lazy(() => import("./NavBar"));
const Updates = lazy(() => import("./Updates"));
const Board = lazy(() => import("./Board"));
const Table = lazy(() => import("../Table"));
const Footer = lazy(() => import("../Footer"));
const Popup = lazy(() => import("../Popup"));

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
  useScrollTop();

  const [isFirstVisit, setFirstVisit] = useLocalStorage("firstVisit");

  const { data: updatesData } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 20000,
  });

  const { data: statsData } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 20000,
  });

  return (
    <Wrapper>
      <Suspense fallback={<div />}>
        <Popup show={isFirstVisit == undefined} onClose={() => setFirstVisit(true)}></Popup>
      </Suspense>

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
      {statsData && updatesData && (
        <Suspense fallback={<div />}>
          <Footer></Footer>
        </Suspense>
      )}
    </Wrapper>
  );
};

export default Home;
