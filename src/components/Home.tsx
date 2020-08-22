import styled, { css } from "styled-components";
import React, { lazy, Suspense } from "react";
import { Col } from "./Layout";

const NavBar = lazy(() => import("./NavBar"));
const Updates = lazy(() => import("./Updates"));

const Home = () => {
  return (
    <Col p="20px">
      <Suspense fallback={<div />}>
        <NavBar></NavBar>
      </Suspense>

      <Suspense fallback={<div />}>
        <Updates></Updates>
      </Suspense>
    </Col>
  );
};

export default Home;
