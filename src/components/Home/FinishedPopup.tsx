import React, { useState } from "react";
import Modal from "@components/Modal";
import { Row, Col } from "@components/Layout";

type Props = {};

const FinishedPopup: React.FC<Props> = () => {
  const currentHours = new Date().getHours();
  const [showModal, setShowModal] = useState(true);
  if (currentHours >= 23 || currentHours < 9)
    return (
      <Modal show={showModal} dynamic title="30일 집계 마감" onClose={() => setShowModal(false)}>
        <Row center mb="16px" fontSize="14px">
          집계 시간 09시-23시
        </Row>
        <Col ai="center" fontSize="13px" opacity="0.8">
          *본사이트에서 제공하는 오늘 확진자수는 다음날 제공하는 질본 수치와 오차가 발생할수
          있습니다
          <br></br>
          <br></br>
          *본사이트에서 제공하는 정보 사용/공유로 인해 발생된 문제의 책임은 전적으로 사용자에게
          있습니다.
        </Col>
      </Modal>
    );
  return <></>;
};

export default FinishedPopup;
