import React, { useEffect, FC } from "react";
import styled from "styled-components";
import { Col, Absolute, Box } from "./Layout";
import * as ReactDOM from "react-dom";

import Icon, { IconType } from "./Icon/Icon";
import { Row } from "./Layout";
import { theme } from "@styles/themes";
import { media } from "@styles";
import useTheme from "@hooks/useTheme";

const Wrapper = styled(Col)`
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    z-index: 999;
  }
  .container {
    flex: 1;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    /* margin-bottom: 16px; */
  }
  .modal {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    height: 80%;
    padding: 20px 20px;
    background: ${theme("bg")};
    z-index: 1000;
    border-radius: 10px;

    width: 360px;
    ${media.phablet} {
      width: 80%;
    }
  }
  .header {
    display: flex;
    position: relative;
    margin-bottom: 20px;
    align-items: center;
  }
  .title {
    font-size: 14px;
    color: ${theme("blackText")};
  }
`;
interface Props {
  show: boolean;
  onClose: any;
  title: string[];
  hideOverlay?: boolean;
  icon?: IconType;
}

const Portal = ({ children }) => {
  const portal = document.getElementById("root-portal");
  return ReactDOM.createPortal(children, portal as Element);
};

const Modal: FC<Props> = ({ show, children, hideOverlay, onClose, title, icon }) => {
  const _theme = useTheme();
  // useEffect(() => {
  //   document.querySelector("body")!.style.position = show ? "fixed" : "";
  // }, [show]);
  if (!show) return <></>;

  return (
    <Portal>
      <Wrapper>
        {!hideOverlay && <div className="overlay" onClick={onClose}></div>}
        <div className="modal">
          <Row className="header" fadeInUp>
            <div className="back-button" onClick={onClose}>
              <Icon name="ChevronLeft" size={24}></Icon>
            </div>
            <Absolute center className="title">
              {icon && <Icon name={icon} size={14} stroke={_theme("blackText")}></Icon>}
              <Box fontWeight={700} mx="4px">
                {title[0]}
              </Box>
              {title[1]}
            </Absolute>
          </Row>
          <div className="container">{children}</div>
        </div>
      </Wrapper>
    </Portal>
  );
};

export default Modal;
