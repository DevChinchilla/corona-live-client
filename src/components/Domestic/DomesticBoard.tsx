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
  const statsData = useMemo(
    () => [
      {
        data: data.confirmed,
        title: "총 확진자수",
        info: `0시 기준 신규 확진자수`,
      },
      {
        data: data.current,
        title: "실시간 확진자수",
        info: `어제 동시간 대비`,
      },
    ],
    [lastUpdatedDate, lastUpdatedTime]
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
