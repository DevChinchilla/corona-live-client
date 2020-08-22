import styled from "styled-components";
import React, { useState } from "react";

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
    font-size: 14px;
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

const NavBar = () => {
  const [showReport, setShowReport] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Report show={showReport} onClose={() => setShowReport(false)}></Report>
      <Wrapper fadeInUp>
        <Button onClick={() => setShowReport(true)} white>
          제보
        </Button>
        <Logo>
          <span>corona</span>
          <span>live</span>
        </Logo>
        <Button white>
          <Icon name="Refresh" size={12} fill={theme("darkGreyText")}></Icon>
        </Button>
      </Wrapper>
    </>
  );
};

export default NavBar;
