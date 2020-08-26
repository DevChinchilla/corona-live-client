import styled, { css } from "styled-components";
import React, { useState, useEffect, useMemo, FC } from "react";

import UpdateCard from "@components/UpdateCard";
import { Col, Row, Absolute } from "@components/Layout";
import Modal from "@components/Modal";
import Icon from "@components/Icon";

import { useTheme } from "@hooks/useTheme";
import { useTranslation } from "@hooks/useTranslation";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { CITY_IDS } from "@consts";
import { sortByDate, onEnter } from "@utils";

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
  margin-bottom: 10px;
  flex-shrink: 0;
`;

const CategoryBox = styled(Row)<{ active: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 8px;
  margin-bottom: 12px;
  transition: 0.3s;
  background: ${theme("greyBg")};
  color: ${theme("greyText")};
  flex-shrink: 0;
  font-size: 12px;
  cursor: pointer;
  /* border: 1px solid ${theme("greyBg")}; */

  ${ifProp(
    "active",
    css`
      background: ${theme("blue")}20;
      color: ${theme("blue")};
      /* border: 1px solid ${theme("blue")}90; */
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

      {CITY_IDS.map((cityId) => {
        let name = ct(cityId);
        return (
          <CategoryBox onClick={() => onSearchKeyword(name)} active={keyword == name}>
            {name}
            <CategoryCount>{categoryCounts[cityId] || 0}건</CategoryCount>
          </CategoryBox>
        );
      })}
    </CategoryContainer>
  );
};

interface Props {
  showModal: boolean;
  onClose: any;
  data?: any;
  isDistrict?: boolean;
}

export const UpdateModal: FC<Props> = React.memo(({ onClose, showModal, data, isDistrict }) => {
  const _theme = useTheme();
  const [ct] = useTranslation();

  const [keyword, setKeyword] = useState("");
  const [filteredData, setData] = useState(data);
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    onSearchKeyword(keyword);
  }, [data]);

  const onSearchKeyword = (newKeyword) => {
    setKeyword(newKeyword);
    const filtered = data.filter(({ gu, city }) => {
      return `${ct(city)} ${ct(city, gu)}`.indexOf(newKeyword) == 0;
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
  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={"오늘 추가 확진자 알림"}
      actionIcon={isDistrict ? null : !showCategories ? ["Category", 18] : ["Search", 14]}
      onActionClick={onToggle}
    >
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
            <UpdateCard key={`${update.datetime}/${i}`} data={update}></UpdateCard>
          ))}
      </Col>
    </Modal>
  );
});
