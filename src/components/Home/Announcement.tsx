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
const IMPORTANT_MESSAGE = `오늘 아침에 추가한 광주 확진자 7명이 어제 집계되었던것으로 파악되서 수정했습니다. 혼란을 잃으킨점 죄송합니다 <br></br>더 정확한 정보를 위해 현재 오늘 누락된 확진자들을 찾고 있으니 시간이 걸려도 양해 부탁드리겠습니다.<br></br> 제보 많이 부탁드리겠습니다 감사합니다
 `;

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
