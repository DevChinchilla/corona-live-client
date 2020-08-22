// import { Flex } from "reflexbox/styled-components";
import styled, { css } from "styled-components";
import React, { FC } from "react";
import Chevrons from "./Chevrons";
import Arrows from "./Arrows";
import Check from "./Check";
import Plus from "./Plus";
import X from "./X";
import Refresh from "./Refresh";
import Notification from "./Notification";

import { Row } from "@components/Layout";
import { ifProp, prop, addIfProp } from "@styles/tools";
import { BoxProps } from "@styles/mixins";

const icons = {
  ...Arrows,
  ...Chevrons,
  Check,
  Plus,
  X,
  Refresh,
  Notification,
};

export type IconType = keyof typeof icons;

interface IconProps extends BoxProps {
  name: IconType;
  stroke?: string;
  fill?: string;
  hoverFill?: string;
  hoverStroke?: string;
  strokeWidth?: string;
  size?: number;
}

const SIcon: any = styled(Row)`
  position: relative;
  ${ifProp(
    "size",
    css`
      height: ${prop("size")}px;
      width: ${prop("size")}px;
    `
  )}

  svg {
    transition: all 0.2s ease-out;
    width: 100%;
    height: 100%;

    ${addIfProp("fill")};
    ${addIfProp("stroke")};
    ${addIfProp("strokeWidth")};

    :hover {
      ${addIfProp("fill", "hoverFill")};
      ${addIfProp("stroke", "hoverStroke")};
    }
  }
`;

const Icon: FC<IconProps> = ({ name, ...rest }) => (
  <SIcon className="custom-icon" {...rest}>
    {React.createElement(icons[name])}
  </SIcon>
);

Icon.defaultProps = {
  size: 16,
  alignItems: "center",
  justifyContent: "center",
};

export default Icon;
