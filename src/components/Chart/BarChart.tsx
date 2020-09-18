import React, { useState, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { TimerseriesType } from "@types";
import { setGradient, getStatistic } from "@utils";
import { barChartOptions, lineChartData, lineChartOptions } from "@consts";

import { Col } from "@components/Layout";
import FixedTooltip from "@components/Chart/FixedTooltip";

const Wrapper = styled(Col)`
  position: relative;
`;

type Props = {
  timeseries;
};

const getTimeseriesData = () => {};

const BarChart: React.FC<Props> = ({ timeseries }) => {
  const timePeriod = Object.keys(timeseries);
  const [statType, setStatType] = useState("cases");
  const [timeRange, setTimeRange] = useState(10);

  const cases = Object.keys(timeseries).map((a) => timeseries[a][statType]);
  const data = {
    datasets: [
      {
        label: "# of Tomatoes",
        data: cases,
        backgroundColor: "#5673EB",
        barThickness: 5,
      },
    ],
  };
  const chartRef = useRef<Line | null>();
  const _theme = useTheme();

  const getData = () => {
    let datasets;
    if (statType == "cases") {
      return {
        datasets: [
          {
            label: "# of Tomatoes",
            data: cases,
            backgroundColor: "#5673EB",
            barThickness: 5,
          },
        ],
        labels: timePeriod.slice(timePeriod.length - timeRange),
      };
      // datasets = lineChartData!.datasets!.map((set, i) => {
      //   let backgroundColor = i == 0 ? setGradient(canvas, set.backgroundColor) : "transparent";
      //   let pointBorderWidth = timePeriod.map((_, j) => (j == activeIndex && i == 0 ? 20 : 1));
      //   return { ...set, backgroundColor, data: statistic[i], pointBorderWidth };
      // });
    }
    return { datasets, labels: timePeriod.slice(timePeriod.length - timeRange) };
  };
  return (
    <Wrapper>
      <Bar
        data={getData}
        ref={(el) => (chartRef.current = el)}
        options={{ ...(barChartOptions(_theme) as any) }}
      ></Bar>
    </Wrapper>
  );
};

export default BarChart;
