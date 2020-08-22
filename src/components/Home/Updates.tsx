import styled, { css } from "styled-components";
import React, { useState } from "react";
import UpdateCard from "../UpdateCard";
import { Col, Row } from "../Layout";
import Modal from "../Modal";
import { getCurrentDateTime, sortByDate } from "@utils";
import { palette } from "@styles";
import Report from "@components/Report";

const Wrapper = styled(Col)`
  width: 100%;
  justify-content: stretch;
  padding: 20px 0px;
  /* margin-bottom: 10px; */
`;

const Time = styled(Row)`
  justify-content: center;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 500;
  color: ${palette.grey};
  opacity: 0.8;
`;

const Updates = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Wrapper fadeInUp delay={1}>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={["실시간", " 확진자 정보"]}
        icon={"Notification"}
      >
        {data.map((update, i) => (
          <UpdateCard key={i} data={update}></UpdateCard>
        ))}
      </Modal>
      <Time>{getCurrentDateTime()}</Time>
      <UpdateCard data={data[0]} shadow onClick={() => setShowModal(true)}></UpdateCard>
    </Wrapper>
  );
};

export default Updates;
