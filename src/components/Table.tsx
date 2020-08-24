import styled, { css } from "styled-components";
import React, { FC } from "react";
import Row from "./Row";
import { Col, Row as RowLayout } from "./Layout";
import { theme } from "@styles/themes";

const Th = styled(RowLayout)`
  font-size: 10px;
  transform: translateX(4px);
  color: ${theme("greyText")};
`;

const Header = ({ tdFlex }) => {
  return (
    <RowLayout alignItems="center" mb="12px" mt="30px" px="12px" fadeInUp>
      <Th flex={tdFlex[0]}>지역</Th>
      <Th flex={tdFlex[1]}></Th>
      <Th flex={tdFlex[2]}>총 확진자</Th>
      <Th flex={tdFlex[3]}>오늘</Th>
      <Th flex={tdFlex[4]}></Th>
    </RowLayout>
  );
};

interface Props {
  cityId?: number;
  current?: any;
  overall?: any;
  updates?: any;
  tdFlex?: string[];
}

const Table: FC<Props> = ({ cityId, current, overall, updates, tdFlex }) => {
  const mainData = Object.keys(overall).length == 0 ? current : overall;
  return (
    <>
      <Header tdFlex={tdFlex}></Header>
      <Col fadeInUp delay={6}>
        {Object.keys(mainData).map((id, i) => {
          const latestUpdate = updates.find((update) => {
            let { city, gu } = update;
            if (cityId == null) return city == id;
            if (city == cityId && gu == id) {
              return true;
            }
          });

          return (
            <Row
              tdFlex={tdFlex}
              fadeInUp
              delay={i * 1.5}
              even={i % 2 == 0}
              key={cityId}
              cityId={cityId}
              id={id}
              updateTime={latestUpdate?.datetime}
              data={{
                total: overall[id]?.cases || overall[id],
                current: current[id]?.cases || current[id],
              }}
            ></Row>
          );
        })}
      </Col>
    </>
  );
};

export default Table;
