import styled from "styled-components";
import React, { useState, useContext } from "react";

import Button from "../Button";
import Icon from "../Icon";
import { Row } from "../Layout";
import { palette } from "@styles";
import useTheme from "@hooks/useTheme";
import Report from "@components/Report";

const Logo = styled(Row)`
  span {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1px;
    &:first-child {
      color: black;
    }
    &:last-child {
      color: ${palette.blue};
    }
  }
`;

const Wrapper = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

const NavBar = ({ theme: currentTheme, setTheme }) => {
  const [showReport, setShowReport] = useState(false);
  const theme = useTheme();
  console.log(currentTheme);
  return (
    <>
      <Report show={showReport} onClose={() => setShowReport(false)}></Report>
      <Wrapper fadeInUp>
        {/* <Button onClick={() => setShowReport(true)} white>
          제보
        </Button> */}
        <Button white onClick={() => setTheme(currentTheme == "light" ? "dark" : "light")}>
          <Icon name="Light" size={26} fill={theme("darkGreyText")}></Icon>
        </Button>
        <Icon
          transform="translateY(-4px)"
          name="Logo"
          height="24px"
          width="100px"
          fill={theme("blackText")}
        ></Icon>
        {/* <Logo>
          <span>corona</span>
          <span>live</span>
        </Logo> */}
        <Button white>
          <Icon name="Refresh" size={12} fill={theme("darkGreyText")}></Icon>
        </Button>
      </Wrapper>
    </>
  );
};

export default NavBar;
