import DeltaTag from "@components/DeltaTag";
import Icon from "@components/Icon";
import { Col, Row, Td } from "@components/Layout";
import LastUpdatedTime from "@components/Updates/LastUpdatedTime";
import { API, COUNTRY_CODES, COUNTRY_NAMES, SECOND } from "@consts";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { fetcher, numberWithCommas, sortByDate } from "@utils";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import useSWR from "swr";
import WorldUpdatesModal from "./WorldUpdatesModal";

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
  span {
    opacity: 0.7;
    font-size: 11px;
  }
`;

const NextButton = styled(Row)`
  flex: 1;
  justify-content: flex-end;
`;

type Props = {
  data: any;
  code: string;
  index: number;
  lastUpdated: string;
  tdFlex: any;
  updates: any;
};

const WorldRow: React.FC<Props> = ({ data, code, index, lastUpdated, tdFlex, updates }) => {
  const { cases, casesDelta, deaths, deathsDelta } = data;
  const [showUpdates, setShowUpdates] = useState(false);

  let imgName = code.toLowerCase();
  if (imgName == "xo") imgName = "je";
  if (imgName.length > 2) imgName = "xx";

  let countryName = COUNTRY_NAMES[code];

  if (!countryName) return <></>;
  let fontSize = countryName.length > 5 ? 11 : 12;
  return (
    <>
      <WorldUpdatesModal
        data={updates}
        onClose={() => setShowUpdates(false)}
        show={showUpdates}
        countryCode={code}
      ></WorldUpdatesModal>
      <Wrapper even={index % 2 == 0} onClick={() => lastUpdated && setShowUpdates(true)}>
        <Td flex={tdFlex[0]}>
          <CountryRank>{index + 1}</CountryRank>
        </Td>
        <Td flex={tdFlex[1]}>
          <img src={`/flags/${imgName}.svg`} alt={code}></img>
          <CountryName fontSize={fontSize + "px"}>{countryName}</CountryName>
        </Td>
        <Td flex={tdFlex[2]}>
          <ConfirmedCases>
            <Col>
              <Row jc="flex-end" mt="-2px" ai="flex-start">
                <CountryCases>{numberWithCommas(cases)}</CountryCases>
                <span>명</span>
              </Row>
              <DeltaTag delta={casesDelta} color={"red"} small></DeltaTag>
            </Col>
          </ConfirmedCases>
        </Td>
        <Td flex={tdFlex[3]}>
          <ConfirmedCases>
            <Col>
              <Row jc="flex-end" mt="-2px" ai="flex-start">
                <CountryCases>{numberWithCommas(deaths)}</CountryCases>
                <span>명</span>
              </Row>
              <DeltaTag delta={deathsDelta} color={"red"} small></DeltaTag>
            </Col>
          </ConfirmedCases>
        </Td>
        <Td flex={tdFlex[4]} ai="center" end={true}>
          {/* <LastUpdatedTime isOld date={lastUpdated}></LastUpdatedTime> */}
          {lastUpdated && <Icon name="ChevronRight" size={30}></Icon>}
        </Td>
      </Wrapper>
    </>
  );
};

export default WorldRow;
