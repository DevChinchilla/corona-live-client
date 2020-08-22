import React, { FC } from "react";
import styled, { css } from "styled-components";
import CountUp from "react-countup";

import { Row, Col, Box } from "../Layout";
import DeltaTag from "@components/DeltaTag";
import useTheme from "@hooks/useTheme";
import { numberWithCommas } from "@utils";

const Wrapper = styled(Row)`
  margin: 4px 0px;
  padding: 0px 20px;
  & > div {
    flex: 1;
    justify-content: center;
    display: flex;
  }
`;
interface Props {
  title: string;
  data: any;
  isToday?: boolean;
  fadeInUp?: boolean;
  delay?: number;
}
const Stat: FC<Props> = ({ title, data, isToday, ...props }) => {
  const { total, delta } = data;
  const theme = useTheme();

  const deltaPositive = delta > 0;
  const color = isToday ? "blackText" : deltaPositive ? "red" : "blue";
  const _color = theme(color);

  return (
    <Col {...props}>
      <Col>
        <Box fontSize="11px" mb="2px" color={_color} opacity={0.7}>
          {title}
        </Box>
        <Row ai="center">
          <Box fontSize="26px" fontWeight="bold" color={_color}>
            <CountUp end={total} separator={","} duration={3} />
            {/* {numberWithCommas(total)} */}
          </Box>

          <Box fontSize="26px" fontWeight="lighter" color={_color}>
            명
          </Box>
          <DeltaTag color={color} delta={delta} countUp></DeltaTag>
        </Row>
      </Col>
    </Col>
  );
};
const Board = ({ today, total }) => {
  return (
    <Row>
      <Stat data={total} title={"총 확진자"} isToday fadeInUp delay={2}></Stat>
      <Box w="40px"></Box>
      <Stat data={today} title={"오늘"} fadeInUp delay={3}></Stat>
    </Row>
  );
};

export default Board;
