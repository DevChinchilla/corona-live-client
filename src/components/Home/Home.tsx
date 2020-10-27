import React, { Suspense, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AnnouncementPopup from "@components/Home/AnnouncementPopup";
import FinishedPopup from "@components/Home/FinishedPopup";
import NavBar from "@components/Home/NavBar";
import Notification from "@components/Notification";

import Domestic from "@components/Domestic";
import World from "@components/World";

import { Absolute, Col, Page, Row } from "@components/Layout";

import { useLocalStorage } from "@hooks/useLocalStorage";
import ThemePopup from "./ThemePopup";
import styled, { css } from "styled-components";
import Icon from "@components/Icon";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";

const WorldButtonContainer = styled(Row)`
  box-shadow: -1px 1px 20px #0000001e;
  justify-content: center;
  background: ${theme("bg")};
  border-radius: 8px;
  border-radius: 50px;
  overflow: hidden;
`;

const WorldButton = styled(Row)<{ selected?: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 11px;
  border-radius: 6px;
  border-radius: 50px;
  color: ${theme("greyText")};
  padding: 4px 12px;

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
`;

const Home = ({ theme, setTheme, data }) => {
  const history = useHistory();
  const routerMatch = useRouteMatch();
  const { path } = routerMatch;

  const [isFirstVisitor, setIsFirstVisitor] = useLocalStorage("firstVisitor", 1);
  const [showUpdates, setShowUpdates] = useState(path == "/live");

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

      <Page>
        <Suspense fallback={<div />}>
          <NavBar {...{ theme, setTheme }}></NavBar>
        </Suspense>

        <Absolute top="48px" horizontalCenter position="fixed">
          <WorldButtonContainer>
            <Row jc="center">
              <WorldButton onClick={() => history.push("/")} selected={path == "/"} mr="-2px">
                <Icon name={"Domestic"} size={12}></Icon>
                <span>국내 </span>
              </WorldButton>
            </Row>
            <Row jc="center">
              <WorldButton onClick={() => history.push("/world")} selected={path == "/world"}>
                <Icon name={"World"} size={12}></Icon>
                <span>세계 </span>
              </WorldButton>
            </Row>
          </WorldButtonContainer>
        </Absolute>

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
