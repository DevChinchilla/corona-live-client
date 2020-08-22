import styled, { css } from "styled-components";
import React, { useState } from "react";
import UpdateCard from "../UpdateCard";
import { Col, Row } from "../Layout";
import Modal from "../Modal";
import { getCurrentDateTime } from "@utils";
import { palette } from "@styles";

const Wrapper = styled(Col)`
  width: 100%;
  justify-content: stretch;
  padding: 20px 0px;
  /* margin-bottom: 10px; */
`;

const Time = styled(Row)`
  justify-content: center;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${palette.grey};
`;

const Updates = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Wrapper>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={"실시간 확진자 정보"}
        icon={"Notification"}
      >
        {Array(50)
          .fill(0)
          .map((i) => (
            <UpdateCard key={i}></UpdateCard>
          ))}
      </Modal>
      <Time>{getCurrentDateTime()}</Time>
      <UpdateCard shadow onClick={() => setShowModal(true)}></UpdateCard>
    </Wrapper>
  );
};

export default Updates;
