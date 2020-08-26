import React, { useState, useRef, useEffect, RefObject } from "react";
import { Line, ChartData } from "react-chartjs-2";
import styled, { css } from "styled-components";
import { theme } from "@styles/themes";
import { useTheme } from "@hooks/useTheme";
import { TimerseriesType } from "@types";
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
      pointRadius: 4,
      pointBackgroundColor: `${PRIMARY_COLOR}`,
      // pointBorderColor: `${PRIMARY_COLOR}60`,
      pointBorderWidth: 1,
      lineTension: 0,
      borderWidth: 2,
    },
    {
      label: "어제",
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: `${SECONDARY_COLOR}`,
      // pointBorderColor: `${SECONDARY_COLOR}60`,
      backgroundColor: "transparent",
      borderColor: `${SECONDARY_COLOR}40`,
      // pointBorderWidth: 6,
      pointBorderWidth: 1,
      lineTension: 0,
      borderWidth: 2,
    },
  ],
};

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

const Tooltip = styled.div`
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

type Props = { timeseries: TimerseriesType };

const Graph: React.FC<Props> = ({ timeseries }) => {
  if (!timeseries) return <></>;
  const [dataType, setDataType]: [string, any] = useState("accumulated");
  const isDelta = dataType == "delta";

  const { today, yesterday } = timeseries;
  const todayStats = Object.keys(today).map((a) => today[a][isDelta ? 1 : 0]);
  const yesterdayStats = Object.keys(yesterday).map((a) => yesterday[a][isDelta ? 1 : 0]);
  const timePeriod = Object.keys(yesterday);
  const [activeIndex, setActiveIndex] = useState(Object.keys(today).length - 1);

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
    console.log("rendered");
    const { datasets } = DATA;
    let _datasets = datasets?.map((set, i) => {
      let backgroundColor = i == 0 ? setGradient(canvas, set.backgroundColor) : "transparent";

      let pointBorderColor = timePeriod.map((_, j) =>
        j == activeIndex ? "white" : set.pointBorderColor
      );
      let data = i == 0 ? todayStats : yesterdayStats;
      console.log(data);
      return { ...set, backgroundColor, pointBorderColor, data };
    });
    return { datasets: _datasets, labels: timePeriod };
  };

  useEffect(() => {
    const chart: any = chartRef.current?.chartInstance;
    chart!.data!.datasets[0]!.pointBorderColor[1] = "white";
    chart.data.datasets[1].pointBorderColor[1] = "white";
    chart.update();
    chart.draw();
  }, []);

  return (
    <>
      <Wrapper fadeInUp delay={8}>
        <Tooltip>
          <span className="time">{timePeriod[activeIndex] % 24}시 기준</span>
          <div className="grey">
            어제 <strong> &nbsp;{yesterdayStats[activeIndex] || 0}명</strong>{" "}
          </div>
          {todayStats.length - 1 >= activeIndex && (
            <div className="blue">
              오늘 <strong>&nbsp;{todayStats[activeIndex]}명</strong>{" "}
            </div>
          )}
        </Tooltip>

        <Line
          data={getData as any}
          ref={(el) => (chartRef.current = el)}
          options={{
            responsive: true,
            onClick: (_, activeElements: any) => {
              let index = activeElements[0] && activeElements[0]._index;
              setActiveIndex((prevIndex) => index || prevIndex);
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
                    stepSize: isDelta ? 20 : 30,
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
                      if (value !== 0) return `${value}${"시"}`;
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
        <Row jc="center" mt="10px">
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
