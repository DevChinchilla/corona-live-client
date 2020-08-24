import styled from "styled-components";
import React, { useState } from "react";
import { UpdateCard } from "../UpdateCard";
import { Col } from "../Layout";
import { getCurrentDateTime } from "@utils";
import { theme } from "@styles/themes";
import { UpdateModal } from "@components/UpdateModal";

const Wrapper = styled(Col)`
  width: 100%;
  justify-content: stretch;
  padding: 20px 0px;
`;

const Time = styled(Col)`
  justify-content: center;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 500;
  color: ${theme("greyText")};
  opacity: 0.8;
  text-align: center;
`;

const Updates = ({ data }) => {
  const [showModal, setShowModal] = useState(true);

  if (data.length == 0) return <></>;
  return (
    <Wrapper fadeInUp>
      <UpdateModal {...{ onClose: () => setShowModal(false), showModal, data }}></UpdateModal>
      <Time>{getCurrentDateTime()}</Time>
      <UpdateCard
        data={data[0]}
        onClick={() => setShowModal(true)}
        animationData={data.slice(0, 5)}
      ></UpdateCard>
    </Wrapper>
  );
};

export default Updates;
