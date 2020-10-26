import Domestic from "@components/Domestic";
import NavBar from "@components/Home/NavBar";
import { Page, Row } from "@components/Layout";
import ToggleButtons from "@components/ToggleButtons";
import World from "@components/World/World";
import React, { Suspense, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

type CurrentTabType = "domestic" | "world";

const Home = ({ theme, setTheme, data }) => {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>("domestic");
  return (
    <Page>
      <Suspense fallback={<div />}>
        <NavBar {...{ theme, setTheme }}></NavBar>
      </Suspense>
      <Row jc="center" mt="6px" fadeInUp delay={5}>
        <ToggleButtons
          noBg
          options={[
            { name: "한국 현황", value: "domestic", icon: "Domestic" },
            { name: "세계 현황", value: "world", icon: "World" },
          ]}
          activeOption={currentTab}
          setOption={setCurrentTab}
        ></ToggleButtons>
      </Row>
      {currentTab == "domestic" && <Domestic {...{ theme, setTheme, data }}></Domestic>}
      {currentTab == "world" && <World></World>}
    </Page>
  );
};

export default Home;
