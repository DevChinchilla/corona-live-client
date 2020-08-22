import { css } from "styled-components";
import { addIfProp, CssType, ifProp, prop } from "./tools";
import CSS from "csstype";

interface MarginProps {
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  my?: string;
  mx?: string;
}
const Margin = css`
  ${addIfProp("margin", "m")};
  ${addIfProp("marginTop", "mt")};
  ${addIfProp("marginBottom", "mb")};
  ${addIfProp("marginRight", "mr")};
  ${addIfProp("marginLeft", "ml")};
  ${ifProp(
    "my",
    css`
      margin: ${prop("my")} 0px;
    `
  )}
  ${ifProp(
    "mx",
    css`
      margin: 0px ${prop("mx")};
    `
  )}
`;

interface PaddingProps {
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  py?: string;
  px?: string;
}
const Padding = css`
  ${addIfProp("padding", "p")};
  ${addIfProp("paddingTop", "pt")};
  ${addIfProp("paddingBottom", "pb")};
  ${addIfProp("paddingRight", "pr")};
  ${addIfProp("paddingLeft", "pl")};
  ${ifProp(
    "py",
    css`
      margin: ${prop("my")} 0px;
    `
  )}
  ${ifProp(
    "px",
    css`
      margin: 0px ${prop("mx")};
    `
  )}
`;

const Css = css`
  ${(props) =>
    Object.keys(props)
      .map((key) => addIfProp(key as CssType)(props))
      .join("")}
`;

export interface BoxProps extends PaddingProps, MarginProps, CSS.Properties {
  w?: string;
  h?: string;
  bg?: string;
}
const BoxCss = css`
  ${addIfProp("width", "w")};
  ${addIfProp("height", "h")};
  ${addIfProp("background", "bg")};
  ${Margin};
  ${Padding};
  ${Css};
`;

const AbsoluteCenter = css`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const AbsoluteFull = css`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const FlexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mixins = {
  BoxCss,
  AbsoluteCenter,
  AbsoluteFull,
  FlexCenter,
};

export default mixins;
