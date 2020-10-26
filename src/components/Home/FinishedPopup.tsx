import React, { useState } from "react";
import Modal from "@components/Modal";
import { Row, Col } from "@components/Layout";
import { HOUR, INSTA_SNS_URL, TWITTER_SNS_URL } from "@consts";
import { CasesSummaryType } from "@types";
import styled from "styled-components";
import Icon from "@components/Icon";
import { IconBox } from "@components/IconBox";

const Information = styled.div`
  font-size: 12px;
  margin-top: 2px;
  text-align: center;
  opacity: 0.7;
  strong {
    font-weight: bold;
    margin: 0px 2px;
  }
`;

const ShowButton = styled(Row)`
  font-size: 10px;
  margin-bottom: 10px;
  opacity: 0.7;
  border-bottom: 1px solid;
  cursor: pointer;
`;

type Props = {
  casesSummary: CasesSummaryType;
};

const FinishedPopup: React.FC<Props> = ({ casesSummary }) => {
  const [showInfo, setShowInfo] = useState(false);

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
        closeButtonPos="bottom"
      >
        <Col ai="center">
          {showInfo ? (
            <Col mt="0px" mb="18px" ai="center">
              <Row fontSize="12px" fontWeight={500}>
                집계방식
              </Row>
              <Information>
                재난 문자와 지자체 사이트에서 제공하는 당일 발생 확진자 중에서 당일 확진 판정받은
                환자만 집계 (질병관리청 집계방식과 동일). 재난문자상으로는 오늘 발생했다 해도 전날
                확진이면 미집계 (단 질병관리청 전날 집계에 포함이 안됬을경우에는 집계)
              </Information>
              <Row fontSize="12px" mt="20px" fontWeight={500}>
                질병관리청 수치 보다 적게 나오는 이유
              </Row>
              <Information>
                지자체에서 당일 확진자를 질병관리청에는 통보하지만 재난 문자는 다음날 보내는 경우
                집계 불가. 대구와 검역은 당일 확진자 정보를 다음날 제공해서 집계불가 (지역사회
                해외유입은 지자체에서 제공할경우 집계가능)
              </Information>
            </Col>
          ) : (
            <>
              <Row fontSize="12px">최소수치</Row>
              <Row fontSize="26px" fontWeight={700}>
                {todayCases}명
              </Row>
              <ShowButton onClick={() => setShowInfo((prev) => !prev)}>
                집계방식 보기 &rarr;
              </ShowButton>
              <Row fontSize="12px" mt="20px">
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
            </>
          )}
          <Row h="10px"></Row>
        </Col>
      </Modal>
    );
  return <></>;
};

export default FinishedPopup;
