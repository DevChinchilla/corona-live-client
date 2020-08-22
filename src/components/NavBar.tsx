import styled from "styled-components";
import React, { useContext } from "react";

import Button from "./Button";
import Icon from "./Icon";
import { Row } from "./Layout";
import { palette } from "@styles";
import useTheme from "@hooks/useTheme";

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
  const getTheme = useTheme();
  return (
    <Wrapper>
      <Button>제보</Button>
      <Logo>
        <span>corona</span>
        <span>live</span>
      </Logo>
      <Button light>
        <Icon name="Refresh" size={14} fill={getTheme("darkGreyText")}></Icon>
      </Button>
    </Wrapper>
  );
};

export default NavBar;
