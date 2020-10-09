import React, { useState } from "react";
import styled from "styled-components";

type Props = {};

const MapToggleButton: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <Wrapper>
      <Toggle>지도</Toggle>
      <Toggle>표</Toggle>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Toggle = styled.div``;

export default MapToggleButton;
