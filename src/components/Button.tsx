import styled, { css } from "styled-components";
import { ifProp } from "@styles/tools";
import { theme } from "@styles/themes";

interface ButtonProps {
  light?: boolean;
  white?: boolean;
  big?: boolean;
  full?: boolean;
  icon?: boolean;
  square?: boolean;
}
const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;

  width: 72px;
  min-height: 32px;

  color: ${theme("darkGreyText")};
  background: ${theme("greyBg")};
  cursor: pointer;

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
      width: 60px;
      svg {
        transition: 0.3s;
        :hover {
          transform: scale(0.9);
        }
      }
    `
  )}

  ${ifProp(
    "square",
    css`
      width: 32px;
      height: 32px;
      padding: 0px;
    `
  )}
`;

export default Button;
