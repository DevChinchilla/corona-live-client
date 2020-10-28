import DeltaTag from "@components/DeltaTag";
import { Col, Row } from "@components/Layout";
import { API, COUNTRY_CODES, COUNTRY_NAMES, SECOND } from "@consts";
import { fetcher, numberWithCommas, sortByDate } from "@utils";
import React from "react";
import styled, { css } from "styled-components";
import useSWR from "swr";
import WorldBoard from "./WorldBoard";
import WorldRow from "./WorldRow";

const Wrapper = styled.div``;

type Props = {};

interface WorldStatsType {
  [id: string]: {
    deaths: number;
    cases: number;
    casesDelta: number;
    deathsDelta: number;
    gmtCasesDelta: number;
    gmtDeathsDelta: number;
    rates: number;
    tests: number;
  };
}

interface WorldUpdatesType {}

const World: React.FC<Props> = ({}) => {
  const { data: stats } = useSWR<WorldStatsType>(API.worldStats, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshInterval: SECOND * 30,
  });

  const { data: updates } = useSWR<WorldUpdatesType[]>(API.worldUpdates, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshInterval: SECOND * 30,
  });

  if (!stats) return <></>;

  return (
    <Wrapper>
      <WorldBoard worldData={stats["WORLD"]}></WorldBoard>

      <Col>
        {Object.keys(stats)
          .filter((countryCode) => countryCode.length < 3)
          .sort((countryA, countryB) => stats[countryB].cases - stats[countryA].cases)
          .slice(0, 10)
          .map((code, i) => (
            <WorldRow key={i} data={stats[code]} code={code} index={i}></WorldRow>
          ))}
      </Col>
    </Wrapper>
  );
};

export default World;
