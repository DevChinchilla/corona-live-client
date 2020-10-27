import React, { Suspense, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AnnouncementPopup from "@components/Home/AnnouncementPopup";
import FinishedPopup from "@components/Home/FinishedPopup";
import NavBar from "@components/Home/NavBar";
import Notification from "@components/Notification";
import ToggleButtons from "@components/ToggleButtons";

import Domestic from "@components/Domestic";
import World from "@components/World";

import { Absolute, Col, Page, Row } from "@components/Layout";

import { useLocalStorage } from "@hooks/useLocalStorage";
import ThemePopup from "./ThemePopup";
import styled, { css } from "styled-components";
import Icon from "@components/Icon";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";

const WorldButton = styled(Row)<{ selected?: boolean; big?: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 6px;
  border-radius: 50px;
  color: ${theme("greyText")};

  cursor: pointer;
  span {
    margin-left: 4px;
  }
  svg {
    fill: ${theme("greyText")};
  }

  ${ifProp(
    "selected",
    css`
      color: ${theme("blue")};
      font-weight: bold;
      background: ${theme("blueBg")};
      svg {
        fill: ${theme("blue")};
      }
    `
  )}

  ${ifProp(
    "big",
    css`
      padding: 4px 12px;
    `
  )}
`;

const ShadowContainer = styled(Col)`
  width: 100%;
  box-shadow: -1px 1px 20px #0000001e;
`;

const TabContainer = styled(Row)`
  width: 100%;
  height: 40px;
  align-items: center;
`;

const Tab = styled(Row)`
  flex: 1;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 4px;
    font-size: 12px;
  }
`;

const HeaderOne = ({ history, path }) => {
  return (
    <ShadowContainer>
      <TabContainer>
        <Tab>
          <Icon name="Domestic" size={12}></Icon>
          <span>국내 현황</span>
        </Tab>
        <Tab>
          <Icon name="World" size={12}></Icon>
          <span>해외 현황</span>
        </Tab>
      </TabContainer>
    </ShadowContainer>
  );
};

const WorldButtonContainer = styled(Row)`
  box-shadow: -1px 1px 20px #0000001e;
  justify-content: center;
  background: ${theme("bg")};
  border-radius: 8px;
  border-radius: 50px;
  overflow: hidden;
`;

const HeaderTwo = ({ history, path }) => {
  return (
    <Absolute top="48px" horizontalCenter>
      <WorldButtonContainer>
        <Row jc="center">
          <WorldButton
            onClick={() => history.push("/")}
            selected={path == "/"}
            big
            style={{ marginRight: "-2px" }}
          >
            <Icon name={"Domestic"} size={12}></Icon>
            <span>국내 </span>
          </WorldButton>
        </Row>
        <Row jc="center">
          <WorldButton onClick={() => history.push("/world")} selected={path == "/world"} big>
            <Icon name={"World"} size={12}></Icon>
            <span>세계 </span>
          </WorldButton>
        </Row>
      </WorldButtonContainer>
    </Absolute>
  );
};

const HeaderThree = ({ history, path }) => {
  return (
    <Row jc="center" fadeInUp delay={5}>
      <WorldButton onClick={() => history.push(path == "/" ? "/world" : "/")} selected>
        <Icon name={path == "/" ? "World" : "Domestic"} size={12}></Icon>
        <span>{path == "/" ? "세계" : "국내"}현황 보기</span>
      </WorldButton>
    </Row>
  );
};

const HeaderFour = ({ history, path }) => {
  return (
    <Row jc="center" fadeInUp mb="0px" mt="8px">
      <ToggleButtons
        noBg
        divider
        options={[
          { name: "국내", value: "/", icon: "Domestic" },
          { name: "세계 ", value: "/world", icon: "World" },
        ]}
        activeOption={path}
        setOption={(option) => history.push(option)}
      ></ToggleButtons>
    </Row>
  );
};

const HeaderFive = ({ history, path }) => {
  return (
    <Row jc="center" fadeInUp mb="0px" mt="0px">
      <ToggleButtons
        noBg
        small
        divider
        options={[
          { name: "국내", value: "/", icon: "Domestic" },
          { name: "세계 ", value: "/world", icon: "World" },
        ]}
        activeOption={path}
        setOption={(option) => history.push(option)}
      ></ToggleButtons>
    </Row>
  );
};

const HeaderSix = ({ history, path }) => {
  return (
    <Absolute horizontalCenter top="48px">
      <Row jc="center" fadeInUp mb="0px" mt="0px">
        <ToggleButtons
          noBg
          small
          options={[
            { name: "국내", value: "/", icon: "Domestic" },
            { name: "세계 ", value: "/world", icon: "World" },
          ]}
          activeOption={path}
          setOption={(option) => history.push(option)}
        ></ToggleButtons>
      </Row>
    </Absolute>
  );
};

const Headers = [HeaderOne, HeaderTwo, HeaderThree, HeaderFour, HeaderFive, HeaderSix];

const Home = ({ theme, setTheme, data }) => {
  const history = useHistory();
  const routerMatch = useRouteMatch();
  const { path } = routerMatch;

  const [isFirstVisitor, setIsFirstVisitor] = useLocalStorage("firstVisitor", 1);
  const [showUpdates, setShowUpdates] = useState(path == "/live");

  const [headerOption, setHeaderOption] = useState(0);

  const { statsData, isLoading, notification, removeNotification, casesSummary } = data;

  useEffect(() => {
    if (path == "/live") setShowUpdates(true);
  }, [routerMatch]);

  return (
    <>
      {statsData && casesSummary && path == "/" && (
        <Suspense fallback={<div />}>
          <FinishedPopup casesSummary={casesSummary}></FinishedPopup>
          {isFirstVisitor == 1 && (
            <ThemePopup {...{ theme, setTheme }} onClose={() => setIsFirstVisitor(0)}></ThemePopup>
          )}
        </Suspense>
      )}

      {!isLoading && !!notification && (
        <Suspense fallback={<div />}>
          <Notification
            notification={notification}
            closeModal={removeNotification}
            openUpdates={() => setShowUpdates(true)}
          ></Notification>
        </Suspense>
      )}

      {statsData?.announcements && (
        <Suspense fallback={<div />}>
          <AnnouncementPopup announcement={statsData?.announcements[0]}></AnnouncementPopup>
        </Suspense>
      )}

      <Page onClick={() => setHeaderOption((a) => (a + 1) % 4)}>
        <Suspense fallback={<div />}>
          <NavBar {...{ theme, setTheme }}></NavBar>
        </Suspense>

        {Headers[1]({ history, path })}

        <Col p="20px">
          {path == "/" && (
            <Domestic {...{ showUpdates, setShowUpdates, theme, setTheme, data }}></Domestic>
          )}
          {path == "/world" && <World></World>}
        </Col>
      </Page>
    </>
  );
};

export default Home;
