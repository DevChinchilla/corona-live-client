import React, { FC } from "react";
import CountUp from "react-countup";

import { Row, Col, Box } from "../Layout";
import DeltaTag from "@components/DeltaTag";
import { useTheme } from "@hooks/useTheme";

interface Props {
  title: string;
  data: any;
  isToday?: boolean;
  fadeInUp?: boolean;
  delay?: number;
}
const Stat: FC<Props> = ({ title, data, isToday, ...props }) => {
  const [total, delta] = data;
  const theme = useTheme();

  const deltaPositive = delta > 0;
  // const color = isToday ? "darkGreyText" : deltaPositive ? "red" : "blue";
  const color = "darkGreyText";
  // const deltaColor = isToday ? "greyText" : color;
  const deltaColor = isToday ? "red" : deltaPositive ? "red" : "blue";
  const _color = theme(color);

  return (
    <Col {...props} mt="10px">
      <Col>
        <Box fontSize="11px" mb="2px" color={_color} opacity={0.7}>
          {title}
        </Box>
        <Row ai="center">
          <Box fontSize="24px" fontWeight={700} color={_color}>
            <CountUp end={total} separator={","} duration={3} />
          </Box>

          <Box fontSize="24px" fontWeight={300} color={_color}>
            명
          </Box>
          <DeltaTag color={deltaColor} delta={delta} countUp></DeltaTag>
        </Row>
      </Col>
    </Col>
  );
};
const Board = ({ data }) => {
  return (
    <Row jc="space-evenly">
      <Stat data={data.confirmed} title={"총 확진자"} isToday fadeInUp delay={2}></Stat>
      <Box w="40px"></Box>
      <Stat data={data.current} title={"오늘"} fadeInUp delay={3}></Stat>
    </Row>
  );
};

export default Board;
