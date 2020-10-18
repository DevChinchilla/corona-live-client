import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import Report from "@components/Report";

import { useTheme } from "@hooks/useTheme";
import Button from "@components/Button";
import { useRouteMatch } from "react-router-dom";

const Wrapper = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

const NavBar = ({ theme: currentTheme, setTheme }) => {
  const routerMatch = useRouteMatch();

  const [showReport, setShowReport] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (routerMatch.path == "/report") setShowReport(true);
  }, [routerMatch]);

  return (
    <>
      <Report show={showReport} onClose={() => setShowReport(false)}></Report>
      <Wrapper fadeInUp>
        <Button icon onClick={() => setTheme(currentTheme == "light" ? "dark" : "light")}>
          <Icon name="Light" size={26} fill={theme("darkGreyText")}></Icon>
        </Button>
        <Icon
          transform="translateY(-4px)"
          name="Logo"
          height="26px"
          width="110px"
          fill={theme("blackText")}
        ></Icon>

        <Button icon onClick={() => setShowReport(true)}>
          <Icon name="SendMessage" size={20} fill={theme("darkGreyText")}></Icon>
        </Button>
      </Wrapper>
    </>
  );
};

export default NavBar;
