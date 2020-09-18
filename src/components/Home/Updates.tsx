import styled from "styled-components";
import React, { FC, useEffect, useState } from "react";

import { UpdateCard } from "@components/UpdateCard";
import { Col, Row } from "@components/Layout";
import UpdateModal from "@components/UpdateModal";

import { theme } from "@styles/themes";
import { getCurrentDateTime } from "@utils";
import Icon from "@components/Icon";
import Spinner from "@components/Spinner";
import { CasesSummaryType, UpdateType } from "@types";
import CasesSummary from "./CasesSummary";

const Wrapper = styled(Col)`
  width: 100%;
  justify-content: stretch;
  padding-bottom: 20px;
  padding-top: 10px;
`;

const Time = styled(Col)`
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 6px;
  font-size: 11px;
  font-weight: 500;
  color: ${theme("darkGreyText")};
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

interface Props {
  data: UpdateType[];
  mutateData: any;
  isLoading: boolean;
  showUpdates: boolean;
  setShowUpdates: any;
  cityId?: string;
}
const Updates: FC<Props> = ({
  data,
  mutateData,
  isLoading,
  showUpdates,
  setShowUpdates,
  cityId,
}) => {
  if (data.length == 0) return <div style={{ height: "30px" }}></div>;
  const [updatesData, setUpdatesData] = useState<UpdateType[]>([]);

  useEffect(() => {
    if (cityId != null) {
      setUpdatesData(data.filter((a) => a.city == cityId));
    } else {
      setUpdatesData(data);
    }
  }, [data]);

  if (updatesData.length == 0) return <Row h="10px"></Row>;

  return (
    <Wrapper fadeInUp>
      <UpdateModal
        isDistrict={cityId != null}
        {...{ onClose: () => setShowUpdates(false), showUpdates, data: updatesData }}
      ></UpdateModal>
      <Time>{getCurrentDateTime()}</Time>
      <CasesSummary updates={updatesData}></CasesSummary>

      <Row>
        {updatesData.length > 0 && (
          <Row flex={1}>
            <UpdateCard
              data={updatesData[0]}
              onClick={() => setShowUpdates(true)}
              animationData={updatesData.slice(0, 5)}
            ></UpdateCard>
          </Row>
        )}
        {cityId == null && (
          <RefreshButton onClick={() => (!isLoading ? mutateData() : null)}>
            {isLoading ? (
              <Spinner size={16} color={"darkGreyText"} bg={"greyBg"}></Spinner>
            ) : (
              <Icon name="Refresh" size={24} fadeInUp></Icon>
            )}
          </RefreshButton>
        )}
      </Row>
    </Wrapper>
  );
};

export default Updates;
