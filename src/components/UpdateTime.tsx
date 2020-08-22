import React, { FC } from "react";
import styled, { css } from "styled-components";
import { palette } from "../styles";
import { Row } from "./Layout";
import Icon from "./Icon";
import { ifProp } from "@styles/tools";
import useTheme from "@hooks/useTheme";
import { theme } from "@styles/themes";

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
      opacity: 0.8;
      /* transform:scale(0.9) */
      /* span:after {
        display: none;
      } */
    `
  )}
`;

interface Props {
  isOld?: boolean;
}
const UpdateTime: FC<Props> = ({ isOld }) => {
  const _theme = useTheme();
  return (
    <Wrapper isOld={isOld}>
      {!isOld && <Icon name="Notification" size={12} stroke={_theme("semigreyText")}></Icon>}
      <span>3분전</span>
    </Wrapper>
  );
};

export default UpdateTime;
