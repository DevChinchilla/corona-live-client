import React, { FC, useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

import { Row, Col, Box } from "./Layout";
import DeltaTag from "@components/DeltaTag";
import { useTheme } from "@hooks/useTheme";
import Icon from "./Icon";
import styled from "styled-components";
import { CasesSummaryType, OverviewType } from "@types";
import { useHistory } from "react-router-dom";
import { numberWithCommas } from "@utils";
import { HOUR } from "@consts";

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
  isToday?: boolean;
  fadeInUp?: boolean;
  delay?: number;
  info?: string;
}
const Stat: FC<StatsProps> = ({ title, data, isToday, info, ...props }) => {
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
            {history.location.state == "live" ? (
              numberWithCommas(total)
            ) : (
              <CountUp
                start={prevTotal.current}
                end={total}
                // end={total}
                separator={","}
                duration={3}
              />
            )}
          </Box>

          <Box fontSize="24px" fontWeight={300} color={_color}>
            명
          </Box>
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
            {/* <Icon name="ArrowUp" stroke={theme("blackText")} size={12}></Icon> */}
          </Info>
        )}
      </Col>
    </Col>
  );
};

interface BoardProps {
  data: OverviewType;
  casesSummary: CasesSummaryType;
}

const Board: FC<BoardProps> = ({ data, casesSummary }) => {
  let { todayCases, yesterdayCases } = casesSummary;

  const date = new Date();
  const currentDate = new Date(date.getTime() - 10 * HOUR);
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return (
    <Row jc="space-evenly" mt="8px" mb="24px">
      <Stat
        data={data.confirmed}
        title={"총 확진자 "}
        isToday
        fadeInUp
        delay={2}
        info={`${month}월 ${day}일 0시 기준`}
      ></Stat>
      <Box w="24px"></Box>
      <Stat
        data={data.current}
        title={"오늘 추가확진자"}
        fadeInUp
        delay={3}
        info={`오늘발생 ${yesterdayCases + todayCases}명중 ${yesterdayCases}명 어제집계`}
      ></Stat>
    </Row>
  );
};

export default Board;
