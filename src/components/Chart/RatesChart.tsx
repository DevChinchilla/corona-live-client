import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import styled from "styled-components";

import { useTheme } from "@hooks/useTheme";
import { setGradient } from "@utils";
import { CHART_PRIMARY_COLOR, CHART_SECONDARY_COLOR } from "@consts";

import { Col, Row } from "@components/Layout";
import FixedTooltip from "@components/Chart/FixedTooltip";

const ratesChartOptions = (theme, cases) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: true,
      anchor: "end",
      align: "end",
      offset: 0,
      color: (context) => {
        return context.dataset.borderColor;
      },
      font: {
        size: 10,
      },
      formatter: (value) => {
        if (cases.length > 7) return "";
        return value;
      },
    },
  },
  tooltips: {
    enabled: false,
  },
  layout: {
    padding: {
      top: 18,
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
  scales: {
    gridLines: {
      drawBorder: false,
      display: false,
    },
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          stepSize: 5000,
          callback: (value) => {
            let unitValue = value >= 10000 ? 10000 : 1000;
            let unit = unitValue == 10000 ? "만" : "천";

            return value !== 0 ? `${parseFloat(Number(value / unitValue).toFixed(1))}${unit}` : "";
          },
        },
        id: "A",

        position: "left",
        gridLines: {
          color: `${theme("blackText")}10`,
          zeroLineColor: `${theme("blackText")}10`,
        },
      },
      {
        ticks: {
          beginAtZero: true,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          max: 6,
          stepSize: 1,
          callback: (value) => {
            return value !== 0 ? `${value}%` : "";
          },
        },
        id: "B",
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
  const [timePeriod, cases, tests, rates] = useMemo(() => {
    let timePeriod = Object.keys(timeseries)
      .filter((a) => timeseries[a].negative)
      .slice(-timeRange);
    let cases = timePeriod.map((a) => timeseries[a][cityId || "confirmed"]);
    let tests = timePeriod.map((a) => timeseries[a]["negative"]);
    let rates = timePeriod.map((a) =>
      ((timeseries[a]["confirmed"] / timeseries[a]["negative"]) * 100).toFixed(2)
    );
    return [timePeriod, cases, tests, rates];
  }, [timeseries, timeRange]);

  const [activeIndex, setActiveIndex] = useState(timePeriod.length - 1);

  const chartRef = useRef<Line | null>();
  const _theme = useTheme();

  useEffect(() => {
    if (activeIndex != timePeriod.length - 1) setActiveIndex(timePeriod.length - 1);
  }, [timeRange]);

  const getData = useCallback(
    (canvas) => {
      return {
        datasets: [
          {
            label: "확진율",
            data: rates,
            type: "line",
            yAxisID: "B",
            backgroundColor: setGradient(canvas, _theme("blue")),
            borderColor: `${CHART_PRIMARY_COLOR}`,
            borderWidth: 3,
            lineTension: 0,
            pointBorderWidth: 0,
            barThickness: 6,
          },
          {
            label: "검사",
            data: tests,
            type: "bar",
            yAxisID: "A",
            barThickness: timeRange > 30 ? 2 : 6,
            backgroundColor: `${CHART_SECONDARY_COLOR}70`,
          },
        ],
        labels: timePeriod.slice(timePeriod.length - timeRange),
      };
    },
    [timePeriod]
  );

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

  const toolTipData = useMemo(
    () => [
      {
        color: "greyText",
        value: tests[activeIndex],
        name: "검사",
        unitName: "",
        hideIcon: true,
      },
      { color: "blue", value: rates[activeIndex], name: "확진율", unitName: "%", hideIcon: true },
    ],
    [tests, rates, activeIndex]
  );

  return (
    <>
      <Wrapper>
        <Bar
          data={getData as any}
          ref={(el) => (chartRef.current = el)}
          options={{
            onClick: onPointClick,
            ...(ratesChartOptions(_theme, cases) as any),
          }}
        ></Bar>
      </Wrapper>
      <FixedTooltip
        flex={null}
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
