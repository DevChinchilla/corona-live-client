import styled from "styled-components";
import React, { useEffect, FC } from "react";
import { Col, Absolute, Box } from "./Layout";
import Icon, { IconType } from "./Icon/Icon";
import { Row } from "./Layout";
import { theme } from "@styles/themes";

const Wrapper = styled(Col)`
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
    z-index: 999;
  }
  .container {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 16px;
  }
  .modal {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    max-height: 80%;
    padding: 30px 20px;
    background: ${theme("bg")};
    z-index: 1000;
    border-radius: 10px;
  }
  .header {
    display: flex;
    position: relative;
    margin-bottom: 20px;
    align-items: center;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    /* margin-left: 10px; */
  }
`;
interface Props {
  show: boolean;
  onClose: any;
  title: string;
  hideOverlay?: boolean;
  icon?: IconType;
}
const Modal: FC<Props> = ({ show, children, hideOverlay, onClose, title, icon }) => {
  useEffect(() => {
    document.querySelector("body")!.style.position = show ? "fixed" : "";
  }, [show]);
  if (!show) return <></>;

  return (
    <Wrapper>
      {!hideOverlay && <div className="overlay" onClick={onClose}></div>}
      <div className="modal">
        <Row className="header">
          <div className="back-button" onClick={onClose}>
            <Icon name="ChevronLeft" size={24}></Icon>
          </div>
          <Absolute center className="title">
            {icon && <Icon name={icon}></Icon>}
            <Box w="8px"></Box>
            {title}
          </Absolute>
        </Row>
        <div className="container">{children}</div>
      </div>
    </Wrapper>
  );
};

export default Modal;
