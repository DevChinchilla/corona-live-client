import React, { Suspense, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AnnouncementPopup from "@components/Home/AnnouncementPopup";
import FinishedPopup from "@components/Home/FinishedPopup";
import NavBar from "@components/Home/NavBar";
import Notification from "@components/Notification";
import ToggleButtons from "@components/ToggleButtons";

import Domestic from "@components/Domestic";
import World from "@components/World";

import { Page, Row } from "@components/Layout";

import { useLocalStorage } from "@hooks/useLocalStorage";
import ThemePopup from "./ThemePopup";
import styled from "styled-components";
import Icon from "@components/Icon";
import { theme } from "@styles/themes";

const WorldButton = styled(Row)`
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  /* border: 1px solid ${theme("greyText")}30; */
  color: ${theme("greyText")};

  color: ${theme("blue")};
  background: ${theme("blueBg")};
  cursor: pointer;
  span {
    margin-left: 4px;
  }
  svg {
    fill: ${theme("greyText")};
    fill: ${theme("blue")};
  }
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
        <Row jc="center" fadeInUp delay={5}>
          <WorldButton onClick={() => history.push(path == "/" ? "/world" : "/")}>
            <Icon name={path == "/" ? "World" : "Domestic"} size={12}></Icon>
            <span>{path == "/" ? "세계" : "국내"}현황 보기</span>
          </WorldButton>
        </Row>
        {/* <Row jc="center" fadeInUp delay={5} mb="8px">
          <ToggleButtons
            small
            noBg
            options={[
              // { name: "국내", value: "/", icon: "Domestic" },
              { name: "세계현황 보기", value: "/world", icon: "World" },
              // { name: "국내", value: "/" },
              // { name: "세계", value: "/world" },
            ]}
            activeOption={path}
            setOption={(option) => history.push(option)}
          ></ToggleButtons>
        </Row> */}
        {path == "/" && (
          <Domestic {...{ showUpdates, setShowUpdates, theme, setTheme, data }}></Domestic>
        )}
        {path == "/world" && <World></World>}
      </Page>
    </>
  );
};

export default Home;
