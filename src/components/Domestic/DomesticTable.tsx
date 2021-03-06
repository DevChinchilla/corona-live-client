import React, { FC, useMemo } from "react";

import DomesticRow from "@components/Domestic/DomesticRow";
import { Col, Row, Th } from "@components/Layout";

import { CurrentType, OverallType, UpdateType, CasesType, OverviewType } from "@types";

const Header = ({ tdFlex }) => {
  return (
    <Row alignItems="center" mb="12px" mt="20px" px="8px" fadeInUp>
      <Th flex={tdFlex[0]}>지역</Th>
      <Th flex={tdFlex[1]}></Th>
      <Th flex={tdFlex[2]}>총 확진자</Th>
      <Th flex={tdFlex[3]}>오늘</Th>
      <Th flex={tdFlex[4]} flexBasis="50px" justifyContent="flex-end" pr="30px">
        &nbsp;
      </Th>
    </Row>
  );
};

interface Props {
  cityId?: string | number;
  current: CurrentType | { [guId: number]: CasesType };
  overall: OverallType | { [guId: number]: CasesType };
  overview: OverviewType;
  updates: UpdateType[];
  tdFlex: string[];
}

const DomesticTable: FC<Props> = ({ cityId, current, overall, updates, tdFlex }) => {
  const getLastUpdatedTime = (id) => {
    let dateISO = updates.find((update) => {
      let { city, gu } = update;
      if (cityId == undefined && city == id) return true;
      if (cityId == city && gu == id) return true;
      return false;
    })?.datetime as string;
    let dateTime = new Date(dateISO).getTime() || 0;
    return { dateISO, dateTime };
  };

  const domesticRows = useMemo(() => {
    const sortByCurrentCases = (regionA, regionB) => {
      if (cityId) return current[regionB][0] - current[regionA][0];
      return current[regionB].cases[0] - current[regionA].cases[0];
    };

    const sortByUpdatedTime = (regionA, regionB) => {
      return getLastUpdatedTime(regionB).dateTime - getLastUpdatedTime(regionA).dateTime;
    };
    return Object.keys(current).sort(sortByUpdatedTime).sort(sortByCurrentCases);
  }, [current]);

  return (
    <>
      <Header tdFlex={tdFlex}></Header>
      <Col fadeInUp delay={6}>
        {domesticRows.map((id, i) => {
          let _cityId = cityId == undefined ? id : cityId;
          let _guId = cityId == undefined ? null : id;

          let data = {
            total: overall[id]?.cases || overall[id],
            current: current[id]?.cases || current[id],
          };
          let lastUpdated = getLastUpdatedTime(id).dateISO;

          return (
            <DomesticRow
              {...{ updates, tdFlex, data, lastUpdated }}
              fadeInUp
              delay={i * 1.5}
              even={i % 2 == 0}
              cityId={_cityId}
              guId={_guId}
              key={`${cityId}/${id}`}
            ></DomesticRow>
          );
        })}
      </Col>
    </>
  );
};

const MemoDomesticTable = React.memo(DomesticTable, (prev, next) => {
  return (
    prev.overview?.confirmed[0] == next.overview?.confirmed[0] &&
    prev.overview?.confirmed[1] == next.overview?.confirmed[1] &&
    prev.overview?.current[0] == next.overview?.current[0] &&
    prev.overview?.current[1] == next.overview?.current[1]
  );
});

export default MemoDomesticTable;
