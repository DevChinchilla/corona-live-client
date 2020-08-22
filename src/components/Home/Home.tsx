import styled, { css } from "styled-components";
import React, { lazy, Suspense } from "react";
import { Col } from "../Layout";

const NavBar = lazy(() => import("./NavBar"));
const Updates = lazy(() => import("./Updates"));
const Board = lazy(() => import("./Board"));
const Table = lazy(() => import("../Table"));

const Home = () => {
  return (
    <Col p="20px">
      <Suspense fallback={<div />}>
        <NavBar></NavBar>
      </Suspense>
      <Suspense fallback={<div />}>
        <Updates></Updates>
      </Suspense>
      <Suspense fallback={<div />}>
        <Board></Board>
      </Suspense>
      <Suspense fallback={<div />}>
        <Table></Table>
      </Suspense>
    </Col>
  );
};

export default Home;
