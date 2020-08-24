import * as React from "react";
import styled from "styled-components";
import { Col, Row } from "./Layout";
import { theme, ThemeType } from "@styles/themes";
import { prop } from "@styles/tools";
import Icon from "./Icon";
import { FACEBOOK_URL, BLOG_URL, TWITTER_URL } from "@consts";
const Kakao = window["Kakao"];

const Wrapper = styled(Col)`
  align-items: center;
  margin-bottom: 30px;

  margin-top: 50px;

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
  svg {
    fill: ${(props) => theme(props.type as any)};
  }
`;

type Props = {};
const Footer: React.FC<Props> = (props) => {
  const {} = props;
  React.useEffect(() => {
    Kakao.Link.createDefaultButton({
      container: "#kakaoShare",
      objectType: "feed",
      content: {
        title: "코로나 라이브 | 실시간 코로나 현황",
        description: "당일 코로나 발생 정보를 실시간으로 제공합니다",
        imageUrl: "https://corona-live.com/thumbnail.png",
        link: {
          mobileWebUrl: "https://corona-live.com",
          androidExecParams: "test",
        },
      },
      social: {
        likeCount: 5394,
        commentCount: 302,
        sharedCount: 4690,
      },
      buttons: [
        {
          title: "실시간 현황 보기",
          link: {
            mobileWebUrl: "https://corona-live.com",
          },
        },
      ],
    });
  }, []);
  return (
    <Wrapper fadeInUp delay={6}>
      <Row fontSize="11px" mb="14px" opacity={0.5}>
        공유하기
      </Row>
      <Row jc="center">
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
        <IconBox type="link" id="kakaoShare">
          <Icon name="Link" size={14}></Icon>
        </IconBox>
      </Row>
      <p>
        본 사이트에서 제공하는 정보는 대한민국 질병관리 본부, 각지자체 블로그 사이트, 재난문자 및
        국내외 언론 기사 등을 토대로 업데이트를 하고있습니다. 하지만 이는 공식적인 수치가 아닌
        개인이 취합한 정보이므로 수치의 정확성에 대해 책임질 수 없습니다. 본 사이트에 나온 정보
        사용에 대한 책임은 전적으로 사용자에게 있습니다.
      </p>
    </Wrapper>
  );
};

export default Footer;
