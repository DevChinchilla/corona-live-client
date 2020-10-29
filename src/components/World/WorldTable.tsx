import { Col, Row, Th } from "@components/Layout";
import { COUNTRY_TD_FLEX } from "@consts";
import React from "react";
import styled from "styled-components";
import WorldRow from "./WorldRow";

type Props = { data };

const Header = ({ tdFlex }) => {
  return (
    <Row alignItems="center" mb="12px" mt="20px" fadeInUp>
      <Th flex={tdFlex[0]}></Th>
      <Th flex={tdFlex[1]}>나라</Th>
      <Th flex={tdFlex[2]}>총 확진자</Th>
      <Th flex={tdFlex[3]}>총 사망자</Th>
      <Th flex={tdFlex[4]}></Th>
    </Row>
  );
};

const WorldTable: React.FC<Props> = ({ data }) => {
  const { stats: worldStats, updates: worldUpdates } = data;
  return (
    <>
      <Header tdFlex={COUNTRY_TD_FLEX}></Header>
      <Col>
        {Object.keys(worldStats)
          .filter((countryCode) => countryCode.length < 3)
          .sort((countryA, countryB) => worldStats[countryB].cases - worldStats[countryA].cases)
          .map((code, i) => {
            let lastUpdated = worldUpdates.find(({ country }) => country == code)
              ?.datetime as string;
            return (
              <WorldRow
                tdFlex={COUNTRY_TD_FLEX}
                key={i}
                data={worldStats[code]}
                code={code}
                index={i}
                lastUpdated={lastUpdated}
                updates={worldUpdates}
              ></WorldRow>
            );
          })}
      </Col>
    </>
  );
};

export default WorldTable;
