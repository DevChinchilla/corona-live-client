import React, { useState, FC, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import { Col, Row, Box, Absolute } from "@components/Layout";
import Icon from "@components/Icon";
import UpdateTime from "@components/UpdateTime";
import Report from "@components/Home/ReportModal";

import { theme } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { mixins } from "@styles";
import { addHyperLink, ct } from "@utils";

const Card = styled(Row)<{ shadow?: boolean }>`
  justify-content: flex-end;
  align-items: center;
  position: relative;
  min-height: 50px;
  padding-left: 4px;
  padding-right: 10px;
  position: relative;
  border-top: 1px solid ${theme("greyText")}15;
  width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: pointer;

  ${ifProp(
    "shadow",
    css`
      padding: 0px 20px;
      border-top: none;
      border-radius: 6px;
      background: ${theme("shadow")};
      box-shadow: -1px 1px 20px #0000001e;
    `
  )}
`;

const Message = styled(Row)<{ isInvalid?: boolean }>`
  font-size: 12px;
  text-align: center;
  align-items: center;
  ${ifProp(
    "isInvalid",
    css`
      opacity: 0.6;
    `
  )}
`;

const Details = styled(Col)`
  padding: 14px 20px;
  border-radius: 12px;
  background: ${theme("greyBg")};
  margin-bottom: 14px;
  flex-shrink: 0;
  p {
    font-weight: 300;
    font-size: 13px;
    color: ${theme("darkGreyText")};
    overflow-x: auto;
    a {
      color: ${theme("darkGreyText")}!important;
    }
  }
`;

const ReportButton = styled(Row)`
  margin-top: 12px;
  font-size: 10px;

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

interface ContentProps {
  datetime: string;
  from: string;
  title: string;
  showDetails: boolean;
  isInvalid: boolean;
  fullWidth?: boolean;
}

const Content: FC<ContentProps> = ({
  datetime,
  from,
  title,
  showDetails,
  isInvalid,
  fullWidth,
}) => {
  return (
    <Row flex="1" flexWrap="wrap">
      <Row flex="1" flexWrap="wrap">
        <UpdateTime date={datetime} flex={`0 1 96px`}></UpdateTime>
        <Message isInvalid={isInvalid}>
          {!fullWidth ? (
            <Absolute center>
              <Row fontWeight={700} mr="4px">
                {from}
              </Row>
              <Row>{title}</Row>
            </Absolute>
          ) : (
            <>
              <Row fontWeight={700} mr="4px">
                {from}
              </Row>
              <Row>{title}</Row>
            </>
          )}
        </Message>
      </Row>
      {!showDetails ? (
        <Icon name="ChevronDown" size={24}></Icon>
      ) : (
        <Icon name="ChevronUp" size={24}></Icon>
      )}
    </Row>
  );
};
interface Props {
  onClick?: any;
  data?: any;
  animationData?: any;
  fadeInUp?: boolean;
  delay?: number;
  isDistrict?: boolean;
  fullWidth?: boolean;
}
export const UpdateCard: FC<Props> = ({
  onClick,
  data,
  animationData,
  fadeInUp,
  delay,
  fullWidth,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [currentContent, setCurrentContent] = useState(data);
  const contentIndex = useRef(0);

  const { datetime, city, gu, cases, total } = currentContent;
  const isInvalid = total == total - cases && !animationData;
  const from = `${ct(city)} ${ct(city, gu)}`;
  const title =
    cases == null
      ? `${total}명 확인중`
      : total == total - cases
      ? `${total}명 어제 집계`
      : `${cases}명 추가 확진`;

  const message = `[${datetime.split(" ")[1]}] ${from} ${title} 관련`;

  useEffect(() => {
    setCurrentContent(data);
  }, [data]);

  useEffect(() => {
    if (animationData) {
      setCurrentContent(animationData[contentIndex.current]);
    }
  }, [animationData]);

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

  const getInvalidMessage = () => {
    if (cases == null) {
      return `${total}명 어제 집계 여부 확인중`;
    } else if (total == total - cases) {
      return `${total}명 ${total > 1 ? `모두 ` : ""}어제 집계`;
    } else {
      return `${total}명중 ${total - cases}명은 어제 집계`;
    }
  };

  return (
    <>
      <Report
        hideOverlay={true}
        show={showReport}
        onClose={() => setShowReport(false)}
        errorReport={message}
      ></Report>

      <Card
        shadow={!!animationData}
        onClick={() => (onClick ? onClick() : setShowDetails((a) => !a))}
        {...{ fadeInUp, delay }}
      >
        {animationData ? (
          animationData.map(
            ({ datetime, city }, i) =>
              contentIndex.current == i && (
                <AnimationContainer fadeInUp key={`${datetime}/${city}/${i}`}>
                  <Content {...{ datetime, from, title, showDetails, isInvalid }}></Content>
                </AnimationContainer>
              )
          )
        ) : (
          <Content {...{ datetime, from, title, showDetails, isInvalid, fullWidth }}></Content>
        )}
      </Card>

      {showDetails && (
        <Details fadeInUp>
          {!!total && (
            <Row jc="center" mb="12px" mt="4px" fontSize="12px" fontWeight={700}>
              {getInvalidMessage()}
            </Row>
          )}
          <p
            dangerouslySetInnerHTML={{
              __html: addHyperLink(currentContent.src),
            }}
          ></p>
          <ReportButton onClick={() => setShowReport(true)}>오류제보</ReportButton>
        </Details>
      )}
    </>
  );
};

export default UpdateCard;
