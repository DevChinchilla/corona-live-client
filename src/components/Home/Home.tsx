import React, { lazy, Suspense } from "react";
import { Col } from "../Layout";
import { API_ROOT } from "@consts";
import { fetcher, getStatsWithUpdates, getStatsDelta } from "@utils";
import useSWR from "swr";

const NavBar = lazy(() => import("./NavBar"));
const Updates = lazy(() => import("./Updates"));
const Board = lazy(() => import("./Board"));
const Table = lazy(() => import("../Table"));

const Home = () => {
  const { data: today } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 5000,
  });

  const { data: yesterday } = useSWR(`${API_ROOT}/yesterday-updates.json`, fetcher, {
    refreshInterval: 0,
  });

  const data = { today, yesterday };
  if (today && yesterday) console.log(getStatsDelta(today, yesterday));

  return (
    <Col p="20px">
      <Suspense fallback={<div />}>
        <NavBar></NavBar>
      </Suspense>
      {data && (
        <Suspense fallback={<div />}>
          <Updates data={data}></Updates>
        </Suspense>
      )}
      {data && (
        <Suspense fallback={<div />}>
          <Board stats={data}></Board>
        </Suspense>
      )}

      {data && (
        <Suspense fallback={<div />}>
          <Table data={data}></Table>
        </Suspense>
      )}
    </Col>
  );
};

export default Home;
