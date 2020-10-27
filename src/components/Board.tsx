import React, { FC, useEffect, useRef } from "react";
import CountUp from "react-countup";

import { Row, Col, Box } from "@components/Layout";
import DeltaTag from "@components/DeltaTag";
import { useTheme } from "@hooks/useTheme";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { numberWithCommas } from "@utils";

const Info = styled(Row)`
  font-size: 10px;
  opacity: 0.5;
  margin-top: 4px;
  align-items: center;
  justify-content: flex-start;
  span {
    margin-left: 2px;
  }
`;
interface StatsProps {
  title: string;
  data: any;
  fadeInUp?: boolean;
  delay?: number;
  info?: string;
  vertical: boolean;
}

const Stat: FC<StatsProps> = ({ title, data, info, vertical, ...props }) => {
  const [total, delta] = data;
  const prevTotal = useRef(0);
  const prevDelta = useRef(0);

  useEffect(() => {
    prevTotal.current = total;
    prevDelta.current = delta;
  }, [total]);

  const theme = useTheme();

  const history = useHistory();

  const deltaPositive = delta > 0;
  const color = "darkGreyText";
  const deltaColor = deltaPositive ? "red" : "blue";
  const _color = theme(color);

  return (
    <Col {...props} mt="10px" ai={vertical ? "center" : "flex-start"}>
      <Box fontSize="11px" mb="2px" color={_color} opacity={0.7}>
        {title}
      </Box>
      <Row ai="center" style={{ flexDirection: vertical ? "column" : "row" }}>
        <Row>
          <Box fontSize="24px" fontWeight={700} color={_color}>
            {history.location.state == "live" ? (
              numberWithCommas(total)
            ) : (
              <CountUp start={prevTotal.current} end={total} separator={","} duration={3} />
            )}
          </Box>
          <Box fontSize="24px" fontWeight={300} color={_color}>
            명
          </Box>
        </Row>
        <Box w="8px"></Box>
        <DeltaTag
          color={deltaColor}
          delta={delta}
          countUp={history.location.state != "live"}
          prevDelta={prevDelta.current}
        ></DeltaTag>
      </Row>
      {info && (
        <Info>
          <span>{info}</span>
        </Info>
      )}
    </Col>
  );
};

interface BoardDataType {
  data: [number, number];
  title: string;
  info?: string;
  vertical?: string;
}

interface BoardProps {
  data: BoardDataType[];
}

const Board: FC<BoardProps> = ({ data }) => {
  return (
    <Row jc="space-between" mt="8px" mb="24px">
      {data.map((stat) => {
        return <Stat {...stat} fadeInUp delay={2}></Stat>;
      })}
    </Row>
  );
};

export default Board;
