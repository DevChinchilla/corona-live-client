import styled, { css } from "styled-components";
import { switchProp, prop, ifProp } from "styled-tools";

import React from "react";
import { palette } from "../styles";
import Stat from "./Stat";
import Icon from "./Icon/Icon";
import UpdateTime from "./UpdateTime";
import { Row, Box } from "./Layout";
import { numberWithCommas } from "@utils";
import DeltaTag from "./DeltaTag";
import useTheme from "@hooks/useTheme";

const Wrapper = styled(Row)`
  display: flex;
  flex-direction: row;
  background: ${palette.lightGrey};
  border-radius: 6px;
  height: 46px;
  padding: 0px 14px;
  margin-bottom: 10px;
`;

const Td = styled(Row)<{ end?: boolean; flex?: string }>`
  align-items: center;
  flex: ${(props) => (props.flex ? props.flex : 1)};
  justify-content: ${(props) => (props.end ? "flex-end" : "flex-start")};
`;

const RowComponent = ({ data }) => {
  const { total, today } = data;
  const onClick = () => {};
  const theme = useTheme();

  const deltaPositive = today.delta > 0;
  const todayColor = deltaPositive ? "red" : "blue";

  return (
    <Wrapper onClick={onClick}>
      <Td flex="0 1 50px">
        <Box fontSize="13px" fontWeight="bold">
          {"서울"}
        </Box>
      </Td>
      <Td flex="0 1 16px">
        <div style={{ width: "1px", height: "10px", background: palette.grey }}></div>
      </Td>
      <Td flex="0 1 114px">
        <Box fontSize="13px">{numberWithCommas(total.total)}명</Box>
        <DeltaTag color={"blackText"} delta={total.delta} small></DeltaTag>
      </Td>
      <Td>
        <Box fontSize="13px" color={theme(todayColor) as any}>
          {numberWithCommas(today.total)}명
        </Box>
        <DeltaTag color={todayColor} delta={today.delta} small></DeltaTag>
      </Td>
      <Td end>
        <UpdateTime isOld></UpdateTime>
        <div style={{ width: "14px" }}></div>
        <Icon name="ChevronRight" size={18}></Icon>
      </Td>
    </Wrapper>
  );
};

export default RowComponent;
