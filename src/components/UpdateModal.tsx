import styled from "styled-components";
import React, { useState, useEffect } from "react";
import UpdateCard from "./UpdateCard";
import { Col, Row, Absolute } from "./Layout";
import Modal from "./Modal";
import { sortByDate } from "@utils";
import { theme } from "@styles/themes";
import Icon from "@components/Icon";
import useTheme from "@hooks/useTheme";
import useTranslation from "@hooks/useTranslation";

const SearchInput = styled(Row)`
  position: relative;
  width: 100%;
  height: 36px;
  margin-bottom: 10px;

  input {
    width: 100%;
    height: 100%;
    font-size: 16px;
    outline: none;
    border: none;
    border-radius: 8px;
    color: ${theme("greyText")};
    background: ${theme("greyBg")};
    padding-left: 16px;
    padding-right: 10px;
    &::placeholder {
      color: ${theme("semigreyText")};
    }
  }
`;

export const UpdateModal = ({ onClose, showModal, data }) => {
  const _theme = useTheme();
  const [keyword, setKeyword] = useState("");
  const [ct] = useTranslation();
  const [filteredData, setData] = useState(data);

  useEffect(() => {
    setData(data);
  }, [data]);

  const onKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const onSearchKeyword = () => {
    const filtered = data.filter(({ gu, city }) => {
      return `${ct(city)} ${ct(city, gu)}`.indexOf(keyword) > -1;
    });
    setData(filtered);
  };
  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={["실시간", " 확진자 정보"]}
      icon={"Notification"}
    >
      <SearchInput fadeInUp delay={1}>
        <Absolute right="18px" verticalCenter onClick={onSearchKeyword}>
          <Icon name="Search" fill={_theme("darkGreyText")} size={14}></Icon>
        </Absolute>
        <input placeholder="주소검색" onChange={onKeywordChange} value={keyword}></input>
      </SearchInput>
      {/* <Row fontSize="12px" mb="14px" mt="10px" jc="center" fadeInUp>
      <Row opacity={0.8}>{data.length != filteredData.length ? "검색 결과" : "오늘 총"}</Row>
      <Row fontWeight={700} ml="2px">{`${filteredData.length}개`}</Row>
    </Row> */}
      <Col flex={1} overflowY="auto">
        {sortByDate(filteredData, "datetime").map((update, i) => (
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
