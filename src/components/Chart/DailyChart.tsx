import React, { useState, useRef, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { setGradient } from "@utils";
import { CHART_PRIMARY_COLOR, CHART_SECONDARY_COLOR } from "@consts";

import { Col } from "@components/Layout";
import FixedTooltip from "@components/Chart/FixedTooltip";

const dailyChartOptions = (theme, stepSize, cases) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: true,
      anchor: "end",
      align: "end",
      offset: 0,
      color: `${theme("darkGreyText")}c0`,
      font: {
        size: 10,
      },
      formatter: (_, context) => {
        if (cases.length > 14) return "";
        if (context.dataset.label == "해외") return "";
        return cases[context.dataIndex];
      },
    },
  },
  layout: {
    padding: {
      top: 14,
    },
  },
  tooltips: {
    enabled: false,
  },
  legend: {
    position: "top",
    labels: {
      fontColor: "white",
      boxWidth: 20,
    },
    display: false,
  },
  scales: {
    gridLines: {
      drawBorder: false,
      display: false,
    },
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
          suggestedMin: 0,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          stepSize: stepSize || 30,
          callback: (value) => {
            return value;
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
        stacked: true,
        ticks: {
          beginAtZero: true,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          autoSkip: true,
          autoSkipPadding: 14,
          maxRotation: 0,
          callback: (value) => {
            let [_, month, day] = value.split("-");
            return `${Number(month)}/${Number(day)}`;
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

const Wrapper = styled(Col)`
  position: relative;
`;

type Props = {
  timeseries: any;
  timeRange: any;
  cityId?: string;
};

const BarChart: React.FC<Props> = ({ timeseries, timeRange, cityId }) => {
  const timePeriod = Object.keys(timeseries).slice(-timeRange);
  const [activeIndex, setActiveIndex] = useState(timePeriod.length - 1);
  const cases = timePeriod.map((a) => timeseries[a][cityId || "confirmed"]);

  const imported = timePeriod.map((a) => timeseries[a]["imported"]);
  const domestic = timePeriod.map((a) => timeseries[a]["domestic"]);

  const chartRef = useRef<Line | null>();
  const _theme = useTheme();

  useEffect(() => {
    if (activeIndex != timePeriod.length - 1) setActiveIndex(timePeriod.length - 1);
  }, [timeRange]);

  const getData = (canvas) => {
    if (cityId != null || timeRange > 14) {
      return {
        datasets: [
          {
            label: "확진자",
            data: cases,
            type: timePeriod.length > 14 ? "line" : "bar",
            backgroundColor: setGradient(canvas, CHART_PRIMARY_COLOR),
            borderColor: `${CHART_PRIMARY_COLOR}`,
            pointRadius: 0,
            borderWidth: 3,
            lineTension: 0,
            pointBorderWidth: 0,
            barThickness: 6,
          },
        ],
        labels: timePeriod.slice(timePeriod.length - timeRange),
      };
    } else {
      return {
        datasets: [
          {
            label: "해외",
            data: imported,
            barThickness: 6,
            backgroundColor: CHART_SECONDARY_COLOR,
          },
          {
            label: "국내",
            data: domestic,
            backgroundColor: setGradient(canvas, CHART_PRIMARY_COLOR),
            borderColor: `${CHART_PRIMARY_COLOR}`,
            borderWidth: 3,
            lineTension: 0,
            pointBorderWidth: 0,
            barThickness: 6,
          },
        ],
        labels: timePeriod.slice(timePeriod.length - timeRange),
      };
    }
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

  const toolTipData =
    cityId == null
      ? [
          { color: "greyText", value: imported[activeIndex], name: "해외" },
          { color: "blue", value: domestic[activeIndex], name: "국내" },
        ]
      : [{ color: "blue", value: cases[activeIndex], name: "확진자" }];

  const max = Math.max(...cases);
  const stepSize = max > 300 ? 100 : 30;
  return (
    <>
      <Wrapper>
        <Bar
          data={getData}
          ref={(el) => (chartRef.current = el)}
          options={{
            onClick: onPointClick,
            ...(dailyChartOptions(_theme, stepSize, cases) as any),
          }}
        ></Bar>
      </Wrapper>
      <FixedTooltip
        data={toolTipData}
        onOptionSelect={setActiveIndex}
        selectedOption={activeIndex}
        options={timePeriod}
        optionName={(val) => val.slice(5)}
      ></FixedTooltip>
    </>
  );
};

export default BarChart;
