import React, { useState, useRef, useEffect, RefObject } from "react";
import { Line, ChartData } from "react-chartjs-2";
import styled, { css } from "styled-components";
import { theme } from "@styles/themes";
import { useTheme } from "@hooks/useTheme";
import { TimerseriesType, CurrentType } from "@types";
import { Row, Col } from "./Layout";
import { ifProp } from "@styles/tools";

const PRIMARY_COLOR = `#5673EB`;
const SECONDARY_COLOR = `#999999`;

const DATA: ChartData<Chart.ChartData> = {
  datasets: [
    {
      label: "오늘",
      fill: true,
      backgroundColor: `${PRIMARY_COLOR}`,
      borderColor: `${PRIMARY_COLOR}90`,
      pointRadius: 5,
      pointBackgroundColor: `${PRIMARY_COLOR}`,
      pointBorderColor: Array(24).fill(`${PRIMARY_COLOR}50`),
      pointBorderWidth: Array(24).fill(1),
      hoverBackgroundColor: `${PRIMARY_COLOR}`,
      hoverBorderWidth: 20,
      pointHoverBorderColor: `${PRIMARY_COLOR}50`,
      hoverRadius: 5,
      lineTension: 0,
      borderWidth: 2,
    },
  ],
};

// {
//   label: "어제",
//   fill: true,
//   pointRadius: 5,
//   pointBackgroundColor: `${SECONDARY_COLOR}`,
//   // pointBorderColor: `${SECONDARY_COLOR}60`,
//   pointBorderColor: Array(10).fill(`${PRIMARY_COLOR}60`),
//   hoverBackgroundColor: `${SECONDARY_COLOR}`,
//   pointBorderWidth: Array(24).fill(1),
//   backgroundColor: "transparent",
//   hoverRadius: 5,
//   borderColor: `${SECONDARY_COLOR}40`,
//   // pointBorderWidth: 6,
//   lineTension: 0,
//   borderWidth: 2,
// },

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

const Tooltip = styled(Col)`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0px;
  top: -10px;
  font-size: 11px;
  background: ${theme("greyBg")};
  padding: 10px;
  border-radius: 6px;
  strong {
    font-weight: bold;
  }
  .time {
    font-weight: bold;
    font-size: 14px;
    color: ${theme("darkGreyText")};
    margin-bottom: 2px;
  }
  .blue {
    color: ${theme("blue")};
    &:before {
      background: ${theme("blue")};
      box-shadow: 0 0 0 2px ${theme("blue")}50;
    }
  }
  .grey {
    color: ${theme("greyText")};
    &:before {
      background: ${theme("greyText")};
      box-shadow: 0 0 0 2px ${theme("greyText")}50;
    }
  }
  div {
    padding: 0px 4px;
    display: flex;
    align-items: center;
    &:before {
      content: "";
      display: flex;
      width: 6px;
      border-radius: 6px;
      height: 6px;
      margin-right: 8px;
    }
  }
`;

type Props = { timeseries: TimerseriesType; current: any };

