import React from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import { Col, Box } from "@components/Layout";
import Icon from "@components/Icon";
import Button from "@components/Button";

const Wrapper = styled(Col)`
  p {
    margin-bottom: 30px;
    line-height: 24px;
    font-size: 12px;
    font-weight: 300;
    strong {
      font-weight: 700;
    }
  }
`;

const Popup = ({ show, onClose }) => {
  return (
    <Modal show={show} noHeader style={{ height: "initial" }}>
      <Wrapper fadeInUp ai="center">
        <Icon height="190px" width="300px" name="LogoIcon" transform="translateY(-10px)"></Icon>
        {/* <Box fontWeight={700}>코로나 라이브 이용안내</Box> */}
        <p>
          코로나 라이브는 <strong>재난문자와 각 지자체에서 제공하는 자료, 언론 기사등을</strong>{" "}
          토대로 당일 코로나 확진 환자를 업데이트를 하고있으나, 민간이 취합한 집계이므로 공식적인
          근거 자료 활용될수 없고, 다음날 제공하는 질본 수치와{" "}
          <strong> 오차가 발생할수 있습니다.</strong>
          <br></br> <br></br>본 사이트 정보 공유로 인해 발생된 문제에 코로나 라이브는{" "}
          <strong> 어떠한 책임도 지지 않습니다.</strong> 본사이트에 나온 정보 사용에 대한 책임은
          전적으로 사용자에게 있습니다.
        </p>
        <Button big onClick={onClose}>
          닫기
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default Popup;
