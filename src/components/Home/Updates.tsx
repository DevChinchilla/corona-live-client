import styled from "styled-components";
import React, { useState } from "react";
import UpdateCard from "../UpdateCard";
import { Col, Row, Absolute } from "../Layout";
import Modal from "../Modal";
import { getCurrentDateTime, sortByDate } from "@utils";
import { palette } from "@styles";
import { theme } from "@styles/themes";
import Icon from "@components/Icon";
import useTheme from "@hooks/useTheme";
import useTranslation from "@hooks/useTranslation";

const Wrapper = styled(Col)`
  width: 100%;
  justify-content: stretch;
  padding: 20px 0px;
`;

const Time = styled(Col)`
  justify-content: center;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 500;
  color: ${palette.grey};
  opacity: 0.8;
  text-align: center;
`;

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

const Updates = ({ data }) => {
  const _theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filteredData, setData] = useState(data);
  const [ct] = useTranslation();
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
    <Wrapper fadeInUp>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
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
              fadeInUp={i < 10}
              delay={3 + i}
            ></UpdateCard>
          ))}
        </Col>
      </Modal>
      <Time>{getCurrentDateTime()}</Time>
      <UpdateCard
        data={data[0]}
        onClick={() => setShowModal(true)}
        animationData={data.slice(0, 5)}
      ></UpdateCard>
    </Wrapper>
  );
};

export default Updates;
