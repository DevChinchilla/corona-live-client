import React, { useState } from "react";
import Modal from "@components/Modal";
import { Row, Col } from "@components/Layout";
import SocialMedia from "./SocialMedia";

type Props = {};

const FinishedPopup: React.FC<Props> = () => {
  const currentHours = new Date().getHours();
  const [showModal, setShowModal] = useState(true);
  if (currentHours >= 23 || currentHours < 9)
    return (
      <Modal
        show={showModal}
        dynamic
        title="집계 시간: 09시~23시"
        onClose={() => setShowModal(false)}
      >
        <Row center mb="16px" fontSize="12px" opacity="0.6">
          지난 집계는 모두 SNS를 통해 확인 하실 수 있습니다
        </Row>
        <SocialMedia hideTitle></SocialMedia>
        <Col ai="center" fontSize="12px" opacity="0.5" textAlign="center">
          코로나 라이브에서 제공하는 수치는 질본 수치와 오차가 발생할 수 있고, 본 사이트에서
          제공하는 정보 사용/공유로 인해 발생한 문제의 책임은 전적으로 사용자에게 있습니다
        </Col>
      </Modal>
    );
  return <></>;
};

export default FinishedPopup;
