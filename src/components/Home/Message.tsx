import * as React from "react";
import { Col, Row } from "@components/Layout";
import styled from "styled-components";
import { theme } from "@styles/themes";

type Props = {};

const Wrapper = styled(Col)`
  justify-content: center;
  padding: 13px;
  border-radius: 8px;
  background: ${theme("greyBg")};
  margin-top: 20px;
  strong {
    font-weight: bold;
  }
  h3 {
    font-weight: bold;
  }
  div {
    font-size: 12px;
    color: ${theme("darkGreyText")};
    line-height: 22px;
    opacity: 0.8;
  }
  span {
    font-weight: bold;
    font-size: 18px;
    margin-right: 2px;
    line-height: 20px;
  }
`;
const Message: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <Wrapper fadeInUp>
      <strong>28일 집계 마감</strong>

      <Row height="10px"></Row>
      <div>
        당일 코로나 라이브에서 집계된 확진자 수와 다음날 질본에서 발표한 확진자 수는
        <strong>&nbsp;다를 수 있습니다 </strong>
      </div>
      <Row h="10px"></Row>

      <div>
        코로나 라이브는 질본 집계방식과 동일하게 <strong>전일 0시부터 당일 0시까지</strong>의
        기준으로 확진자 수를 집계합니다
      </div>
      <Row h="10px"></Row>

      <strong>하지만 예외가 존재합니다</strong>
      <Row h="10px"></Row>

      <div>
        <span>1.</span> 검역 확진자는 알 수 있는 경로가 없습니다
      </div>
      <Row h="2px"></Row>

      <div>
        <span>2.</span> 대구는 당일 확진자 수, 정보를 다음날 공식적으로 공개해서 집계를 못합니다
      </div>
      <Row h="2px"></Row>

      <div>
        <span>3.</span> 늦은 시간 판정받은 확진자는 다음날 재난 문자를 보내는데, 이 경우 질본의 당일
        포함 여부를 알 수가 없어 집계에 미포함됩니다
      </div>
      <Row h="2px"></Row>

      <div>
        <span>4.</span> 지자체에서 제공하는 확진자 판정 일자가 불분명한 경우 집계에 미포함됩니다
      </div>
      <Row h="10px"></Row>
      <div>
        내일 발표되는 질본 수치와 오차는 발생할수있으므로 코로나 라이브는
        참고용 사이트로 봐주시기 바랍니다
      </div>
    </Wrapper>
  );
};

export default Message;
