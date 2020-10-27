import React, { FC } from "react";

import { CasesSummaryType, OverviewType } from "@types";
import { HOUR } from "@consts";
import Board from "@components/Board";

interface Props {
  data: OverviewType;
  casesSummary: CasesSummaryType;
}

const DomesticBoard: FC<Props> = ({ data, casesSummary }) => {
  let { todayCases, yesterdayCases } = casesSummary;

  const date = new Date();
  const currentDate = new Date(date.getTime() - 10 * HOUR);
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const statsData = [
    {
      data: data.confirmed,
      title: "총 확진자",
      info: `${month}월 ${day}일 0시 기준`,
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
