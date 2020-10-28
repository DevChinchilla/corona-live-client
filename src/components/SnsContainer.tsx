import React from "react";
import styled from "styled-components";

import { Row } from "@components/Layout";
import Icon from "@components/Icon";

import { useKakaoButton } from "@hooks/useKakaoButton";
import { theme } from "@styles/themes";
import {
  FACEBOOK_URL,
  BLOG_URL,
  TWITTER_URL,
  WEBSITE_URL,
  TWITTER_SNS_URL,
  INSTA_SNS_URL,
} from "@consts";

import { IconBox } from "./IconBox";
const Wrapper = styled.div``;

const LinkCopyMsg = styled(Row)`
  position: absolute;
  padding: 0px 10px;
  bottom: -30px;
  font-size: 11px;
  background: ${theme("greyText")}30;
  flex-shrink: 0;
  font-weight: bold;
`;

type Props = {};

const SnsContainer: React.FC<Props> = ({}) => {
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
    <Wrapper>
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
      <Row jc="center" position="relative" flexShrink={0} minHeight="60px">
        <IconBox type="twitter" href={TWITTER_SNS_URL}>
          <Icon name="Twitter" size={14}></Icon>
        </IconBox>
        <IconBox type="instagram" href={INSTA_SNS_URL}>
          <Icon name="Instagram" size={14}></Icon>
        </IconBox>
      </Row>
    </Wrapper>
  );
};

export default SnsContainer;
