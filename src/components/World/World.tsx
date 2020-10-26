import DeltaTag from "@components/DeltaTag";
import Icon from "@components/Icon";
import { Col, Row } from "@components/Layout";
import { API, COUNTRY_CODES, COUNTRY_NAMES, SECOND } from "@consts";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { fetcher, numberWithCommas, sortByDate } from "@utils";
import React from "react";
import styled, { css } from "styled-components";
import useSWR from "swr";

const Wrapper = styled.div``;
const CountryRow = styled(Row)<{ even: boolean }>`
  align-items: center;
  border-radius: 6px;
  height: 52px;
  padding: 0px 12px;
  margin-bottom: 2px;
  position: relative;
  cursor: pointer;
  ${ifProp(
    "even",
    css`
      background: ${theme("greyBg")};
    `
  )}
  img {
    width: 20px;
    border-radius: 2px;
  }
`;

const CountryName = styled(Row)`
  font-size: 13px;
  margin-left: 8px;
`;

const CountryRank = styled(Row)`
  font-weight: bold;
  font-size: 10px;
  flex-basis: 26px;
`;

type Props = {};

console.log(COUNTRY_CODES);

const World: React.FC<Props> = ({}) => {
  const { data: statsData } = useSWR(API.worldStats, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshInterval: SECOND * 30,
    onSuccess: (newLastUpdated) => {},
  });

  const { data: updatesData } = useSWR(API.worldUpdates, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshInterval: SECOND * 30,
    onSuccess: (newLastUpdated) => {},
  });

  if (!statsData) return <></>;

  const { total, delta } = statsData["World"];

  return (
    <Wrapper>
      {/* <Col maxHeight="300px" overflowY="scroll">
        {sortByDate(updatesData, "time").map((update) => {
          const { source, country, time, cases } = update;
          return <Row>{`${COUNTRY_NAMES[country]} ${cases}명`}</Row>;
        })}
      </Col> */}
      <Col ai="center" jc="center" my="20px">
        <Row fontSize="12px" opacity="0.7">
          총 확진자
        </Row>
        <Row fontSize="24px" fontWeight={700}>
          {numberWithCommas(total)}
        </Row>
        <DeltaTag delta={delta} showBg={false} color={"red"}></DeltaTag>
      </Col>
      <Col>
        {Object.keys(statsData)
          .sort((a, b) => statsData[b].total - statsData[a].total)
          .slice(1)
          .map((code, i) => {
            if (!COUNTRY_NAMES[code]) console.log(code);
            const { total, delta } = statsData[code];
            return (
              <CountryRow even={i % 2 == 0}>
                <CountryRank>
                  <div>{i + 1}</div>
                </CountryRank>
                <img src={`/flags/${code.toLowerCase()}.svg`}></img>
                <CountryName>{COUNTRY_NAMES[code]}</CountryName>
                <Col ai="flex-end" flex={1} jc="center" mr="12px">
                  <Row fontSize="13px">{numberWithCommas(total)}</Row>
                  <DeltaTag delta={delta} color={"red"} small showBg={true}></DeltaTag>
                </Col>
                <Icon name="ChevronRight" size={36}></Icon>
              </CountryRow>
            );
          })}
      </Col>
    </Wrapper>
  );
};

export default World;
