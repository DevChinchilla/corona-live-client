import React from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import { Col, Row } from "@components/Layout";
import Button from "@components/Button";
import { theme } from "@styles/themes";
import { useLocalStorage } from "@hooks/useLocalStorage";
import {
  FACEBOOK_URL,
  BLOG_URL,
  TWITTER_URL,
  WEBSITE_URL,
  IMPORTANT_MESSAGE,
  TWITTER_SNS_URL,
  INSTA_SNS_URL,
} from "@consts";
import Icon from "@components/Icon";
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
const Wrapper = styled(Col)`
  overflow-y: auto;
  overflow-x: hidden;
  p {
    margin-bottom: 10px;
    line-height: 24px;
    font-size: 12px;
    font-weight: 300;
    word-break: keep-all;
    text-align: center;
    * {
      color: ${theme("darkGreyText")} !important;
    }
    strong {
      font-weight: 500;
    }
    span {
      font-size: 10px;
      opacity: 0.6;
    }
    br {
      content: "";
      display: block;
      margin-top: 12px;
    }
  }
`;

interface Props {
  announcement: any;
}

const Header = styled(Row)`
  background: ${theme("greyBg")};
  padding: 0px 10px;
  font-weight: bold;
  margin-bottom: 18px;
`;
const AnnouncementPopup: React.FC<Props> = ({ announcement }) => {
  if (!announcement) return <></>;
  console.log(announcement);
  const [lastAnnouncement, setLastAnnouncement] = useLocalStorage("lastAnnouncement");
  const show = lastAnnouncement != announcement.date;

  return (
    <Modal show={show} noHeader style={{ height: "initial" }}>
      <Wrapper fadeInUp ai="center">
        <Header>공지</Header>
        <p dangerouslySetInnerHTML={{ __html: announcement.content }}></p>
      </Wrapper>
      <Row fontSize="10px" mb="16px" mt="12px" opacity={0.5} jc="center" width="100%">
        코로나 라이브 SNS로 보기
      </Row>
      <Row jc="center" position="relative">
        <IconBox type="twitter" href={TWITTER_SNS_URL}>
          <Icon name="Twitter" size={14}></Icon>
        </IconBox>
        <IconBox type="instagram" href={INSTA_SNS_URL}>
          <Icon name="Instagram" size={14}></Icon>
        </IconBox>
      </Row>
      <Row h="40px"></Row>
      <Button
        big
        onClick={() => {
          setLastAnnouncement(announcement.date);
        }}
      >
        닫기
      </Button>
    </Modal>
  );
};

export default AnnouncementPopup;