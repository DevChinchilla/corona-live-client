import React, { Props } from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";
import Button from "@components/Button";

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
const IMPORTANT_MESSAGE = `서버 폭주로 인해 업데이트가 지연된점 죄송합니다<br></br> 현재 웹서버를 긴급 증설하여 문제를 해결하였습니다<br></br> 
감사합니다 `;

const Announcement = ({ show, onClose }) => {
  return (
    <Modal show={show} noHeader style={{ height: "initial" }}>
      <Wrapper fadeInUp ai="center">
        <Icon height="170px" width="280px" name="LogoIcon" transform="translateY(-10px)"></Icon>
        <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
      </Wrapper>
      <Row h="20px"></Row>
      <Button big onClick={onClose}>
        닫기
      </Button>
    </Modal>
  );
};

export default Announcement;
