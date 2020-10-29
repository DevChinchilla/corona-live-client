import Board from "@components/Board";
import React from "react";

type Props = {
  worldData: { cases: number; casesDelta: number; deaths: number; deathsDelta: number };
};

const WorldBoard: React.FC<Props> = ({ worldData }) => {
  const { cases, casesDelta, deaths, deathsDelta } = worldData;

  const statsData = [
    {
      data: [cases, casesDelta],
      title: "총 확진자",
      showBg: true,
      vertical: true,
    },
    {
      data: [deaths, deathsDelta],
      title: "총 사망자",
      vertical: true,
      showBg: true,
    },
  ];

  return <Board data={statsData}></Board>;
};

export default WorldBoard;
