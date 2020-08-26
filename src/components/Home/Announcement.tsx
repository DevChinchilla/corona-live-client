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
const IMPORTANT_MESSAGE = `광주 32명 집단 감염은 아직 공식적인 보도자료나 광주 블로그를 통해 공개를 안 했기 때문에 현재로서는 반영하기 어렵다는 점 알려드립니다. 내일 발표되는 질병관리본부 수치와 발생하는 오차를 최대한 방지하여 사용자분들께 혼란을 주지 않는 선에서 정보를 제공하는 것이 목적이기 때문에, 양해 부탁드리겠습니다<br></br> 공식적인 발표가 나오면 제보 부탁드리겠습니다  `;

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
