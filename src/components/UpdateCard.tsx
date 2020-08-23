import { Col, Row, Box } from "./Layout";
import Icon from "./Icon";
import UpdateTime from "./UpdateTime";
import Report from "./Report";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";

import React, { useState, FC } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const Card = styled(Row)<{ shadow?: boolean }>`
  justify-content: flex-end;
  align-items: center;
  position: relative;
  height: 52px;
  padding: 0px 14px;
  border-top: 1px solid ${theme("blackText")}15;
  ${ifProp(
    "shadow",
    css`
      padding: 0px 20px;
      border-top: none;
      border-radius: 6px;
      background: ${theme("bg")};
      box-shadow: 0 3px 10px ${theme("blackText")}15;
    `
  )}
`;

const Message = styled(Row)`
  font-size: 13px;
`;

const Details = styled(Col)`
  padding: 14px 20px;
  border-radius: 12px;
  background: ${theme("lightGreyText")};
  margin-bottom: 14px;
  p {
    font-weight: 300;
    font-size: 13px;
    color: ${theme("darkGreyText")};
  }
`;

const ReportButton = styled(Row)`
  margin-top: 10px;
  font-size: 12px;

  font-weight: 500;
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
  const { t } = useTranslation();

  const [showDetails, setShowDetails] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const { src, datetime, city, gu, cases } = data;

  const cityName = t(`c${city}`);
  const guName = t(`c${city}/${gu}`);

  const from = `${cityName} ${guName[0] != "c" ? guName : ""}`;
  const title = `${cases}명 추가확진`;

  const message = `[${datetime} ${from} ${from} ${title} 관련]`;
  return (
    <Col>
      <Report
        hideOverlay={true}
        show={showReport}
        onClose={() => setShowReport(false)}
        referTo={message}
      ></Report>
      <Card shadow={shadow} onClick={() => (onClick ? onClick() : setShowDetails((a) => !a))}>
        <Row flex="1">
          <UpdateTime date={datetime} flex="0 1 90px"></UpdateTime>
          <Message>
            <Box fontWeight={700} mr="4px">
              {from}
            </Box>
            {title}
          </Message>
        </Row>
        {!showDetails ? <Icon name="ChevronDown"></Icon> : <Icon name="ChevronUp"></Icon>}
      </Card>
      {showDetails && (
        <Details>
          <p>{src}</p>
          <ReportButton onClick={() => setShowReport(true)}>오류제보하기</ReportButton>
        </Details>
      )}
    </Col>
  );
};

export default UpdateCard;
