import React, { Suspense } from "react";
import { useLocation, useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Col } from "@components/Layout";
import { media } from "@styles";
import useSWR from "swr";
import { API_ROOT, DISTRICT_TD_FLEX } from "@consts";
import { fetcher, sortByDate } from "@utils";
import Table from "@components/Table";

const Wrapper = styled(Col)`
  box-sizing: border-box;
  padding: 20px;
  margin: auto;
  width: 400px;
  ${media.phablet} {
    width: 100%;
  }
`;

const City = ({ match }) => {
  const { t } = useTranslation();

  const cityId = match.params.cityId;
  const guId = match.params.guId;

  const location = useLocation();
  const history = useHistory();

  const { data: updatesData } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 10000,
  });

  const { data: statsData } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 10000,
  });
  console.log({ cityId, guId });
  return (
    <Wrapper>
      <div onClick={() => history.push("/")}>뒤로</div>
      <h1>{t(`c${cityId}`)}</h1>
      {statsData && updatesData && (
        <Suspense fallback={<div />}>
          <Table
            cityId={cityId}
            current={statsData.current[cityId].gu}
            overall={statsData.overall[cityId].gu}
            tdFlex={DISTRICT_TD_FLEX}
            updates={sortByDate(updatesData)}
          ></Table>
        </Suspense>
      )}
    </Wrapper>
  );
};

export default City;
