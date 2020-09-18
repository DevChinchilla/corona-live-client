import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { TimerseriesType } from "@types";
import { setGradient, getStatistic } from "@utils";
import { lineChartData, lineChartOptions } from "@consts";

import { Col } from "@components/Layout";
import FixedTooltip from "@components/Chart/FixedTooltip";

const Wrapper = styled(Col)`
  position: relative;
`;

type Props = { timeseries: TimerseriesType; current: any; chartType: any };

const LineChart: React.FC<Props> = ({ timeseries, current, chartType }) => {
  const chartRef = useRef<Line | null>();
  const _theme = useTheme();

  if (!timeseries) return <></>;

  const { today: todayData, yesterday: yesterdayData } = timeseries;

  const [activeIndex, setActiveIndex] = useState(Object.keys(todayData).length);
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
    <Wrapper fadeInUp delay={5}>
      <FixedTooltip
        title={tooltipTitle}
        today={statistic[0][activeIndex]}
        yesterday={statistic[1][activeIndex]}
        onOptionSelect={setActiveIndex}
        selectedOption={activeIndex}
        options={timePeriod}
        optionName={(val) => (parseInt(val) ? `${val}시` : val)}
      ></FixedTooltip>
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
    </Wrapper>
  );
};

export default LineChart;
