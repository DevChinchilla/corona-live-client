import React from "react";
import { Col, Row, Box } from "./Layout";
import styled, { keyframes } from "styled-components";
import { mixins } from "@styles";
import { theme } from "@styles/themes";
import Overlay from "./Overlay";
import Icon from "./Icon";
import { NotificationType } from "@types";
import Button from "./Button";
import { ct } from "@utils";

const Wrapper = styled(Col)`
  ${mixins.AbsoluteCenter};
  position: fixed;
  z-index: 100001;
  width: fit-content;
`;
const Container = styled(Col)`
  width: 220px;
  box-sizing: border-box;
  justify-content: stretch;
  display: flex;
  padding: 24px 20px;
  border-radius: 10px;
  background: ${theme("bg")};
  align-items: center;
  svg {
    stroke: ${theme("darkGreyText")};
    fill: ${theme("darkGreyText")};
    stroke-width: 0.5px;
  }
`;

const Detail = styled(Row)`
  font-size: 12px;
  color: ${theme("greyText")};
  margin-bottom: 4px;
`;

const Message = styled(Row)`
  font-size: 14px;
  font-weight: 700;
  margin-top: 14px;
  flex-shrink: 0;
`;

const Shake = keyframes`
  0% { transform: rotate(-40deg); }
  15% { transform: rotate(30deg); }
  30% { transform: rotate(-20deg); }
  45% { transform: rotate(20deg); }
60% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
  85% { transform: rotate(-3deg); }
  92% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
`;

const NotificationIcon = styled(Row)`
  width: 40px;
  height: 40px;
  margin-top: 4px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: ${theme("greyBg")};
  animation: ${Shake} 1s ease-in-out;
`;

type Props = {
  notification: NotificationType;
  closeModal: () => void;
  openUpdates?: () => void;
};

const Notification: React.FC<Props> = ({ notification, closeModal, openUpdates }) => {
  const { addedCases, casesCountByCity } = notification;
  return (
    <>
      <Overlay fadeInUp zIndex={100000}></Overlay>
      <Wrapper>
        <Container fadeInUp>
          <NotificationIcon fadeInUp>
            <Icon name="NotificationFilled" size={22}></Icon>
          </NotificationIcon>
          <Message>확진자 {addedCases}명 추가</Message>
          <Col py="12px">
            {Object.keys(casesCountByCity || {}).map((cityId) => {
              if (casesCountByCity[cityId] < 1) return <></>;
              return (
                <Detail>
                  {ct(cityId)}
                  <Box w="6px"></Box>+{casesCountByCity[cityId]}
                </Detail>
              );
            })}
          </Col>
          {/* <Row p="0px 0px" fontSize="12px" fontWeight={700}>
            자세히 보기
          </Row> */}
          {/* <Col w="100%" mt="10px"> */}
          <Row w="100%" mt="10px">
            <Row flex={1}>
              <Button full onClick={closeModal}>
                닫기
              </Button>
            </Row>
            {/* <Row h="8px"></Row> */}
            <Row w="8px"></Row>
            {!!openUpdates && (
              <Row flex={1}>
                <Button
                  full
                  blue
                  onClick={() => {
                    closeModal();
                    openUpdates();
                  }}
                >
                  보기
                </Button>
              </Row>
            )}
          </Row>
          {/* </Col> */}
        </Container>
      </Wrapper>
    </>
  );
};

export default Notification;
