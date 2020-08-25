import styled from "styled-components";
import React, { useState } from "react";

import { UpdateCard } from "@components/UpdateCard";
import { Col, Row } from "@components/Layout";
import { UpdateModal } from "@components/UpdateModal";

import { theme } from "@styles/themes";
import { getCurrentDateTime } from "@utils";
import Icon from "@components/Icon";

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

const RefreshButton = styled(Row)`
  padding-left: 12px;
  padding-right: 12px;
  margin-left: 6px;
  background: ${theme("updateCard")};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${theme("darkGreyText")};
  }
`;

const Updates = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  if (data.length == 0) return <></>;
  return (
    <Wrapper fadeInUp>
      <UpdateModal {...{ onClose: () => setShowModal(false), showModal, data }}></UpdateModal>
      <Time>{getCurrentDateTime()}</Time>
      <Row>
        <UpdateCard
          data={data[0]}
          onClick={() => setShowModal(true)}
          animationData={data.slice(0, 5)}
        ></UpdateCard>
        <RefreshButton>
          <Icon name="Refresh" size={24}></Icon>
        </RefreshButton>
      </Row>
    </Wrapper>
  );
};

export default Updates;
