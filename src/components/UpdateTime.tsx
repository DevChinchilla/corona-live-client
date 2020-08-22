import React, { FC } from "react";
import styled, { css } from "styled-components";
import { palette } from "../styles";
import { Row } from "./Layout";
import Icon from "./Icon";
import { ifProp } from "@styles/tools";
import useTheme from "@hooks/useTheme";
import { theme } from "@styles/themes";
import { getDateDistance } from "@utils";

const Wrapper = styled(Row)<{ isOld?: boolean }>`
  align-items: center;
  span {
    color: ${theme("greyText")};
    font-size: 12px;
    position: relative;
    margin-left: 4px;
    &:after {
      content: "";
      position: absolute;
      top: 0px;
      right: -6px;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background: ${palette.blue};
    }
  }

  ${ifProp(
    "isOld",
    css`
      color: ${theme("semigreyText")};
      transform: scale(0.9);
      opacity: 0.9;
      /* span:after {
        display: none;
      } */
    `
  )}
`;

interface Props {
  isOld?: boolean;
  date?: string;
  flex?: string;
}
const UpdateTime: FC<Props> = ({ isOld, date, flex }) => {
  const _theme = useTheme();
  return (
    <Wrapper isOld={isOld} flex={flex}>
      {!isOld && <Icon name="Notification" size={12} stroke={_theme("greyText")}></Icon>}
      <span>{getDateDistance(date)}</span>
    </Wrapper>
  );
};

export default UpdateTime;
