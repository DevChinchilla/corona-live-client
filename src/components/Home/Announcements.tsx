import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "@components/Layout";
import { theme } from "@styles/themes";
import Modal from "@components/Modal";
import { getDateDistance } from "@utils";
import { IMPORTANT_MESSAGE } from "@consts";
import Icon from "@components/Icon";
import { AnnouncementType } from "@types";

const Wrapper = styled(Row)``;

const Button = styled(Row)`
  width: 100%;
  height: 50px;
  background: ${theme("greyBg")};
  margin-top: 20px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  flex-shrink: 0;
  cursor: pointer;
  div {
    font-weight: bold;
  }
  span {
    margin-left: 6px;
    width: 16px;
    height: 16px;
    background: ${theme("blue")}20;
    color: ${theme("blue")}C0;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
  }
`;

const AnnouncementContaienr = styled(Col)`
  flex-shrink: 0;
  & > div:first-child {
    cursor: pointer;
    font-size: 12px;
    opacity: 0.8;
    padding: 14px 0px;
    border-top: 1px solid ${theme("lightGreyText")};
  }
  span {
    font-size: 12px;
    opacity: 0.7;
    text-align: center;
  }
  p {
    width: 100%;
    margin-bottom: 10px;
    line-height: 24px;
    font-size: 12px;
    font-weight: 300;
    word-break: keep-all;
    text-align: center;
    background: ${theme("greyBg")};
    padding: 14px;
    border-radius: 12px;
    color: ${theme("darkGreyText")} !important;

    strong {
      font-weight: 500;
    }

    br {
      content: "";
      display: block;
      margin-top: 12px;
    }
  }
`;

const Announcement: React.FC<{ data: AnnouncementType }> = ({ data }) => {
  const { date, content, title } = data;
  const [showContent, setShowContent] = useState(false);
  return (
    <AnnouncementContaienr fadeInUp delay={1}>
      <Row jc="space-between" onClick={() => setShowContent((a) => !a)}>
        <Row>
          <Row opacity="0.8" width="70px">
            {date ? getDateDistance(date) : "--"}
          </Row>
          <Row fontWeight={date ? 400 : 700}>{title}</Row>
        </Row>
        <Icon name="ChevronDown"></Icon>
      </Row>
      {showContent && (
        <Row fadeInUp>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </Row>
      )}
    </AnnouncementContaienr>
  );
};

type Props = {
  announcements: AnnouncementType[];
};
const Announcements: React.FC<Props> = ({ announcements }) => {
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  return (
    <>
      <Modal
        dynamic
        show={showAnnouncements}
        onClose={() => setShowAnnouncements(false)}
        title={"공지사항"}
      >
        <Col overflowY="auto" overflowX="hidden">
          <Announcement
            data={{ title: "코로나 라이브 이용 주의사항", content: IMPORTANT_MESSAGE }}
          ></Announcement>

          {announcements.length > 0 ? (
            announcements.map((data, i) => <Announcement key={i} data={data}></Announcement>)
          ) : (
            <span>공지사항이 없습니다</span>
          )}
        </Col>
      </Modal>
      <Wrapper fadeInUp delay={2}>
        <Button onClick={() => setShowAnnouncements(true)}>
          <div>공지사항</div>
          <span>{announcements.length}</span>
        </Button>
      </Wrapper>
    </>
  );
};

export default Announcements;
