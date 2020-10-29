import Icon from "@components/Icon";
import { Row } from "@components/Layout";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled, { css } from "styled-components";

const Wrapper = styled(Row)`
  justify-content: center;
  width: fit-content;
  margin: 8px auto;
  box-shadow: -1px 1px 20px #0000001e;
  background: ${theme("navBarShadow")};
  border-radius: 50px;
  overflow: hidden;
`;

const NavbarItem = styled(Row)<{ selected?: boolean }>`
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

type Props = {};

const NavBar: React.FC<Props> = ({}) => {
  const history = useHistory();
  const routerMatch = useRouteMatch();
  const { path } = routerMatch;

  return (
    <Wrapper fadeInUp delay={2}>
      <Row jc="center">
        <NavbarItem
          onClick={() => history.push({ pathname: "/", state: "live" })}
          selected={path == "/"}
          mr="-2px"
        >
          <Icon name={"Domestic"} size={12}></Icon>
          <span>국내 </span>
        </NavbarItem>
      </Row>
      <Row jc="center">
        <NavbarItem
          onClick={() => history.push({ pathname: "/world", state: "live" })}
          selected={path == "/world"}
        >
          <Icon name={"World"} size={12}></Icon>
          <span>세계 </span>
        </NavbarItem>
      </Row>
    </Wrapper>
  );
};

export default NavBar;
