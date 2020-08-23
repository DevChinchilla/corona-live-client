import styled, { css } from "styled-components";
import React from "react";
import Row from "./Row";
import { Col, Row as RowLayout } from "./Layout";
import { theme } from "@styles/themes";

const Th = styled(RowLayout)`
  font-size: 11px;
  transform: translateX(4px);
  color: ${theme("greyText")};
`;

const Header = ({ tdFlex }) => {
  return (
    <RowLayout alignItems="center" mb="12px" mt="30px" px="10px" fadeInUp>
      <Th flex={tdFlex[0]}>지역</Th>
      <Th flex={tdFlex[1]}>{""}</Th>
      <Th flex={tdFlex[2]}>총 확진자</Th>
      <Th>오늘</Th>
    </RowLayout>
  );
};

const Table = ({ today, overall: { domestic, date }, data, updates, tdFlex }) => {
  return (
    <>
      <Header tdFlex={tdFlex}></Header>
      <Col fadeInUp delay={6}>
        {Object.keys(domestic.total).map((cityId, i) => {
          const hasCases = today.total[cityId] != null;
          const latestUpdate = updates.find((update) => {
            let { city, gu } = update;
            return city == cityId;
          });

          return (
            <Row
              tdFlex={tdFlex}
              fadeInUp
              delay={i * 1.5}
              even={i % 2 == 0}
              key={cityId}
              cityId={cityId}
              updateTime={latestUpdate?.datetime}
              data={{
                total: { total: domestic.total[cityId], delta: domestic.delta[cityId] },
                today: {
                  total: hasCases ? today.total[cityId].cases : 0,
                  delta: hasCases ? today.delta[cityId].cases : 0,
                },
              }}
            ></Row>
          );
        })}
      </Col>
    </>
  );
};

export default Table;
