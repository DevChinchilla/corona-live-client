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

const World: React.FC<Props> = ({}) => {
  const { data: statsData }: { data: WorldStatsType } = useSWR(API.worldStats, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshInterval: SECOND * 30,
    onSuccess: (newLastUpdated) => {},
  });

  const { data: updatesData } = useSWR(API.worldUpdates, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshInterval: SECOND * 30,
    onSuccess: (newLastUpdated) => {},
  });

  if (!statsData) return <></>;

  return (
    <Wrapper>
      <WorldBoard worldData={statsData["World"]}></WorldBoard>
      {/* <Row>
        <Col ai="center" jc="center" my="20px" flex={1}>
          <Row fontSize="12px" opacity="0.7">
            총 확진자
          </Row>
          <Row fontSize="24px" fontWeight={700}>
            {numberWithCommas(cases)}
          </Row>
          <DeltaTag delta={casesDelta} showBg={false} color={"red"}></DeltaTag>
        </Col>
        <Col ai="center" jc="center" my="20px" flex={1}>
          <Row fontSize="12px" opacity="0.7">
            총 사망자
          </Row>
          <Row fontSize="24px" fontWeight={700}>
            {numberWithCommas(deaths)}
          </Row>
          <DeltaTag delta={deathsDelta} showBg={false} color={"red"}></DeltaTag>
        </Col>
      </Row> */}
      <Col>
        {Object.keys(statsData)
          .sort((a, b) => statsData[b].total - statsData[a].total)
          .slice(1, 5)
          .map((code, i) => (
            <WorldRow key={i} data={statsData[code]} code={code} index={i}></WorldRow>
          ))}
      </Col>
    </Wrapper>
  );
};

export default World;
