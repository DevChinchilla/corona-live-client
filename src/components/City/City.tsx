import React, { Suspense } from "react";
import { useLocation, useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Col, Row, Box } from "@components/Layout";
import { media } from "@styles";
import useSWR from "swr";
import { API_ROOT, DISTRICT_TD_FLEX } from "@consts";
import { fetcher, sortByDate } from "@utils";
import Table from "@components/Table";
import Board from "@components/Home/Board";
import Icon from "@components/Icon";
import Button from "@components/Button";
import useTheme from "@hooks/useTheme";
import { theme } from "@styles/themes";
import useScrollTop from "@hooks/useScrollTop";

const Wrapper = styled(Col)`
  box-sizing: border-box;
  padding: 20px;
  margin: auto;
  width: 400px;
  ${media.phablet} {
    width: 100%;
  }
`;

const Title = styled.div`
  position: relative;
  font-weight: 900;
  font-size: 18px;
  &:after {
    content: "";
    position: absolute;
    left: 2px;
    bottom: 0px;
    width: 110%;
    height: 8px;
    background: ${theme("lightGreyText")};
    z-index: -1;
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
      <Row jc="space-between" ai="center" mb="20px" mt="0px">
        <Button onClick={() => history.push("/")} white>
          <Icon name="ChevronLeft" stroke={_theme("darkGreyText")} size={20}></Icon>
        </Button>
        <Title>{t(`c${cityId}`)}</Title>
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
    </Wrapper>
  );
};

export default City;
