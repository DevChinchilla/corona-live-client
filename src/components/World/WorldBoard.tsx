import Board from "@components/Board";
import React from "react";
import styled from "styled-components";

type Props = {
  worldData: { cases: number; casesDelta: number; deaths: number; deathsDelta: number };
};

const WorldBoard: React.FC<Props> = ({ worldData }) => {
  const { cases, casesDelta, deaths, deathsDelta } = worldData;

  const statsData = [
    {
      data: [cases, casesDelta],
      title: "총 확진자",
      vertical: true,
    },
    {
      data: [deaths, deathsDelta],
      title: "오늘 추가확진자",
      vertical: true,
    },
  ];

  return <Board data={statsData} numbersOnly></Board>;
};

export default WorldBoard;
