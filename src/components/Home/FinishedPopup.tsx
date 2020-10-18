import React, { useState } from "react";
import Modal from "@components/Modal";
import { Row, Col } from "@components/Layout";
import SocialMedia from "./SocialMedia";
import { HOUR } from "@consts";
import { CasesSummaryType, StatsType } from "@types";
import styled from "styled-components";

const Information = styled.div`
  font-size: 12px;
  margin-top: 2px;
  text-align: center;
  /* display: flex;
  justify-content: center; */
  opacity: 0.7;
  strong {
    font-weight: bold;
    margin: 0px 2px;
  }
`;

type Props = {
  casesSummary: CasesSummaryType;
};

const FinishedPopup: React.FC<Props> = ({ casesSummary }) => {
  const date = new Date();
  const currentHours = date.getHours();
  const currentDate = new Date(date.getTime() - 10 * HOUR);
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const [showModal, setShowModal] = useState(true);
  const { todayCases } = casesSummary;
  if (todayCases < 20) return <></>;
  if (currentHours >= 23 || currentHours < 9)
    return (
      <Modal
        show={showModal}
        dynamic
        title={`${month}월 ${day}일 집계마감`}
        onClose={() => setShowModal(false)}
      >
        <Col ai="center">
          <Row fontSize="12px" opacity="0.7">
            최소수치
          </Row>
          <Row fontSize="26px" fontWeight={700}>
            {todayCases}명
          </Row>

          <Row fontSize="12px" mt="20px" fontWeight={500}>
            집계방식
          </Row>
          <Information>
            재난 문자와 지자체 사이트에서 제공하는 당일 발생 확진자 중에서 당일 확진 판정받은 환자만
            집계 (질병관리청 집계방식과 동일). 재난문자상으로는 오늘 발생했다 해도 전날 확진이면
            미집계 (단 질병관리청 전날 집계에 포함이 안됬을경우에는 집계)
          </Information>
          <Row fontSize="12px" mt="20px" fontWeight={500}>
            질병관리청 수치 보다 적게 나오는 이유
          </Row>
          <Information>
            지자체에서 당일 확진자를 질병관리청에는 통보하지만 재난 문자는 다음날 보내는 경우 집계
            불가. 대구와 검역은 당일 확진자 정보를 다음날 제공해서 집계불가 (지역사회 해외유입은
            지자체에서 제공할경우 집계가능)
          </Information>
          <Row fontSize="12px" mt="20px" fontWeight={500}>
            SNS로 보기
          </Row>
          <Col transform="translateY(12px)">
            <SocialMedia hideTitle></SocialMedia>
          </Col>
        </Col>
      </Modal>
    );
  return <></>;
};

export default FinishedPopup;
