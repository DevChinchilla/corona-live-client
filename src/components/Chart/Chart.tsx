import React, { useState, useEffect } from "react";
import "chartjs-plugin-datalabels";
import styled from "styled-components";

import { Row, Col } from "@components/Layout";
import TodayChart from "./TodayChart";
import DailyChart from "./DailyChart";
import RatesChart from "./RatesChart";
import { StatsType, TimerseriesType } from "@types";
import { useRouteMatch } from "react-router-dom";
import ToggleButtons from "@components/ToggleButtons";
import { IE11ErrorBoundary } from "@components/ErrorBoundary";

const Wrapper = styled(Col)`
  position: relative;
  color: white;
  margin-bottom: 8px;
  margin-top: 2px;
  canvas {
    height: 190px !important;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
`;

interface Props {
  timeseries: TimerseriesType;
  stats: StatsType;
  cityId?: string;
}

const Chart: React.FC<Props> = ({ timeseries, stats, cityId }) => {
  const routerMatch = useRouteMatch();

  const statInitialType = cityId != null ? "daily" : "today";
  const [statType, setStatType]: [string, any] = useState(statInitialType);
  const [chartType, setChartType]: [string, any] = useState("total");
  const [timeRange, setTimeRange]: [number, any] = useState(7);

  useEffect(() => {
    if (routerMatch.path == "/rates") setStatType("rates");
    if (routerMatch.path == "/daily") setStatType("daily");
  }, [routerMatch]);

  const current = stats.overview.current;

  if (!timeseries && statType != "today") return <></>;

  return (
    <IE11ErrorBoundary>
      <Wrapper>
        <Row jc="space-between" mb="10px" fadeInUp>
          <ToggleButtons
            noBg
            options={[
              { name: "오늘", value: "today", visible: true },
              { name: "일별", value: "daily", visible: true },
              { name: "확진율", value: "rates", visible: cityId == null },
            ]}
            activeOption={statType}
            setOption={setStatType}
          ></ToggleButtons>
          <Row>
            {statType == "today" ? (
              <ToggleButtons
                noBg
                options={[
                  { name: "누적", value: "total", visible: true },
                  { name: "시간대별", value: "delta", visible: true },
                ]}
                activeOption={chartType}
                setOption={setChartType}
              ></ToggleButtons>
            ) : (
              <ToggleButtons
                noBg
                options={[
                  { name: "1주", value: 7, visible: true },
                  { name: "2주", value: 14, visible: true },
                  { name: "3달", value: 90, visible: true },
                ]}
                activeOption={timeRange}
                setOption={setTimeRange}
              ></ToggleButtons>
            )}
          </Row>
        </Row>
        {statType == "today" && (
          <TodayChart {...{ stats, current, chartType, cityId }}></TodayChart>
        )}
        {statType == "daily" && <DailyChart {...{ timeseries, timeRange, cityId }}></DailyChart>}
        {statType == "rates" && cityId == null && (
          <RatesChart {...{ timeseries, timeRange, cityId }}></RatesChart>
        )}
      </Wrapper>
    </IE11ErrorBoundary>
  );
};

export default Chart;
