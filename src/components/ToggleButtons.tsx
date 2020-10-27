import React, { Props } from "react";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import styled, { css } from "styled-components";
import { Absolute, Row } from "./Layout";
import Icon from "./Icon";
import { IconType } from "./Icon/Icon";

const Button = styled(Row)<{ active: boolean; noBg?: boolean; small?: boolean }>`
  font-size: 12px;
  padding: 6px 14px;
  background: ${theme("greyBg")};
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
      background: ${theme("bg")};
    `
  )};
  ${ifProp(
    "small",
    css`
      font-size: 12px;
      padding: 2px 8px;

      /* padding: 6px 14px;
      justify-content: center;
      flex: 1; */
    `
  )};

  ${ifProp(
    "active",
    css`
      font-weight: bold;
      background: ${theme("blueBg")};
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

const Wrapper = styled(Row)<{ divider?: boolean }>`
  ${ifProp(
    "divider",
    css`
      position: relative;
      width: 100%;
      justify-content: center;
      align-items: center;

      &:before,
      &:after {
        content: "";
        display: flex;
        flex: 1;
        height: 1px;
        background: ${theme("greyText")}30;
        z-index: -100;
      }
    `
  )};
`;

interface OptionType {
  name: string;
  value: any;
  icon?: IconType;
  visible?: boolean;
}
interface Props {
  options: OptionType[];
  setOption: any;
  activeOption: any;
  noBg?: boolean;
  small?: boolean;
  divider?: boolean;
}

const ToggleButtons: React.FC<Props> = ({
  options,
  setOption,
  activeOption,
  noBg,
  small,
  divider,
}) => {
  return (
    <Wrapper divider={divider}>
      {options.map((option, i) => {
        let { name, value, icon, visible = true } = option;
        if (!visible) return <></>;
        return (
          <Button
            key={i}
            noBg={noBg}
            active={activeOption == value}
            onClick={() => setOption(value)}
            small={small}
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
