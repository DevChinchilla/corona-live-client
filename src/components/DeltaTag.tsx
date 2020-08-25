import React, { FC } from "react";
import styled, { css } from "styled-components";
import CountUp from "react-countup";

import { Box, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { useTheme } from "@hooks/useTheme";
import { prop, ifProp } from "@styles/tools";
import { ThemeType } from "@styles/themes";

const Wrapper = styled(Row)<{ color?: string; small?: boolean; showBg?: boolean }>`
  color: ${prop("color")};
  border-radius: 6px;
  padding: 4px 8px;
  margin-left: 8px;
  align-items: center;
  ${ifProp(
    "small",
    css`
      font-size: 12px;
      padding: 0px;
      margin-left: 4px;
    `
  )};
  ${ifProp(
    "showBg",
    css`
      padding: 1px 4px;
      padding-right: 6px;
      margin-left: 6px;
    `
  )}
`;

interface Props {
  color: ThemeType;
  delta: number;
  small?: boolean;
  countUp?: boolean;
  showBg?: boolean;
}

const DeltaTag: FC<Props> = ({ color, delta, small, countUp, showBg }) => {
  const theme = useTheme();
  const _color = theme(color);
  if (delta == 0) return <></>;
  return (
    <Wrapper {...{ small, showBg }} color={_color} bg={!small || showBg ? _color + 15 : ""}>
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
