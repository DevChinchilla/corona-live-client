import React, { useEffect, FC } from "react";
import styled from "styled-components";
import * as ReactDOM from "react-dom";

import Icon, { IconType } from "@components/Icon/Icon";
import { Row, Box, Flex, Col } from "@components/Layout";
import Underline from "@components/Underline";

import { theme } from "@styles/themes";
import { media } from "@styles";
import { useTheme } from "@hooks/useTheme";
import Overlay from "./Overlay";

const Children = styled.div`
  flex: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const ModalContainer = styled(Col)`
  position: fixed;
  left: 50%;
  box-sizing: border-box;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  height: 80%;
  padding: 20px 20px;
  background: ${theme("bg")};
  z-index: 1000;
  border-radius: 10px;
  overflow-x: hidden;
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

interface Props {
  show: boolean;
  noHeader?: boolean;
  onClose?: any;
  title?: string;
  hideOverlay?: boolean;
  onActionClick?: any;
  style?: any;
  actionIcon?: any;
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
  ...props
}) => {
  const _theme = useTheme();
  if (!show) return <></>;
  const portal = document.getElementById("root-portal");
  const component = (
    <>
      {!hideOverlay && <Overlay onClick={onClose}></Overlay>}
      <ModalContainer {...props}>
        {!noHeader && (
          <Header fadeInUp>
            <Icon
              name="ChevronLeft"
              size={24}
              stroke={_theme("darkGreyText")}
              onClick={onClose}
            ></Icon>
            <Underline fontSize="14px" fontWeight={900} lineHeight="6px">
              {title}
            </Underline>
            {actionIcon ? (
              <Icon
                name={actionIcon[0]}
                size={actionIcon[1]}
                fill={_theme("darkGreyText")}
                onClick={onActionClick}
              ></Icon>
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
