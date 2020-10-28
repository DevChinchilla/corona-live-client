import React, { FC } from "react";

import { CasesSummaryType, OverviewType } from "@types";
import { HOUR } from "@consts";
import Board from "@components/Board";

interface Props {
  data: OverviewType;
  casesSummary: CasesSummaryType;
  lastUpdated?: string;
}

const DomesticBoard: FC<Props> = ({ data, casesSummary, lastUpdated }) => {
  let { todayCases, yesterdayCases } = casesSummary;

  const [month, day] = (lastUpdated || " ").split("-");

  const statsData = [
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
  ];

  return <Board data={statsData}></Board>;
};

export default DomesticBoard;
