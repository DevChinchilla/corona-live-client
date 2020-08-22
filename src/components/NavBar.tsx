import styled, { css } from "styled-components";
import React from "react";

import Button from "./Button";
import Icon from "./Icon";
import { Row } from "./Layout";
import { palette } from "../styles";

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
  return (
    <Wrapper>
      <Button>제보</Button>
      <Logo>
        <span>corona</span>
        <span>live</span>
      </Logo>
      <Button light>
        <Icon name="Refresh" size={14} stroke={palette.darkGrey}></Icon>
      </Button>
    </Wrapper>
  );
};

export default NavBar;
