import styled, { css } from "styled-components";
import { switchProp, prop, ifProp } from "styled-tools";
import React from "react";
import Row from "./Row";
import { Col } from "./Layout";

const Wrapper = styled(Col)`
  margin-top: 30px;
`;

const Table = ({ today, overall: { domestic, date }, updates }) => {
  return (
    <Wrapper fadeInUp delay={6}>
      {Object.keys(domestic.total).map((cityId, i) => {
        const hasCases = today.total[cityId] != null;
        const latestUpdate = updates.find((update) => {
          let { city, gu } = update;
          return city == cityId;
        });

        return (
          <Row
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
    </Wrapper>
  );
};

export default Table;
