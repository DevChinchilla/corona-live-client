import React, { FC } from "react";
import { Box, Row } from "./Layout";
import useTheme from "@hooks/useTheme";
import Icon from "./Icon";
import styled, { css } from "styled-components";
import { prop, ifProp } from "@styles/tools";
import { ThemeType } from "@styles/themes";

const Wrapper = styled(Row)<{ color: string; small }>`
  color: ${prop("color")};
  border-radius: 6px;
  padding: 6px 8px;
  padding-left: 12px;
  margin-left: 8px;
  align-items: center;
  ${ifProp(
    "small",
    css`
      font-size: 12px;
      padding: 2px 6px;
      margin-left: 6px;
    `
  )}
`;

interface Props {
  color: ThemeType;
  delta: number;
  small?: boolean;
}

const DeltaTag: FC<Props> = ({ color, delta, small }) => {
  const theme = useTheme();
  const _color = theme(color);
  return (
    <Wrapper color={_color} small={small} bg={_color + 15}>
      {Math.abs(delta)}
      <Box w="2px"></Box>
      {delta > 0 ? (
        <Icon name="ArrowUp" stroke={_color} size={small ? 14 : 20}></Icon>
      ) : (
        <Icon name="ArrowDown" stroke={_color}></Icon>
      )}
    </Wrapper>
  );
};

export default DeltaTag;
