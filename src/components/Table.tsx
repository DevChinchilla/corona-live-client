import styled, { css } from "styled-components";
import { switchProp, prop, ifProp } from "styled-tools";
import React from "react";
import Row from "./Row";
import { Col } from "./Layout";

const Wrapper = styled(Col)`
  margin-top: 30px;
`;
const Table = ({ data }) => {
  return (
    <Wrapper>
      {[...Array(10).keys()].map((i) => (
        <Row
          key={i}
          data={{ total: { total: 1000, delta: 60 }, today: { total: 60, delta: 5 } }}
        ></Row>
      ))}
    </Wrapper>
  );
};

export default Table;
