import styled, { css } from "styled-components";
import React, { useState, useEffect, useMemo, FC } from "react";

import UpdateCard from "@components/UpdateCard";
import { Col, Row, Absolute } from "@components/Layout";
import Modal from "@components/Modal";
import Icon from "@components/Icon";

import { useTheme } from "@hooks/useTheme";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { CITY_IDS } from "@consts";
import { sortByDate, onEnter, ct } from "@utils";
import CasesSummary from "./Home/CasesSummary";

const SearchInput = styled(Row)`
  position: relative;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;

  input {
    width: 100%;
    height: 100%;
    font-size: 14px;
    outline: none;
    border: none;
    border-radius: 8px;
    color: ${theme("darkGreyText")};
    background: ${theme("greyBg")};
    padding-left: 16px;
    padding-right: 10px;
    &::placeholder {
      color: ${theme("greyText")};
    }
  }
`;

const CategoryContainer = styled(Row)`
  align-items: center;
  overflow-x: scroll;
  margin-bottom: 6px;
  flex-shrink: 0;
`;

const CategoryBox = styled(Row)<{ active: boolean }>`
  padding: 6px 10px;
  border-radius: 6px;
  margin-right: 6px;
  margin-bottom: 8px;
  transition: 0.3s;
  background: ${theme("greyBg")};
  color: ${theme("greyText")};
  flex-shrink: 0;
  font-size: 12px;
  cursor: pointer;

  ${ifProp(
    "active",
    css`
      background: ${theme("blue")}20;
      color: ${theme("blue")};
    `
  )};
`;

const CategoryCount = styled(Row)`
  font-weight: bolder;
  padding-left: 4px;
`;

const Categories = ({ onSearchKeyword, keyword, ct, data }) => {
  const categoryCounts = useMemo(
    () =>
      data.reduce((obj, { city }) => {
        if (!obj[city]) obj[city] = 0;
        obj[city]++;
        return obj;
      }, {}),
    []
  );
  return (
    <CategoryContainer fadeInUp delay={1}>
      <CategoryBox onClick={() => onSearchKeyword("")} active={keyword == ""}>
        전체
        <CategoryCount>{data.length}건</CategoryCount>
      </CategoryBox>

      {CITY_IDS.sort((a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0)).map(
        (cityId) => {
          let name = ct(cityId) + " ";
          return (
            <CategoryBox
              key={cityId}
              onClick={() => onSearchKeyword(name)}
              active={keyword == name}
            >
              {name}
              <CategoryCount>{categoryCounts[cityId] || 0}건</CategoryCount>
            </CategoryBox>
          );
        }
      )}
    </CategoryContainer>
  );
};

interface Props {
  showUpdates: boolean;
  onClose: any;
  data?: any;
  isDistrict?: boolean;
  cityId?: string;
  guId?: string;
}

const UpdateModal: FC<Props> = React.memo(
  ({ onClose, showUpdates, data, isDistrict, cityId, guId }) => {
    const _theme = useTheme();

    const [keyword, setKeyword] = useState("");
    const [filteredData, setData] = useState(data);
    const [showCategories, setShowCategories] = useState(true);

    useEffect(() => {
      if (cityId == null) {
        onSearchKeyword(keyword);
      } else {
        setData(data.filter((a) => a.city == cityId));
      }
    }, [data]);

    const onSearchKeyword = (newKeyword) => {
      setKeyword(newKeyword);
      const filtered = data.filter(({ gu, city }) => {
        return `${ct(city)} ${ct(city, gu)}`.indexOf(newKeyword) > -1;
      });
      setData(filtered);
    };

    const onToggle = () => {
      if (showCategories) {
        setData(null);
      } else {
        setData(data);
      }
      setShowCategories((a) => !a);
      setKeyword("");
    };
    const title = `${ct(cityId, guId)} 실시간 발생 확진자`;
    return (
      <Modal
        show={showUpdates}
        onClose={onClose}
        title={title}
        actionIcon={isDistrict ? null : !showCategories ? ["Category", 18] : ["Search", 14]}
        onActionClick={onToggle}
        full
      >
        <CasesSummary updates={data}></CasesSummary>
        {!isDistrict && (
          <>
            {showCategories ? (
              <Categories {...{ onSearchKeyword, keyword, ct, data }}></Categories>
            ) : (
              <>
                <SearchInput fadeInUp delay={1}>
                  <Absolute right="18px" verticalCenter onClick={() => onSearchKeyword(keyword)}>
                    <Icon name="Search" fill={_theme("darkGreyText")} size={14}></Icon>
                  </Absolute>
                  <input
                    placeholder="지역 검색"
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyUp={onEnter((e) => onSearchKeyword(e.target.value))}
                    value={keyword}
                  ></input>
                </SearchInput>
                {filteredData && (
                  <Row fontSize="10px" jc="center" mb="10px" fadeInUp>
                    <Row opacity={0.8}>{"검색 결과"}</Row>
                    <Row fontWeight={700} ml="2px">{`${filteredData.length}개`}</Row>
                  </Row>
                )}
              </>
            )}
          </>
        )}
        <Col flex={1} overflowY="auto" overflowX="hidden" fadeInUp delay={3}>
          {filteredData &&
            sortByDate(filteredData, "datetime").map((update, i) => (
              <UpdateCard
                isDistrict={isDistrict}
                fullWidth={true}
                key={`${update.datetime}/${i}`}
                data={update}
              ></UpdateCard>
            ))}
        </Col>
      </Modal>
    );
  }
);

export default UpdateModal;
