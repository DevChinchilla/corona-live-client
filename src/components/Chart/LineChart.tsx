import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import styled, { css } from "styled-components";
import { theme } from "@styles/themes";

import { useTheme } from "@hooks/useTheme";
import { TimerseriesType } from "@types";
import { ifProp } from "@styles/tools";
import { setGradient, getStatistic } from "@utils";
import { lineChartData, lineChartOptions } from "@consts";

import { Row, Col } from "@components/Layout";
import FixedTooltip from "@components/Chart/FixedTooltip";

const Wrapper = styled(Col)`
  position: relative;
  color: white;
  margin-top: 50px;
  svg {
    fill: white;
    text {
      color: white;
    }
  }
`;

const ChartType = styled(Row)<{ active: boolean }>`
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 4px;
  background: ${theme("greyBg")};
  color: ${theme("greyText")};
  cursor: pointer;
  &:first-child {
    border-radius: 4px 0px 0px 4px;
  }
  &:last-child {
    border-radius: 0px 4px 4px 0px;
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

type Props = { timeseries: TimerseriesType; current: any };

const Graph: React.FC<Props> = ({ timeseries, current }) => {
  const chartRef = useRef<Line | null>();
  const _theme = useTheme();

  if (!timeseries) return <></>;

  const { today: todayData, yesterday: yesterdayData } = timeseries;

  const [chartType, setChartType]: [string, any] = useState("total");
  const [activeIndex, setActiveIndex] = useState(Object.keys(todayData).length);
  const [showTooltip, setShowTooltip] = useState(true);
  const isDelta = chartType == "delta";

  const [currentTotal, currentDelta] = current;
  const yesterdayTotal = currentTotal - currentDelta;

  const statistic = [
    getStatistic(todayData, currentTotal, "today", chartType),
    getStatistic(yesterdayData, yesterdayTotal, "yesterday", chartType),
  ];

  const timePeriod: string[] = [...Object.keys(todayData), "현재"];

  const getData = (canvas) => {
    let datasets = lineChartData!.datasets!.map((set, i) => {
      let backgroundColor = i == 0 ? setGradient(canvas, set.backgroundColor) : "transparent";
      let pointBorderWidth = timePeriod.map((_, j) => (j == activeIndex && i == 0 ? 20 : 1));
      return { ...set, backgroundColor, data: statistic[i], pointBorderWidth };
    });
    return { datasets, labels: timePeriod };
  };

  const onPointClick = (_, activeElements: any) => {
    let index = activeElements[0] && activeElements[0]._index;

    if (index != null) {
      const chart: any = chartRef.current?.chartInstance;

      chart!.data!.datasets[0]!.pointBorderWidth = Array(20).fill(1);
      chart!.data!.datasets[0]!.pointBorderWidth[index] = 20;

      setShowTooltip((a) => !a);
      setShowTooltip((a) => !a);

      setActiveIndex((prevIndex) => index || prevIndex);
      chart.update();
      chart.draw();
    }
  };

  const selectedTime = parseInt(timePeriod[activeIndex]);
  const tooltipTitle = `${isDelta && selectedTime ? ((selectedTime - 1) % 24) + "시" : ""} ${
    selectedTime ? `~ ${selectedTime % 24}시` : "현재"
  }`;

  return (
    <>
      <Wrapper fadeInUp delay={5}>
        {showTooltip && (
          <FixedTooltip
            title={tooltipTitle}
            today={statistic[0][activeIndex]}
            yesterday={statistic[1][activeIndex]}
          ></FixedTooltip>
        )}

        <Line
          data={getData as any}
          ref={(el) => (chartRef.current = el)}
          options={
            {
              onClick: onPointClick,
              ...lineChartOptions(isDelta, _theme),
            } as any
          }
        ></Line>
        <Row jc="center" mt="10px" fadeInUp>
          <ChartType active={chartType == "total"} onClick={() => setChartType("total")}>
            누적
          </ChartType>
          <ChartType active={chartType == "delta"} onClick={() => setChartType("delta")}>
            시간대별
          </ChartType>
        </Row>
      </Wrapper>
    </>
  );
};

export default Graph;
