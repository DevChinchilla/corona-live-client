import styled, { css } from "styled-components";
import { switchProp, prop, ifProp } from "styled-tools";
import React from "react";
import Row from "./Row";
import { Col } from "./Layout";

const Wrapper = styled(Col)`
  margin-top: 30px;
`;
const Table = ({ today, overall: { domestic, date } }) => {
  return (
    <Wrapper>
      {Object.keys(domestic.total).map((cityId) => {
        const hasCases = today.total[cityId] != null;
        return (
          <Row
            key={cityId}
            cityId={cityId}
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
