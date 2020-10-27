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

const Wrapper = styled(Row)<{ even: boolean }>`
  align-items: center;
  border-radius: 6px;
  height: 52px;
  padding: 0px 4px;
  margin-bottom: 2px;
  position: relative;
  color: ${theme("semiDarkGreyText")};
  font-size: 12px;

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

const CountryRank = styled(Row)`
  font-weight: bold;
  flex-basis: 26px;
  margin-right: 2px;
  justify-content: center;
`;

const CountryName = styled(Row)`
  margin-left: 8px;
  font-weight: 500;
  flex-basis: 82px;
  margin-right: 6px;
  word-break: keep-all;
`;

const CountryCases = styled(Row)`
  font-weight: 600;
  span {
    font-weight: 400;
    opacity: 0.7;
    padding-left: 2px;
  }
`;

const ConfirmedRates = styled(Row)``;

const ConfirmedCases = styled(Row)`
  flex-basis: 100px;
  align-items: flex-start;
`;

const NextButton = styled(Row)`
  flex: 1;
  justify-content: flex-end;
`;

type Props = {
  data: any;
  code: string;
  index: number;
};

const WorldRow: React.FC<Props> = ({ data, code, index }) => {
  const { cases, casesDelta, deaths, deathsDelta } = data;

  let imgName = code.toLowerCase();
  if (imgName == "xo") imgName = "je";
  if (imgName.length > 2) imgName = "xx";

  let countryName = COUNTRY_NAMES[code];
  let fontSize = countryName.length > 5 ? 11 : 12;
  return (
    <Wrapper even={index % 2 == 0}>
      <CountryRank>{index + 1}</CountryRank>
      <img src={`/flags/${imgName}.svg`}></img>
      <CountryName fontSize={fontSize + "px"}>{countryName}</CountryName>
      <ConfirmedCases>
        <Col>
          <CountryCases>
            {numberWithCommas(cases)}
            <span>명</span>
          </CountryCases>
          <Row h="2px"></Row>
          <Row jc="flex-end">
            <DeltaTag delta={casesDelta} color={"red"} small showBg={false}></DeltaTag>
          </Row>
        </Col>
      </ConfirmedCases>
      <ConfirmedCases>
        <Col>
          <CountryCases>
            {numberWithCommas(deaths)}
            <span>명</span>
          </CountryCases>
          <Row h="2px"></Row>
          <Row jc="flex-end">
            <DeltaTag delta={deathsDelta} color={"red"} small showBg={false}></DeltaTag>
          </Row>
        </Col>
      </ConfirmedCases>
      {/* <ConfirmedRates>2.4%</ConfirmedRates> */}
      {/* <NextButton>
        <Icon name="ChevronRight" size={36}></Icon>
      </NextButton> */}
    </Wrapper>
  );
};

export default WorldRow;
