import React, { useState } from "react";
import Modal from "@components/Modal";
import { Row, Col } from "@components/Layout";
import { HOUR, INSTA_SNS_URL, TWITTER_SNS_URL } from "@consts";
import { CasesSummaryType } from "@types";
import styled from "styled-components";
import Icon from "@components/Icon";
import { IconBox } from "@components/IconBox";
import SnsContainer from "@components/SnsContainer";
import { theme } from "@styles/themes";

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
  font-size: 11px;
  margin-top: 4px;
  /* opacity: 0.6; */
  background: ${theme("greyBg")};
  color: ${theme("greyText")};
  font-weight: bold;
  padding: 1px 10px;
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
  const { todayCases, imported, domestic } = casesSummary;

  const showDetails = imported + domestic == todayCases;
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
                집계 불가. 검역은 당일 확진자 정보를 다음날 제공해서 집계불가 (지역사회 해외유입은
                지자체에서 제공할경우 집계가능)
              </Information>
            </Col>
          ) : (
            <>
              <Row fontSize="12px" opacity="0.7">
                최소수치
              </Row>
              <Row fontSize="26px" jc="center">
                <Row fontWeight={700}>{todayCases}</Row>
                <Row fontWeight={300}>명</Row>
              </Row>

              {showDetails && (
                <Row center mb="6px" mt="6px">
                  <Row justifyContent="space-between" ai="center">
                    <Row fontSize="13px" opacity="0.7" mr="4px">
                      국내
                    </Row>
                    <Row>
                      <Row fontSize="13px" fontWeight={700}>
                        {domestic}
                      </Row>
                    </Row>
                  </Row>
                  <Row w="10px">
                    <Row w="1px"></Row>
                  </Row>
                  <Row justifyContent="space-between" ai="center">
                    <Row fontSize="13px" opacity="0.7" mr="4px">
                      해외
                    </Row>
                    <Row>
                      <Row fontSize="13px" fontWeight={700}>
                        {imported}
                      </Row>
                    </Row>
                  </Row>
                </Row>
              )}

              <ShowButton onClick={() => setShowInfo((prev) => !prev)}>
                집계방식 보기 &rarr;
              </ShowButton>
              <Col my="10px">
                <SnsContainer finishedPopup reverse small></SnsContainer>
              </Col>
            </>
          )}
          <Row h="10px"></Row>
        </Col>
      </Modal>
    );
  return <></>;
};

export default FinishedPopup;
