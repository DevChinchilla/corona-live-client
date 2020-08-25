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
  width: 50px;
  background: ${theme("updateCard")};
  margin-left: 6px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${theme("darkGreyText")};
  }
  div:after,
  div:before {
    background: ${theme("updateCard")}!important;
  }
`;

const Updates = ({ data, mutateData, isLoading }) => {
  const [showModal, setShowModal] = useState(false);
  if (data.length == 0) return <></>;
  return (
    <Wrapper fadeInUp>
      <UpdateModal {...{ onClose: () => setShowModal(false), showModal, data }}></UpdateModal>
      <Time>{getCurrentDateTime()}</Time>
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
            <Spinner size={16} color={"darkGreyText"}></Spinner>
          ) : (
            <Icon name="Refresh" size={24} fadeInUp></Icon>
          )}
        </RefreshButton>
      </Row>
    </Wrapper>
  );
};

export default Updates;
