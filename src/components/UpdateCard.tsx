import React, { useState, FC } from "react";
import styled, { css } from "styled-components";
import { Col, Row, Box } from "./Layout";
import Icon from "./Icon";
import UpdateTime from "./UpdateTime";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import Report from "./Report";

const Wrapper = styled(Col)``;

const Card = styled(Row)<{ shadow?: boolean }>`
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: ${theme("greyBg")};
  padding: 0px 20px;
  height: 46px;
  border-radius: 6px;
  margin-bottom: 10px;
  ${ifProp(
    "shadow",
    css`
      background: ${theme("bg")};
      box-shadow: 0 3px 10px ${theme("blackText")}14;
    `
  )}
`;

const Message = styled(Row)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
`;

const Details = styled(Col)`
  padding: 16px 20px;
  padding-bottom: 24px;
  p {
    font-weight: 300;
    font-size: 13px;
    color: ${theme("darkGreyText")};
  }
`;

const ReportButton = styled(Row)`
  margin-top: 10px;
  font-size: 13px;

  text-decoration: underline;
  color: ${theme("darkGreyText")};
  justify-content: flex-end;
  cursor: pointer;
`;

interface Props {
  onClick?: any;
  data?: any;
  shadow?: boolean;
}
const UpdateCard: FC<Props> = ({ onClick, data, shadow }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <Wrapper>
      <Report hideOverlay={true} show={showReport} onClose={() => setShowReport(false)}></Report>
      <Card shadow={shadow} onClick={() => (onClick ? onClick() : setShowDetails((a) => !a))}>
        <UpdateTime></UpdateTime>
        <Message>
          <Box fontWeight="bold" mr="4px">
            송파구
          </Box>
          5명 추가확진
        </Message>
        {showDetails ? <Icon name="ChevronDown"></Icon> : <Icon name="ChevronUp"></Icon>}
      </Card>
      {showDetails && (
        <Details>
          <p>
            [강진군청] 고양시확진자 강진방문관련 8.18.(화)11:30~13:00 모란추어탕 방문자는 보건소
            선별진료소(061-430-3592)에서 검사받으시기 바랍니다
          </p>
          <ReportButton onClick={() => setShowReport(true)}>오류제보하기</ReportButton>
        </Details>
      )}
    </Wrapper>
  );
};

export default UpdateCard;