const Graph: React.FC<Props> = ({ timeseries, current }) => {
  console.log({ current });
  if (!timeseries) return <div style={{ height: "10px" }}></div>;
  const [dataType, setDataType]: [string, any] = useState("accumulated");
  const isDelta = dataType == "delta";
  const [showTooltip, setShowTooltip] = useState(true);

  const { today, yesterday } = timeseries;
  const currentTime = Math.max(...Object.keys(today));
  const todayStats = [
    ...Object.keys(today).map((a) => today[a][isDelta ? 1 : 0]),
    isDelta ? current[0] - today[currentTime][0] : current[0],
  ];
  const yesterdayStats = [
    ...Object.keys(yesterday).map((a) => yesterday[a][isDelta ? 1 : 0]),
    isDelta ? current[0] - current[1] - yesterday[currentTime][0] : current[0] - current[1],
  ];
  const timePeriod = [...Object.keys(today), "현재"];
  // const [activeIndex, setActiveIndex] = useState(Object.keys(today).length - 1);
  const [activeIndex, setActiveIndex] = useState(Object.keys(today).length);

  const chartRef = useRef<Line | null>();
  const _theme = useTheme();

  const setGradient = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, `${color}70`);
    gradient.addColorStop(1, `${color}00`);
    return gradient;
  };

  if (!DATA) return <></>;

  const getData = (canvas) => {
    const { datasets } = DATA;
    let _datasets = datasets?.map((set, i) => {
      let backgroundColor = i == 0 ? setGradient(canvas, set.backgroundColor) : "transparent";

      let pointBorderWidth = timePeriod.map((_, j) => (j == activeIndex && i == 0 ? 20 : 1));
      let data = i == 0 ? todayStats : yesterdayStats;
      return { ...set, backgroundColor, data, pointBorderWidth };
    });
    return { datasets: _datasets, labels: timePeriod };
  };

  return (
    <>
      <Wrapper fadeInUp delay={8}>
        {showTooltip && (
          <Tooltip fadeInUp>
            <span className="time">
              {`${
                isDelta && parseInt(timePeriod[activeIndex])
                  ? ((timePeriod[activeIndex] - 1) % 24) + "시"
                  : ""
              } ${
                parseInt(timePeriod[activeIndex]) ? `~ ${timePeriod[activeIndex] % 24}시` : "현재"
              }`}
            </span>
            {/* <div className="grey">
              어제 <strong> &nbsp;{yesterdayStats[activeIndex] || 0}명</strong>{" "}
            </div> */}
            {todayStats.length - 1 >= activeIndex && (
              <div className="blue">
                오늘 <strong>&nbsp;{todayStats[activeIndex]}명</strong>{" "}
              </div>
            )}
          </Tooltip>
        )}

        <Line
          data={getData as any}
          ref={(el) => (chartRef.current = el)}
          options={{
            responsive: true,

            onClick: (el, activeElements: any) => {
              let index = activeElements[0] && activeElements[0]._index;

              if (index != null) {
                const chart: any = chartRef.current?.chartInstance;
                // chart!.data!.datasets[0]!.pointBorderColor[index] = `${PRIMARY_COLOR}50`;
                // chart!.data!.datasets[0]!.pointBorderColor[index] = "white";
                // chart!.data.datasets[1].pointBorderColor[index] = "white";
                chart!.data!.datasets[0]!.pointBorderWidth = Array(20).fill(1);
                chart!.data!.datasets[0]!.pointBorderWidth[index] = 20;
                // chart!.data!.datasets[1]!.pointBorderWidth[index] = 2;
                // chart!.data!.datasets[1]!.pointBorderWidth = 10;
                setShowTooltip((a) => !a);
                setShowTooltip((a) => !a);
                setActiveIndex((prevIndex) => index || prevIndex);
                chart.update();
                chart.draw();
              }
              // let index = activeElements[0] && activeElements[0]._index;
              // setActiveIndex((prevIndex) => index || prevIndex);
              // if (index != null) {
              //   setShowTooltip((a) => !a);
              //   setShowTooltip((a) => !a);
              // }
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
                  ticks: {
                    beginAtZero: false,
                    fontColor: `${_theme("blackText")}B0`,
                    fontSize: 11,
                    stepSize: isDelta ? 20 : 100,
                    autoSkip: true,
                    callback: (value, index) => {
                      if (value !== 0) return value;
                    },
                  },
                  position: "right",
                  gridLines: {
                    color: `${_theme("blackText")}10`,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: `${_theme("blackText")}B0`,
                    fontSize: 11,
                    autoSkip: true,
                    autoSkipPadding: 14,
                    maxRotation: 0,
                    callback: (value, index) => {
                      if (value !== 0) return `${value}${parseInt(value) ? "시" : ""}`;
                    },
                  },
                  gridLines: {
                    color: `${_theme("blackText")}10`,
                    display: false,
                  },
                },
              ],
            },
          }}
        ></Line>
        <Row jc="center" mt="10px" fadeInUp>
          <OptionButton
            active={dataType == "accumulated"}
            onClick={() => setDataType("accumulated")}
          >
            누적
          </OptionButton>
          <OptionButton active={dataType == "delta"} onClick={() => setDataType("delta")}>
            시간대별
          </OptionButton>
        </Row>
        <Row fontSize="12px" opacity="0.5" textAlign="center" jc="center" mt="12px" mb="12px">
          전날 대비 그래프/수치는 내일부터 다시 공개됩니다
        </Row>
      </Wrapper>
    </>
  );
};

const OptionButton = styled(Row)<{ active: boolean }>`
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
export default Graph;
