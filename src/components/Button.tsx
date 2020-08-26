import styled, { css } from "styled-components";
import { ifProp } from "@styles/tools";
import { theme } from "@styles/themes";

interface ButtonProps {
  light?: boolean;
  white?: boolean;
  big?: boolean;
  full?: boolean;
  icon?: boolean;
}
const Button = styled.button<ButtonProps>`
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:bold;
  outline: none;
  border:none;
  border-radius:6px;
  font-size:12px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;

  width: 72px;
  height:32px;

  color:${theme("darkGreyText")};
  background: ${theme("greyBg")};
  cursor:pointer;

  ${ifProp(
    "light",
    css`
      border: 1px solid ${theme("semigreyText")};
      /* background: ${theme("bg")}; */
      background: transparent;
    `
  )}

${ifProp(
  "white",
  css`
    background: transparent;
  `
)}

  ${ifProp(
    "big",
    css`
      height: 40px;
      width: 100%;
      font-size: 14px;
    `
  )}

  ${ifProp(
    "full",
    css`
      width: 100%;
    `
  )}

${ifProp(
  "icon",
  css`
    padding: 0px 10px;
    width: 60px;
  `
)}
`;

export default Button;
