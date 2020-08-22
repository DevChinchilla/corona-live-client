import styled, { css, ThemedStyledFunction } from "styled-components";

import mixins, { BoxProps } from "@styles/mixins";
import { addIfProp, ifProp } from "@styles/tools";
import React, { FC } from "react";

const SBox = styled.div`
  ${mixins.BoxCss};
`;
export const Box: FC<BoxProps> = (props: any) => <SBox {...props}></SBox>;

interface FlexProps extends BoxProps {
  ai?: string;
  jc?: string;
  center?: boolean;
}
const SFlex = styled(Box)`
  display: flex;
  ${addIfProp("alignItems", "ai")};
  ${addIfProp("justifyContent", "jc")};
  ${ifProp("center", mixins.FlexCenter)}
`;
export const Flex: FC<FlexProps> = (props) => <SFlex {...props}></SFlex>;

const SRow = styled(Flex)`
  display: flex;
  flex-direction: row;
`;
export const Row: FC<FlexProps> = (props) => <SRow {...props}></SRow>;

const SCol = styled(Flex)`
  display: flex;
  flex-direction: column;
`;
export const Col: FC<FlexProps> = (props) => <SCol {...props}></SCol>;

interface AbsoluteProps extends BoxProps {
  center?: boolean;
  full?: boolean;
}
const SAbsolute = styled(Flex)`
  position: absolute;
  ${ifProp("center", mixins.AbsoluteCenter)}
  ${ifProp("full", mixins.AbsoluteFull)}
`;
export const Absolute: FC<AbsoluteProps> = (props) => <SAbsolute {...props}></SAbsolute>;
