import React, { useState, FC } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { Col, Box, Row } from "./Layout";
import styled from "styled-components";
import { theme } from "@styles/themes";
const Wrapper = styled(Col)`
  height: 100%;
  input,
  textarea {
    color: ${theme("darkGreyText")};
    &:focus {
      outline: blue;
    }
    &::placeholder {
      color: ${theme("semigreyText")};
    }
  }
  textarea {
    font-size: 16px;
    border: none;
    padding: 20px;
    background: ${theme("lightGreyText")};
    border-radius: 12px;
    border: none;
    flex: 1;
  }
  input {
    height: 40px;
    border: none;
    font-size: 16px;
    margin: 10px 0px;
  }
`;

const Label = styled(Row)`
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 12px;
  opacity: 0.8;
`;
interface Props {
  show: boolean;
  onClose: any;
  hideOverlay?: boolean;
}
const Report: FC<Props> = ({ show, onClose, hideOverlay }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const onSumbit = () => {
    if (message.trim().length == 0) alert("내용을 적어주세요");
    console.log({ email, message });
  };
  return (
    <Modal show={show} title={["제보", "하기"]} onClose={onClose} hideOverlay={hideOverlay}>
      <Wrapper>
        {/* <Label>제보내용</Label> */}

        <textarea
          placeholder="제보내용 (필수)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {/* <Label>이메일</Label> */}

        <input
          placeholder="이메일 (선택)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <Button big onClick={onSumbit}>
          제보하기
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default Report;
