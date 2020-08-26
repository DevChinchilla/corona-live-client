import styled from "styled-components";
import React, { useState } from "react";
import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import Report from "@components/Report";

import { useTheme } from "@hooks/useTheme";
import { theme } from "@styles/themes";
import Button from "@components/Button";

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
      color: ${theme("blue")};
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
        <Button icon onClick={() => setTheme(currentTheme == "light" ? "dark" : "light")}>
          <Icon name="Light" size={26} fill={theme("darkGreyText")}></Icon>
        </Button>
        <Icon
          transform="translateY(-4px)"
          name="Logo"
          height="24px"
          width="100px"
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
