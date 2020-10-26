import styled from "styled-components";
import React, { useEffect, useState } from "react";

import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import Report from "@components/Home/ReportModal";
import Underline from "@components/Underline";
import Button from "@components/Button";

import { useTheme } from "@hooks/useTheme";
import { useRouteMatch, useHistory } from "react-router-dom";

const Wrapper = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  theme: string;
  setTheme: any;
  title?: string;
}

const NavBar: React.FC<Props> = ({ theme: currentTheme, setTheme, title }) => {
  const routerMatch = useRouteMatch();
  const history = useHistory();

  const [showReport, setShowReport] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (routerMatch.path == "/report") setShowReport(true);
  }, [routerMatch]);

  return (
    <>
      <Report show={showReport} onClose={() => setShowReport(false)}></Report>
      <Wrapper fadeInUp>
        {!!title ? (
          <Button transparent icon onClick={() => history.push({ pathname: "/", state: "live" })}>
            <Icon name="ChevronLeft" stroke={theme("darkGreyText")} size={24}></Icon>
          </Button>
        ) : (
          <Button
            transparent
            icon
            onClick={() => setTheme(currentTheme == "light" ? "dark" : "light")}
          >
            <Icon name="Light" size={26} fill={theme("darkGreyText")}></Icon>
          </Button>
        )}

        {!!title ? (
          <Underline fontSize="18px " fontWeight={900}>
            {title}
          </Underline>
        ) : (
          <Icon
            transform="translateY(-4px)"
            name="Logo"
            height="26px"
            width="110px"
            fill={theme("blackText")}
          ></Icon>
        )}

        <Button transparent icon onClick={() => setShowReport(true)}>
          <Icon name="SendMessage" size={20} fill={theme("darkGreyText")}></Icon>
        </Button>
      </Wrapper>
    </>
  );
};

export default NavBar;
