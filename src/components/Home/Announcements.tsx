import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "@components/Layout";
import { theme } from "@styles/themes";
import Modal from "@components/Modal";
import { getDateDistance } from "@utils";
import { IMPORTANT_MESSAGE } from "@consts";

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

const Announcement = styled(Col)`
  overflow: scroll;
  margin-bottom: 16px;
  span {
    font-size: 12px;
    opacity: 0.7;
    text-align: center;
  }
  p {
    margin-bottom: 10px;
    line-height: 24px;
    font-size: 12px;
    font-weight: 300;
    word-break: keep-all;
    text-align: center;
    background: ${theme("greyBg")};
    padding: 14px;
    border-radius: 12px;
    margin-top: 10px;
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
interface AnnouncementType {
  date: number;
  content: string;
}
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
        <Announcement>
          <p dangerouslySetInnerHTML={{ __html: IMPORTANT_MESSAGE }}></p>
          {announcements.length > 0 ? (
            announcements.map(({ date, content }) => {
              return (
                <>
                  <span>{getDateDistance(date)}</span>
                  <p dangerouslySetInnerHTML={{ __html: content }}></p>
                </>
              );
            })
          ) : (
            <span>공지사항이 없습니다</span>
          )}
        </Announcement>
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
