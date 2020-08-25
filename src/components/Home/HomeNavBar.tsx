import styled from "styled-components";
import React, { useState } from "react";
import { mutate } from "swr";

import Button from "@components/Button";
import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import Report from "@components/Report";

import { palette } from "@styles";
import { useTheme } from "@hooks/useTheme";
import { API_ROOT } from "@consts";

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

const NavBar = ({ theme: currentTheme, setTheme, mutateData }) => {
  const [showReport, setShowReport] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Report show={showReport} onClose={() => setShowReport(false)}></Report>
      <Wrapper fadeInUp>
        {/* <Button onClick={() => setShowReport(true)} white>
          제보
        </Button> */}
        <Row px="10px" onClick={() => setTheme(currentTheme == "light" ? "dark" : "light")}>
          <Icon name="Light" size={26} fill={theme("darkGreyText")}></Icon>
        </Row>
        <Icon
          transform="translateY(-4px)"
          name="Logo"
          height="24px"
          width="100px"
          fill={theme("blackText")}
        ></Icon>

        <Row px="10px" onClick={() => setShowReport(true)}>
          <Icon
            name="SendMessage"
            size={24}
            fill={theme("darkGreyText")}
            onClick={() => mutateData()}
          ></Icon>
        </Row>
      </Wrapper>
    </>
  );
};

export default NavBar;
