import styled from "styled-components";
import React, { FC, useEffect, useState } from "react";

import { UpdateCard } from "@components/UpdateCard";
import { Col, Row } from "@components/Layout";
import UpdateModal from "@components/UpdateModal";

import { theme } from "@styles/themes";
import { getCurrentDateTime } from "@utils";
import Icon from "@components/Icon";
import Spinner from "@components/Spinner";
import { UpdateType } from "@types";
import { Link, useHistory } from "react-router-dom";

const Wrapper = styled(Col)`
  width: 100%;
  justify-content: stretch;
  /* padding-bottom: 8px; */
  padding-top: 10px;
`;

const Time = styled(Col)`
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 6px;
  font-size: 11px;
  font-weight: 500;
  color: ${theme("darkGreyText")};
  opacity: 0.5;
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
  const history = useHistory();
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
        {...{
          onClose: () => {
            if (cityId == null) {
              history.push({ pathname: "/", state: "live" });
            } else {
              setShowUpdates(false);
            }
          },
          showUpdates,
          data: updatesData,
          cityId,
        }}
      ></UpdateModal>
      <Time>{getCurrentDateTime()}</Time>

      <Row mb="14px">
        {updatesData.length > 0 && (
          <Link
            to={cityId == null ? "/live" : null}
            style={{ display: "flex", flex: 1, color: "unset" }}
          >
            <Row flex={1}>
              <UpdateCard
                data={updatesData[0]}
                onClick={() => cityId != null && setShowUpdates(true)}
                animationData={updatesData.slice(0, 5)}
              ></UpdateCard>
            </Row>
          </Link>
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
      {/* <CasesSummary updates={updatesData}></CasesSummary> */}
    </Wrapper>
  );
};

export default Updates;
