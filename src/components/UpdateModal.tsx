import styled, { css } from "styled-components";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import UpdateCard from "./UpdateCard";
import { Col, Row, Absolute } from "./Layout";
import Modal from "./Modal";
import { sortByDate, onEnter } from "@utils";
import { theme } from "@styles/themes";
import Icon from "@components/Icon";
import useTheme from "@hooks/useTheme";
import useTranslation from "@hooks/useTranslation";
import { ifProp } from "@styles/tools";
import { CITY_IDS } from "@consts";

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
  transition: 0.3s;
  background: ${theme("greyBg")};
  color: ${theme("greyText")};
  flex-shrink: 0;
  font-size: 12px;
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
        console.log("Categories rendered");
        if (!obj[city]) obj[city] = 0;
        obj[city]++;
        return obj;
      }, {}),
    []
  );

  console.log(categoryCounts);
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

export const UpdateModal = ({ onClose, showModal, data, isDistrict }) => {
  const _theme = useTheme();
  const [ct] = useTranslation();

  const [keyword, setKeyword] = useState("");
  const [filteredData, setData] = useState(data);
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    setData(data);
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
  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={"금일 추가 확진자 알림"}
      actionIcon={isDistrict ? [] : !showCategories ? ["Category", 18] : ["Search", 14]}
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
      <Col flex={1} overflowY="auto">
        {filteredData &&
          sortByDate(filteredData, "datetime").map((update, i) => (
            <UpdateCard
              key={`${update.datetime}/${i}`}
              data={update}
              fadeInUp={i < 16}
              delay={3 + i}
            ></UpdateCard>
          ))}
      </Col>
    </Modal>
  );
};
