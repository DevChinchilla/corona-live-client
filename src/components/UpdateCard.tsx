import { Col, Row, Box, Absolute } from "./Layout";
import Icon from "./Icon";
import UpdateTime from "./UpdateTime";
import Report from "./Report";
import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";

import React, { useState, FC, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { mixins } from "@styles";
import useTranslation from "@hooks/useTranslation";

const Card = styled(Row)<{ shadow?: boolean }>`
  justify-content: flex-end;
  align-items: center;
  position: relative;
  height: 52px;
  padding: 0px 14px;
  position: relative;
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

const AnimationContainer = styled(Absolute)`
  ${mixins.AbsoluteFull};
  align-items: center;
  padding: 0px 14px;
  box-sizing: border-box;
`;

const Content = ({ datetime, from, title, showDetails }) => {
  return (
    <>
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
    </>
  );
};
interface Props {
  onClick?: any;
  data?: any;
  animationData?: any;
}
const UpdateCard: FC<Props> = ({ onClick, data, animationData }) => {
  const [ct] = useTranslation();

  const [showDetails, setShowDetails] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [currentContent, setCurrentContent] = useState(data);
  const contentIndex = useRef(0);

  const { datetime, city, gu, cases } = currentContent;
  const from = `${ct(city)} ${ct(city, gu)}`;
  const title = `${cases}명 추가확진`;

  const message = `[${datetime} ${from} ${from} ${title} 관련]`;
  useEffect(() => {
    let interval;
    if (animationData) {
      interval = setInterval(() => {
        setCurrentContent(animationData[contentIndex.current]);
        contentIndex.current++;
        if (contentIndex.current >= animationData.length) contentIndex.current = 0;
      }, 5000);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <Col>
      <Report
        hideOverlay={true}
        show={showReport}
        onClose={() => setShowReport(false)}
        referTo={message}
      ></Report>

      <Card
        shadow={!!animationData}
        onClick={() => (onClick ? onClick() : setShowDetails((a) => !a))}
      >
        {animationData ? (
          animationData.map(
            (_, i) =>
              contentIndex.current == i && (
                <AnimationContainer fadeInUp key={i}>
                  <Content {...{ datetime, from, title, showDetails }}></Content>
                </AnimationContainer>
              )
          )
        ) : (
          <Content {...{ datetime, from, title, showDetails }}></Content>
        )}
      </Card>

      {showDetails && (
        <Details>
          <p>{currentContent.src}</p>
          <ReportButton onClick={() => setShowReport(true)}>오류제보하기</ReportButton>
        </Details>
      )}
    </Col>
  );
};

export default UpdateCard;
