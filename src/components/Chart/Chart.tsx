import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { theme } from "@styles/themes";

import { ifProp } from "@styles/tools";

import { Row, Col } from "@components/Layout";
import LineChart from "./LineChart";

const ChartType = styled(Row)<{ active: boolean }>`
  font-size: 12px;
  padding: 6px 14px;
  background: ${theme("greyBg")};
  margin-top: 12px;

  color: ${theme("greyText")};
  cursor: pointer;
  &:first-child {
    border-radius: 4px 0px 0px 4px;
  }
  &:last-child {
    border-radius: 0px 4px 4px 0px;
  }
  &:not(:last-child) {
    border-right: 1px solid ${theme("lightGreyText")};
  }
  ${ifProp(
    "active",
    css`
      font-weight: bold;
      background: ${theme("blue")}30;
      color: ${theme("blue")};
    `
  )};
`;

const Wrapper = styled(Col)`
  position: relative;
  color: white;
  margin-top: 26px;
  margin-bottom: 10px;
  margin-top: 50px;
`;

const Chart = ({ timeseries, current }) => {
  const [chartType, setChartType]: [string, any] = useState("total");

  return (
    <Wrapper>
      <LineChart {...{ timeseries, current, chartType }}></LineChart>
      <Row jc="space-between" mb="10px" fadeInUp>
        <Row>
          <ChartType active={chartType == "total"} onClick={() => setChartType("total")}>
            오늘
          </ChartType>
          <ChartType active={chartType == "delta"} onClick={() => setChartType("delta")}>
            일별
          </ChartType>
          <ChartType active={chartType == "delta"} onClick={() => setChartType("delta")}>
            확진률
          </ChartType>
        </Row>
        <Row>
          <ChartType active={chartType == "total"} onClick={() => setChartType("total")}>
            누적
          </ChartType>
          <ChartType active={chartType == "delta"} onClick={() => setChartType("delta")}>
            시간대별
          </ChartType>
        </Row>
      </Row>
    </Wrapper>
  );
};

export default Chart;
