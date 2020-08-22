import styled, { css } from "styled-components";
import React, { lazy, Suspense } from "react";
import { Col } from "./Layout";

const NavBar = lazy(() => import("./NavBar"));

const Home = () => {
  return (
    <Col p="20px">
      <Suspense fallback={<div />}>
        <NavBar></NavBar>
      </Suspense>
    </Col>
  );
};

export default Home;
