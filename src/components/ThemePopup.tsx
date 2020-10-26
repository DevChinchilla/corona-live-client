import { theme, ThemeType } from "@styles/themes";
import { ifProp } from "@styles/tools";
import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import { Col, Row } from "./Layout";
import Modal from "./Modal";

const Wrapper = styled(Col)`
  justify-content: center;
  flex: 1;
`;
const Title = styled(Row)`
  text-align: center;
  justify-content: center;
  font-size: 14px;
`;

const ThemeContainer = styled(Col)<{ selected: boolean }>`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > span {
    font-size: 12px;
    margin-top: 10px;
    ${ifProp(
      "selected",
      css`
        font-weight: bold;
        color: #0495ff;
      `
    )}
  }
`;

const ThemeLogo = styled(Row)<{ themeName: ThemeType }>`
  background: ${(props) => theme(props.themeName)};
  width: 50px;
  height: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px ${theme("themeShadow")};
`;

const CheckBox = styled(Row)<{ selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  border: 1px solid ${theme("greyText")};

  div {
    height: 8px;
    width: 2px;
    border: 1px solid transparent;
    transform: translateY(-2px) rotate(45deg);
  }

  ${ifProp(
    "selected",
    css`
      background: #0495ff;
      border: none;

      div {
        border-color: transparent white white transparent;
        display: block;
      }
    `
  )}
  
}
`;

type Props = {
  onClose: any;
  theme: any;
  setTheme: any;
};

const ThemePopup: React.FC<Props> = ({ onClose, theme, setTheme }) => {
  return (
    <Modal
      zIndex={10000}
      closeButtonPos="bottom"
      show={true}
      title="배경 설정"
      dynamic
      onClose={onClose}
    >
      <Wrapper>
        <Row jc="center" py="30px">
          <ThemeContainer selected={theme == "light"} onClick={() => setTheme("light")}>
            <ThemeLogo themeName={"light"}>
              <Icon name="Light" size={26}></Icon>
            </ThemeLogo>
            <span>라이트 모드</span>
            <CheckBox selected={theme == "light"}>
              <div></div>
            </CheckBox>
          </ThemeContainer>

          <Row w="30px"></Row>

          <ThemeContainer selected={theme == "dark"} onClick={() => setTheme("dark")}>
            <ThemeLogo themeName={"dark"}>
              <Icon name="Light" fill={"white"} size={26}></Icon>
            </ThemeLogo>
            <span>다크 모드</span>
            <CheckBox selected={theme == "dark"}>
              <div></div>
            </CheckBox>
          </ThemeContainer>
        </Row>
        <Row mb="30px" fontSize="11px" textAlign="center" opacity={0.6}>
          나중에 변경을 원하시면 원쪽 상단에 있는 버튼을 누르셔서 변경하실수있습니다
        </Row>
      </Wrapper>
    </Modal>
  );
};

export default ThemePopup;
