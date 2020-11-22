import React, { FC, useMemo } from "react";

import { CasesSummaryType, OverviewType } from "@types";
import Board from "@components/Board";

interface Props {
  data: OverviewType;
  casesSummary: CasesSummaryType;
  lastUpdatedDate?: string;
  lastUpdatedTime?: string;
}

const DomesticBoard: FC<Props> = ({ data, casesSummary, lastUpdatedDate, lastUpdatedTime }) => {
  let { todayCases, yesterdayCases } = casesSummary;

  const [month, day] = (lastUpdatedDate || " ").split("-");

  const statsData = useMemo(
    () => [
      {
        data: data.confirmed,
        title: "총 확진자",
        info: `${month}월 ${day}일 00시 기준`,
      },
      {
        data: data.current,
        title: "오늘 추가확진자",
        info: `오늘발생 ${yesterdayCases + todayCases}명중 ${yesterdayCases}명 어제집계`,
      },
    ],
    [lastUpdatedTime]
  );

  return <Board data={statsData}></Board>;
};

const MemoDomesticBoard = React.memo(DomesticBoard, (prev, next) => {
  return (
    prev.data.confirmed[0] == next.data.confirmed[0] &&
    prev.data.confirmed[1] == next.data.confirmed[1] &&
    prev.data.current[0] == next.data.current[0] &&
    prev.data.current[1] == next.data.current[1]
  );
});

export default MemoDomesticBoard;
