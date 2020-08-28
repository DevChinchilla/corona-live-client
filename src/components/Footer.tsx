import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { theme, ThemeType } from "@styles/themes";
import {
  FACEBOOK_URL,
  BLOG_URL,
  TWITTER_URL,
  WEBSITE_URL,
  IMPORTANT_MESSAGE,
  TWITTER_SNS_URL,
  INSTA_SNS_URL,
  KAKAOPAY_URL,
} from "@consts";
import { useKakaoButton } from "@hooks/useKakaoButton";
import { useTimeoutState } from "@hooks/useTimeoutState";
import { ifProp, ifProps } from "@styles/tools";

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
`;

const IconBox = styled.a<{ type: string; kakaoPay?: boolean }>`
  background: ${(props) => theme(props.type as any)}30;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  margin: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    fill: ${(props) => theme(props.type as any)};
  }
  ${ifProps(
    { type: "kakao" },
    css`
      background: ${theme("kakaoBg")};
    `
  )}
  ${ifProp(
    "kakaoPay",
    css`
      width: auto !important;
      background: transparent;
      border: 1px solid ${theme("darkGreyText")}80;
      svg {
        fill: ${theme("darkGreyText")};
      }
    `
  )}
`;

const LinkCopyMsg = styled(Row)`
  position: absolute;
  padding: 0px 10px;
  bottom: -30px;
  font-size: 11px;
  background: ${theme("greyText")}30;
  flex-shrink: 0;
  font-weight: bold;
`;

const Footer = (props) => {
  useKakaoButton();
  const [copySuccess, setCopySuccess] = useTimeoutState(false, 2000);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function copyToClipboard(e) {
    textAreaRef.current!.select();
    document.execCommand("copy");
    textAreaRef.current!.blur();
    e.target.blur();
    setCopySuccess(true);
  }

  return (
    <Wrapper fadeInUp delay={6}>
      <textarea ref={textAreaRef} value={WEBSITE_URL} readOnly />

      <Row fontSize="12px" mb="14px" opacity={0.7}>
        공유하기
      </Row>
      <Row jc="center" position="relative">
        <LinkCopyMsg fadeInUp={!!copySuccess} fadeInDown={!copySuccess}>
          링크가 복사 되었습니다
        </LinkCopyMsg>
        <IconBox type="blog" href={BLOG_URL}>
          <Icon name="Blog" size={14}></Icon>
        </IconBox>
        <IconBox type="facebook" href={FACEBOOK_URL}>
          <Icon name="Facebook" size={14}></Icon>
        </IconBox>
        <IconBox type="twitter" href={TWITTER_URL}>
          <Icon name="Twitter" size={14}></Icon>
        </IconBox>
        <IconBox type="kakao" id="kakaoShare">
          <Icon name="KakaoTalk" size={14}></Icon>
        </IconBox>
        {document.queryCommandSupported("copy") && (
          <IconBox type="link" onClick={copyToClipboard}>
            <Icon name="Link" size={14}></Icon>
          </IconBox>
        )}
      </Row>
      <Row fontSize="12px" mb="14px" mt="30px" opacity={0.7}>
        SNS로 보기
      </Row>
      <Row jc="center" position="relative">
        <IconBox type="twitter" href={TWITTER_SNS_URL}>
          <Icon name="Twitter" size={14}></Icon>
        </IconBox>
        <IconBox type="instagram" href={INSTA_SNS_URL}>
          <Icon name="Instagram" size={14}></Icon>
        </IconBox>
      </Row>
      <Row fontSize="12px" mb="14px" mt="30px" opacity={0.7}>
        후원하기
      </Row>
      <Row jc="center" position="relative">
        <IconBox type="kakao" href={KAKAOPAY_URL} kakaoPay>
          <Icon name="KakaoPay" height="12px" width="100px"></Icon>
        </IconBox>
      </Row>
      <Row fontSize="11px" mt="10px" jc="center" opacity="0.5" textAlign="center">
        서비비용 충당후 남은 후원금은 투명하게 공개하여 코로나19 관련 단체에 기부하겠습니다 (SNS
        통해 공개)
      </Row>
      <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
      <Row fontSize="11px" mt="10px" jc="center" opacity="0.5" textAlign="center">
        corona.live.kr@gmail.com
      </Row>
    </Wrapper>
  );
};

export default Footer;

// 본 사이트에서 제공하는 정보는 대한민국 질병관리 본부, 각지자체 블로그
//         사이트, 재난문자 및 국내외 언론 기사 등을 토대로 업데이트를 하고있습니다. 하지만 이는
//         공식적인 수치가 아닌 개인이 취합한 정보이므로 수치의 정확성에 대해 책임질 수 없습니다. 본
//         사이트에 나온 정보 사용에 대한 책임은 전적으로 사용자에게 있습니다.
