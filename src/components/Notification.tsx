import React from "react";
import { Col, Row, Box } from "./Layout";
import styled, { keyframes } from "styled-components";
import { mixins } from "@styles";
import { theme } from "@styles/themes";
import Overlay from "./Overlay";
import Icon from "./Icon";
import { useTranslation } from "@hooks/useTranslation";
import { NotificationType } from "@types";
import Button from "./Button";

const Wrapper = styled(Col)`
  ${mixins.AbsoluteCenter};
  position: fixed;
  z-index: 100000;
  width: fit-content;
`;
const Container = styled(Col)`
  padding: 24px 50px;
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
  onClose: () => void;
};

const Notification: React.FC<Props> = ({ notification, onClose }) => {
  const [ct] = useTranslation();
  if (notification.total < 0) return <></>;
  return (
    <>
      <Overlay fadeInUp></Overlay>
      <Wrapper>
        <Container fadeInUp>
          <NotificationIcon fadeInUp>
            <Icon name="NotificationFilled" size={22}></Icon>
          </NotificationIcon>
          <Message>확진자 {notification.total}명 추가</Message>
          <Col py="14px">
            {Object.keys(notification.counts || {}).map((cityId) => (
              <Detail>
                {ct(cityId)}
                <Box w="6px"></Box>+{notification?.counts[cityId]}
              </Detail>
            ))}
          </Col>
          <Button full onClick={onClose}>
            딛기
          </Button>
        </Container>
      </Wrapper>
    </>
  );
};

export default Notification;
