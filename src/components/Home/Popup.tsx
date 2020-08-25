import React from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import { Col, Box } from "@components/Layout";
import Icon from "@components/Icon";
import Button from "@components/Button";
import { IMPORTANT_MESSAGE } from "@consts";

const Wrapper = styled(Col)`
  p {
    margin-bottom: 30px;
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
        <Icon height="190px" width="300px" name="LogoIcon" transform="translateY(-10px)"></Icon>
        {/* <Box fontWeight={700}>코로나 라이브 이용안내</Box> */}
        <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
        <Button big onClick={onClose}>
          닫기
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default Popup;
