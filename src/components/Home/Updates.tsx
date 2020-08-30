import styled from "styled-components";
import React, { useState } from "react";

import { UpdateCard } from "@components/UpdateCard";
import { Col, Row } from "@components/Layout";
import { UpdateModal } from "@components/UpdateModal";

import { theme } from "@styles/themes";
import { getCurrentDateTime } from "@utils";
import Icon from "@components/Icon";
import Spinner from "@components/Spinner";

const Wrapper = styled(Col)`
  width: 100%;
  justify-content: stretch;
  padding-bottom: 20px;
  padding-top: 10px;
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
  width: 50px;
  background: ${theme("greyBg")};
  margin-left: 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    fill: ${theme("darkGreyText")};
  }
`;

const Updates = ({ data, mutateData, isLoading }) => {
  const [showModal, setShowModal] = useState(false);
  if (data.length == 0) return <div style={{ height: "30px" }}></div>;
  return (
    <Wrapper fadeInUp>
      <UpdateModal {...{ onClose: () => setShowModal(false), showModal, data }}></UpdateModal>
      <Row>
        <Row flex={1}>
          <UpdateCard
            data={data[0]}
            onClick={() => setShowModal(true)}
            animationData={data.slice(0, 5)}
          ></UpdateCard>
        </Row>
        <RefreshButton onClick={() => (!isLoading ? mutateData() : null)}>
          {isLoading ? (
            <Spinner size={16} color={"darkGreyText"} bg={"greyBg"}></Spinner>
          ) : (
            <Icon name="Refresh" size={24} fadeInUp></Icon>
          )}
        </RefreshButton>
      </Row>
    </Wrapper>
  );
};

export default Updates;
