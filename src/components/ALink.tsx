import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ALink = styled(Link)`
  display: flex;
  flex: 1;
  color: unset;
  text-decoration: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  color: transparent;
`;

export default ALink;
