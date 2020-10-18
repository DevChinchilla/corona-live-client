import React, { Props } from "react";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import styled, { css } from "styled-components";
import { Row } from "./Layout";
import Icon from "./Icon";

const Button = styled(Row)<{ active: boolean; noBg: boolean }>`
  font-size: 12px;
  padding: 6px 14px;
  background: ${theme("greyBg")};
  margin-top: 10px;
  color: ${theme("greyText")};
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${theme("greyText")};
  }
  &:first-child {
    border-radius: 4px 0px 0px 4px;
  }
  &:last-child {
    border-radius: 0px 4px 4px 0px;
  }
  &:not(:last-child) {
    border-right: 1px solid ${theme("lightGreyText")}90;
  }
  &:not(:first-child) {
    border-left: 0px;
  }
  ${ifProp(
    "noBg",
    css`
      border: 1px solid ${theme("greyText")}30;
      background: transparent;
    `
  )};
  ${ifProp(
    "active",
    css`
      font-weight: bold;
      background: ${theme("blue")}30;
      color: ${theme("blue")};
      svg {
        fill: ${theme("blue")};
      }
      ${ifProp(
        "noBg",
        css`
          border: 1px solid ${theme("blue")}30!important;
        `
      )};
    `
  )};
`;

const Wrapper = styled(Row)``;

interface Props {
  options: any;
  setOption: any;
  activeOption: any;
  noBg?: boolean;
}

const ToggleButtons: React.FC<Props> = ({ options, setOption, activeOption, noBg }) => {
  return (
    <Wrapper>
      {options.map((option, i) => {
        let { name, value, icon, visible } = option;
        if (!visible) return <></>;
        return (
          <Button
            key={i}
            noBg={noBg}
            active={activeOption == value}
            onClick={() => setOption(value)}
          >
            {icon && (
              <>
                <Icon name={icon} size={12}></Icon>
                <Row w="4px"></Row>
              </>
            )}
            <Row>{name}</Row>
          </Button>
        );
      })}
    </Wrapper>
  );
};

export default ToggleButtons;
