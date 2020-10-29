import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { TimerseriesType } from "@types";
import { setGradient } from "@utils";
import { CHART_PRIMARY_COLOR } from "@consts";

import { Col } from "@components/Layout";
import FixedTooltip from "@components/Chart/FixedTooltip";

const lineChartOptions = (theme, stepSize) => ({
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: false,
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
  legend: {
    position: "top",
    labels: {
      fontColor: "white",
      boxWidth: 20,
    },
    display: false,
  },
  layout: {
    padding: {
      top: 14,
    },
  },
  scales: {
    gridLines: {
      drawBorder: false,
      display: false,
    },
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          stepSize: stepSize,
          autoSkip: true,
          suggestedMin: 0,

          callback: (value) => {
            return `${value / 10000}만`;
          },
        },
        position: "right",
        gridLines: {
          color: `${theme("blackText")}10`,
          zeroLineColor: `${theme("blackText")}10`,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          autoSkip: true,
          autoSkipPadding: 14,
          maxRotation: 0,
          callback: (value) => {
            if (value !== 0) return `${value}${parseInt(value) ? "시" : ""}`;
          },
        },
        gridLines: {
          color: `${theme("blackText")}10`,
          display: false,
        },
      },
    ],
  },
});

const todayChartData = {
  datasets: [
    {
      label: "오늘",
      fill: true,
      backgroundColor: CHART_PRIMARY_COLOR,
      borderColor: `${CHART_PRIMARY_COLOR}90`,
      pointRadius: 5,
      pointBackgroundColor: CHART_PRIMARY_COLOR,
      pointBorderColor: Array(24).fill(`${CHART_PRIMARY_COLOR}50`),
      pointBorderWidth: Array(24).fill(1),
      hoverBackgroundColor: CHART_PRIMARY_COLOR,
      hoverBorderWidth: 20,
      pointHoverBorderColor: `${CHART_PRIMARY_COLOR}50`,
      hoverRadius: 5,
      lineTension: 0,
      borderWidth: 2,
    },
  ],
};

const Wrapper = styled(Col)`
  position: relative;
  canvas {
    height: 190px !important;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
`;

type Props = {
  timeseries: TimerseriesType;
};

const WorldChart: React.FC<Props> = ({ timeseries }) => {
  const chartRef = useRef<Line | null>();
  const _theme = useTheme();
  if (!timeseries) return <></>;

  const data = Object.keys(timeseries).map((time) => timeseries[time][0]);
  const timePeriod: string[] = Object.keys(timeseries);
  const [activeIndex, setActiveIndex] = useState(timePeriod.length - 1);

  const getData = (canvas) => {
    let datasets = todayChartData.datasets!.map((set, i) => {
      let backgroundColor = i == 0 ? setGradient(canvas, set.backgroundColor) : "transparent";
      let pointBorderWidth = timePeriod.map((_, j) => (j == activeIndex && i == 0 ? 16 : 1));
      return { ...set, backgroundColor, data: data, pointBorderWidth };
    });
    return { datasets, labels: timePeriod };
  };

  const onPointClick = (_, activeElements: any) => {
    let index = activeElements[0] && activeElements[0]._index;

    if (index != null) {
      const chart: any = chartRef.current?.chartInstance;

      chart!.data!.datasets[0]!.pointBorderWidth = Array(20).fill(1);
      chart!.data!.datasets[0]!.pointBorderWidth[index] = 16;

      setActiveIndex((prevIndex) => index || prevIndex);
      chart.update();
      chart.draw();
    }
  };
  const toolTipData = [{ color: "blue", value: data[activeIndex], name: "오늘" }];
  return (
    <>
      <Wrapper>
        <Line
          data={getData as any}
          ref={(el) => (chartRef.current = el)}
          options={
            {
              onClick: onPointClick,
              ...lineChartOptions(_theme, Math.ceil(100000)),
            } as any
          }
        ></Line>
      </Wrapper>
      <FixedTooltip
        data={toolTipData}
        onOptionSelect={setActiveIndex}
        selectedOption={activeIndex}
        options={timePeriod}
        optionName={(val) => (parseInt(val) ? `${val}시` : val)}
      ></FixedTooltip>
    </>
  );
};

export default WorldChart;
