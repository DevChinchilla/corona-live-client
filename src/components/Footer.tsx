import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Col, Row } from "@components/Layout";
import Icon from "@components/Icon";

import { theme, ThemeType } from "@styles/themes";
import { FACEBOOK_URL, BLOG_URL, TWITTER_URL, WEBSITE_URL } from "@consts";
import { useKakaoButton } from "@hooks/useKakaoButton";
import { useTimeoutState } from "@hooks/useTimeoutState";

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
    opacity: 0.5;
  }
`;

const IconBox = styled.a<{ type: string }>`
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

      <Row fontSize="11px" mb="14px" opacity={0.5}>
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

      <p>
        코로나 라이브는 재난문자와 각 지자체에서 제공하는 자료, 언론 기사등을 토대로 당일 코로나
        확진 환자를 업데이트를 하고있으나, 민간이 취합한 집계이므로 공식적인 근거 자료 활용될수
        없고, 다음날 제공하는 질본 수치와 <strong> 오차가 발생할수 있습니다.</strong>
        <br></br> <br></br>본 사이트 정보 공유로 인해 발생된 문제에 코로나 라이브는{" "}
        <strong> 어떠한 책임도 지지 않습니다.</strong> 이점 양해 부탁드리겠습니다. 본사이트에 나온
        정보 사용에 대한 책임은 전적으로 사용자에게 있습니다.
      </p>
    </Wrapper>
  );
};

export default Footer;

// 본 사이트에서 제공하는 정보는 대한민국 질병관리 본부, 각지자체 블로그
//         사이트, 재난문자 및 국내외 언론 기사 등을 토대로 업데이트를 하고있습니다. 하지만 이는
//         공식적인 수치가 아닌 개인이 취합한 정보이므로 수치의 정확성에 대해 책임질 수 없습니다. 본
//         사이트에 나온 정보 사용에 대한 책임은 전적으로 사용자에게 있습니다.
