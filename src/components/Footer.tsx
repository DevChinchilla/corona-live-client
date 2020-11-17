import React, { useRef } from "react";
import styled, { css } from "styled-components";

import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { theme } from "@styles/themes";
import { IMPORTANT_MESSAGE, KAKAOPAY_URL, EMAIL } from "@consts";

import { Link } from "react-router-dom";
import { IconBox } from "./IconBox";
import SnsContainer from "./SnsContainer";

const Wrapper = styled(Col)`
  align-items: center;
  margin-bottom: 30px;

  margin-top: 50px;

  p {
    font-size: 11px;

    margin-top: 50px;
    text-align: center;
    opacity: 0.7;
  }
  a {
    color: ${theme("darkGreyText")};
  }
`;

const Gnb = styled(Row)`
  justify-content: center;
  margin-bottom: 10px;
  /* visibility: hidden; */
  a {
    padding: 0px 6px;
    font-size: 11px;
    color: ${theme("semigreyText")};
  }
`;

const Footer = () => {
  return (
    <Wrapper fadeInUp delay={6}>
      <SnsContainer></SnsContainer>
      <Row fontSize="12px" mb="10px" mt="42px" opacity={0.7}>
        후원하기
      </Row>
      <Row fontSize="11px" jc="center" opacity="0.5" textAlign="center">
        서버비용 충당후 남은 후원금은 코로나19 관련 단체에 기부하겠습니다 <br></br>(SNS 통해 공개)
      </Row>
      <Row h="18px"></Row>
      <Row jc="center" position="relative">
        <IconBox type="kakao" href={KAKAOPAY_URL} kakaoPay>
          <Icon name="KakaoPay" height="12px" width="100px"></Icon>
        </IconBox>
      </Row>

      <Row fontSize="12px" mb="10px" mt="62px" opacity={0.7}>
        집계 도움 주시는 분
      </Row>

      <Row ai="center">
        <Row fontSize="12px" jc="center" textAlign="center" fontWeight={700}>
          김재원
        </Row>
        <Row ml="2px" fontSize="12px" opacity={0.7}>
          님
        </Row>
      </Row>

      <Row fontSize="12px" mb="10px" mt="32px" opacity={0.7}>
        개발자
      </Row>
      <Row ai="center">
        <Row fontSize="12px" jc="center" textAlign="center" fontWeight={700}>
          홍준서
        </Row>
      </Row>

      <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>

      <Row fontSize="11px" mt="10px" jc="center" opacity="0.5" textAlign="center">
        <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
      </Row>
    </Wrapper>
  );
};

export default Footer;
