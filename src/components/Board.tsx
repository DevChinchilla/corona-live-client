import React, { FC } from "react";
import CountUp from "react-countup";

import { Row, Col, Box } from "./Layout";
import DeltaTag from "@components/DeltaTag";
import { useTheme } from "@hooks/useTheme";
import Icon from "./Icon";
import styled from "styled-components";

const Info = styled(Row)`
  font-size: 10px;
  opacity: 0.6;
  margin-top: 4px;
  align-items: center;
  span {
    margin-left: 2px;
  }
`;
interface Props {
  title: string;
  data: any;
  isToday?: boolean;
  fadeInUp?: boolean;
  delay?: number;
  info: string;
}
const Stat: FC<Props> = ({ title, data, isToday, info, noDelta, ...props }) => {
  const [total, delta] = data;
  const theme = useTheme();

  const deltaPositive = delta > 0;
  const color = "darkGreyText";
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
        {delta != 0 && (
          <Info>
            <Icon name="ArrowUp" stroke={theme("blackText")} size={12}></Icon>
            <span>{info}</span>
          </Info>
        )}
      </Col>
    </Col>
  );
};

const Board = ({ data }) => {
  return (
    // <Row >
    <Row jc="space-evenly">
      <Stat
        data={data.confirmed}
        title={"총 확진자 (공식)"}
        isToday
        fadeInUp
        delay={2}
        info="어제 증가수"
      ></Stat>
      <Box w="40px"></Box>
      <Stat
        data={data.current}
        title={"현재(비공식) 09시~23시"}
        fadeInUp
        delay={3}
        info="어제 동시간 대비 증가수"
      ></Stat>
    </Row>
  );
};

export default Board;
