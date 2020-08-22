import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Col, Row } from "./Layout";
import Icon from "./Icon";
import { palette } from "../styles";
import UpdateTime from "./UpdateTime";

const Wrapper = styled(Col)``;

const Card = styled(Row)`
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: ${palette.lightGrey};
  padding: 0px 20px;
  height: 46px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const Message = styled(Row)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
`;

const Details = styled(Col)`
  padding: 8px 20px;
  p {
    font-weight: 300;
    font-size: 12px;
    color: ${palette.darkGrey};
  }
`;

const ReportButton = styled(Row)`
  margin-top: 10px;
  font-size: 12px;

  text-decoration: underline;
  color: ${palette.darkGrey};
  justify-content: flex-end;
  cursor: pointer;
`;

const UpdateCard = ({ onClick, data }) => {
  const [showDetails, setShowDetails] = useState(false);
  // const {} = data;

  return (
    <Wrapper>
      <Card onClick={() => (onClick ? onClick() : setShowDetails((a) => !a))}>
        <UpdateTime></UpdateTime>
        <Message>
          <strong>송파구</strong>5명 추가확진
        </Message>
        {showDetails ? <Icon name="ChevronDown"></Icon> : <Icon name="ChevronUp"></Icon>}
      </Card>
      {showDetails && (
        <Details>
          <p>
            [강진군청] 고양시확진자 강진방문관련 8.18.(화)11:30~13:00 모란추어탕 방문자는 보건소
            선별진료소(061-430-3592)에서 검사받으시기 바랍니다
          </p>
          <ReportButton>오류제보하기</ReportButton>
        </Details>
      )}
    </Wrapper>
  );
};

export default UpdateCard;
