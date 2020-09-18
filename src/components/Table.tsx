import React, { FC } from "react";
import styled, { css } from "styled-components";

import Row from "@components/Row";
import { Col, Row as RowLayout } from "@components/Layout";

import { theme } from "@styles/themes";
import { CurrentType, OverallType, UpdateType, CasesType } from "@types";

const Th = styled(RowLayout)`
  font-size: 10px;
  transform: translateX(4px);
  color: ${theme("greyText")};
`;

const Header = ({ tdFlex }) => {
  return (
    <RowLayout alignItems="center" mb="12px" mt="20px" px="12px" fadeInUp>
      <Th flex={tdFlex[0]}>지역</Th>
      <Th flex={tdFlex[1]}></Th>
      <Th flex={tdFlex[2]}>총 확진자</Th>
      <Th flex={tdFlex[3]}>오늘</Th>
      <Th flex={tdFlex[4]}></Th>
    </RowLayout>
  );
};

interface Props {
  cityId?: string | number;
  current: CurrentType | { [guId: number]: CasesType };
  overall: OverallType | { [guId: number]: CasesType };
  updates: UpdateType[];
  tdFlex: string[];
}

const Table: FC<Props> = ({ cityId, current, overall, updates, tdFlex }) => {
  const getUpdateTime = (id) => {
    let date = updates.find((update) => {
      let { city, gu } = update;
      if (cityId == null) return city == id;
      if (city == cityId && gu == id) {
        return true;
      }
    })?.datetime as string;
    return new Date(date).getTime() || 0;
  };

  const sortByCurrent = (a, b) => {
    if (cityId) return current[b][0] - current[a][0];
    return current[b].cases[0] - current[a].cases[0];
  };

  const sortByUpdateTime = (a, b) => {
    return (getUpdateTime(b) || 0) - (getUpdateTime(a) || 0);
  };

  return (
    <>
      <Header tdFlex={tdFlex}></Header>
      <Col fadeInUp delay={6}>
        {Object.keys(current)
          .sort(sortByUpdateTime)
          .sort(sortByCurrent)
          .map((id, i) => {
            const latestUpdate = updates.find((update) => {
              let { city, gu } = update;
              if (cityId == null) return city == id;
              if (city == cityId && gu == id) {
                return true;
              }
            });

            return (
              <Row
                updates={updates.filter(({ city, gu }) => city == cityId && gu == id)}
                tdFlex={tdFlex}
                fadeInUp
                delay={i * 1.5}
                even={i % 2 == 0}
                cityId={cityId}
                id={id}
                updateTime={latestUpdate?.datetime}
                data={{
                  total: overall[id]?.cases || overall[id],
                  current: current[id]?.cases || current[id],
                }}
                key={`${cityId}/${id}`}
              ></Row>
            );
          })}
      </Col>
    </>
  );
};

export default Table;
