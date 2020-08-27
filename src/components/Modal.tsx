import React, { useEffect, FC } from "react";
import styled, { css } from "styled-components";
import * as ReactDOM from "react-dom";

import Icon, { IconType } from "@components/Icon/Icon";
import { Row, Box, Flex, Col } from "@components/Layout";
import Underline from "@components/Underline";

import { theme } from "@styles/themes";
import { media } from "@styles";
import { useTheme } from "@hooks/useTheme";
import Overlay from "./Overlay";
import Button from "./Button";
import { ifProp } from "@styles/tools";

const Children = styled.div`
  flex: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const ModalContainer = styled(Col)<{ fixedHeight?: boolean }>`
  position: fixed;
  left: 50%;
  box-sizing: border-box;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  max-height: 80%;
  ${ifProp(
    "fixedHeight",
    css`
      height: 80%;
    `
  )}
  padding: 20px 20px;
  background: ${theme("bg")};
  z-index: 1000;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 360px;
  ${media.phablet} {
    width: 85%;
  }
`;

const Header = styled(Row)`
  display: flex;
  position: relative;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(Row)`
  background: ${theme("greyBg")};
  padding: 0px 10px;
`;

interface Props {
  show: boolean;
  noHeader?: boolean;
  onClose?: any;
  title?: string;
  hideOverlay?: boolean;
  onActionClick?: any;
  style?: any;
  actionIcon?: any;
  dynamic?: boolean;
}

const Modal: FC<Props> = ({
  show,
  children,
  hideOverlay,
  onClose,
  title,
  onActionClick,
  actionIcon,
  noHeader,
  dynamic,
  ...props
}) => {
  const _theme = useTheme();
  if (!show) return <></>;
  const portal = document.getElementById("root-portal");
  const component = (
    <>
      {!hideOverlay && <Overlay onClick={onClose}></Overlay>}
      <ModalContainer {...props} fixedHeight={!dynamic}>
        {!noHeader && (
          <Header fadeInUp>
            <Button icon square onClick={onClose}>
              <Icon name="ChevronLeft" size={24} stroke={_theme("darkGreyText")}></Icon>
            </Button>
            <Title fontSize="14px" fontWeight={700}>
              {title}
            </Title>
            {actionIcon ? (
              <Button icon square onClick={onActionClick}>
                <Icon
                  name={actionIcon[0]}
                  size={actionIcon[1]}
                  fill={_theme("darkGreyText")}
                ></Icon>
              </Button>
            ) : (
              <Row width="24px"></Row>
            )}
          </Header>
        )}

        <Children>{children}</Children>
      </ModalContainer>
    </>
  );

  return ReactDOM.createPortal(component, portal as Element);
};

export default Modal;
