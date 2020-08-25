import React, { Suspense } from "react";
import { useLocation, useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useSWR from "swr";

import { Col, Row, Box } from "@components/Layout";
import Table from "@components/Table";
import Board from "@components/Home/Board";
import Icon from "@components/Icon";
import Button from "@components/Button";
import Underline from "@components/Underline";
import Footer from "@components/Footer";

import { media } from "@styles";
import { API_ROOT, DISTRICT_TD_FLEX } from "@consts";
import { fetcher, sortByDate } from "@utils";
import { useTheme } from "@hooks/useTheme";
import { useScrollTop } from "@hooks/useScrollTop";

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
  useScrollTop();
  const { t } = useTranslation();

  const cityId = match.params.cityId;
  const guId = match.params.guId;

  const location = useLocation();
  const history = useHistory();
  const _theme = useTheme();

  const { data: updatesData } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 10000,
  });

  const { data: statsData } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 10000,
  });

  const confirmed = {};
  const current = {};
  return (
    <Wrapper>
      <Row jc="space-between" ai="center" mb="20px" mt="0px" fadeInUp>
        <Button onClick={() => history.push("/")} white>
          <Icon name="ChevronLeft" stroke={_theme("darkGreyText")} size={20}></Icon>
        </Button>
        <Underline fontSize="18px " fontWeight={900}>
          {t(`c${cityId}`)}
        </Underline>
        <Button white>
          <Icon name="Refresh" size={12} fill={_theme("darkGreyText")}></Icon>
        </Button>
      </Row>
      {statsData && (
        <Board
          data={{
            confirmed: statsData.overall[cityId].cases,
            current: statsData.current[cityId].cases,
          }}
        ></Board>
      )}
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
      {statsData && updatesData && <Footer></Footer>}
    </Wrapper>
  );
};

export default City;
