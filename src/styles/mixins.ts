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
  onClick?: any;
  className?: string;
  w?: string;
  h?: string;
  bg?: string;
  fadeInDown?: boolean;
  fadeInUp?: boolean;
  delay?: number;
}
const BoxCss = css`
  ${addIfProp("width", "w")};
  ${addIfProp("height", "h")};
  ${addIfProp("background", "bg")};
  ${ifProp(
    "fadeInUp",
    css`
      animation-duration: 0.45s;
      animation-fill-mode: both;
      animation-name: fadeInUp;
    `
  )}
   ${ifProp(
     "fadeInDown",
     css`
       animation-duration: 0.45s;
       animation-fill-mode: both;
       animation-name: fadeOutDown;
     `
   )}
    ${ifProp(
      "delay",
      css`
        animation-delay: ${(props) => props["delay"] * 100}ms;
      `
    )}
  ${Margin};
  ${Padding};
  ${Css};
`;

const AbsoluteCenter = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const AbsoluteFull = css`
  position: absolute;
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
