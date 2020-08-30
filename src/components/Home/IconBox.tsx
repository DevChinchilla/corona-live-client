import { theme } from "@styles/themes";
import { ifProps, ifProp } from "@styles/tools";
import styled, { css } from "styled-components";

export const IconBox = styled.a<{ type: string; kakaoPay?: boolean }>`
  background: ${(props) => theme(props.type as any)}30;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  margin: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    fill: ${(props) => theme(props.type as any)};
  }
  ${ifProps(
    { type: "kakao" },
    css`
      background: ${theme("kakaoBg")};
    `
  )}
  ${ifProp(
    "kakaoPay",
    css`
      width: auto !important;
      background: transparent;
      border: 1px solid ${theme("darkGreyText")}80;
      svg {
        fill: ${theme("darkGreyText")};
      }
    `
  )}
`;
