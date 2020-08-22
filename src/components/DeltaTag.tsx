import React, { FC } from "react";
import { Box, Row } from "./Layout";
import useTheme from "@hooks/useTheme";
import Icon from "./Icon";
import styled, { css } from "styled-components";
import { prop, ifProp } from "@styles/tools";
import { ThemeType } from "@styles/themes";
import CountUp from "react-countup";

const Wrapper = styled(Row)<{ color: string; small }>`
  color: ${prop("color")};
  border-radius: 6px;
  padding: 6px 8px;
  /* padding-left: 12px; */
  margin-left: 8px;
  align-items: center;
  ${ifProp(
    "small",
    css`
      font-size: 12px;
      padding: 0px;
      margin-left: 4px;
    `
  )}
`;

interface Props {
  color: ThemeType;
  delta: number;
  small?: boolean;
  countUp?: boolean;
}

const DeltaTag: FC<Props> = ({ color, delta, small, countUp }) => {
  const theme = useTheme();
  const _color = theme(color);
  if (delta == 0) return <></>;
  return (
    <Wrapper color={_color} small={small} bg={small ? "" : _color + 15}>
      {delta > 0 ? (
        <Icon name="ArrowUp" stroke={_color}></Icon>
      ) : (
        <Icon name="ArrowDown" stroke={_color}></Icon>
      )}
      {!small && <Box w="2px"></Box>}
      {countUp ? (
        <CountUp end={Math.abs(delta)} separator={","} duration={3}></CountUp>
      ) : (
        Math.abs(delta)
      )}
    </Wrapper>
  );
};

export default DeltaTag;
