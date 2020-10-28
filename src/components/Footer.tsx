import React, { useRef } from "react";
import styled, { css } from "styled-components";

import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { theme } from "@styles/themes";
import {
  FACEBOOK_URL,
  BLOG_URL,
  TWITTER_URL,
  WEBSITE_URL,
  IMPORTANT_MESSAGE,
  KAKAOPAY_URL,
  EMAIL,
  TWITTER_SNS_URL,
  INSTA_SNS_URL,
} from "@consts";
import { useTimeoutState } from "@hooks/useTimeoutState";
import { ifProp, ifProps } from "@styles/tools";
import { Link } from "react-router-dom";
import { IconBox } from "./IconBox";
import SnsContainer from "./SnsContainer";

const Wrapper = styled(Col)`
  align-items: center;
  margin-bottom: 30px;

  margin-top: 50px;

  textarea {
    opacity: 0;
    position: absolute;
    left: -999px;
    top: -999px;
  }
  p {
    font-size: 11px;

    margin-top: 50px;
    text-align: center;
    opacity: 0.7;
  }
  a {
    color: ${theme("darkGreyText")};
    margin-left: 2px;
  }
`;

const Gnb = styled(Row)`
  justify-content: center;
  margin-bottom: 10px;
  visibility: hidden;
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
      <Row fontSize="12px" mb="10px" mt="10px" opacity={0.7}>
        후원하기
      </Row>
      <Row fontSize="11px" jc="center" opacity="0.5" textAlign="center">
        서버비용 충당후 남은 후원금은 투명하게 공개하여 코로나19 관련 단체에 기부하겠습니다 (SNS
        통해 공개)
      </Row>
      <Row jc="center" position="relative" mt="12px">
        <IconBox type="kakao" href={KAKAOPAY_URL} kakaoPay>
          <Icon name="KakaoPay" height="12px" width="100px"></Icon>
        </IconBox>
      </Row>

      <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
      <Gnb className="gnb">
        <Link to="/live">실시간</Link>
        <Link to="/daily">일별</Link>
        <Link to="/rates">확진율</Link>
        <Link to="/city/0">서울</Link>
        <Link to="/city/8">경기</Link>
        <Link to="/city/1">부산</Link>
      </Gnb>
      <Row fontSize="11px" mt="10px" jc="center" opacity="0.5" textAlign="center">
        <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
      </Row>
    </Wrapper>
  );
};

export default Footer;
