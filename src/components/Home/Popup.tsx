import React from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { IMPORTANT_MESSAGE } from "@consts";

const Wrapper = styled(Col)`
  overflow-y: auto;
  overflow-x: hidden;
  p {
    margin-bottom: 10px;
    line-height: 24px;
    font-size: 12px;
    font-weight: 300;
    word-break: keep-all;
    text-align: center;

    strong {
      font-weight: 500;
    }
    span {
      font-size: 10px;
      opacity: 0.6;
    }
    br {
      content: "";
      display: block;
      margin-top: 12px;
    }
  }
`;

const Popup = ({ show, onClose }) => {
  return (
    <Modal show={show} noHeader style={{ height: "initial" }}>
      <Wrapper fadeInUp ai="center">
        <Row bg="#1a1f2c" borderRadius="10px">
          <Icon height="150px" width="150px" name="LogoIcon" transform="translateY(-10px)"></Icon>
        </Row>
        <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
      </Wrapper>
      <Row h="20px"></Row>
      <Button big onClick={onClose}>
        닫기
      </Button>
    </Modal>
  );
};

export default Popup;
