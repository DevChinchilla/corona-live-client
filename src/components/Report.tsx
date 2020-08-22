import React, { useState, FC } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { Col, Box } from "./Layout";
import styled from "styled-components";
import { theme } from "@styles/themes";
const Wrapper = styled(Col)`
  height: 100%;
  input,
  textarea {
    border: none;
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
    /* height: 100px; */
    flex: 1;
    padding: 10px 0px;
  }
  input {
    height: 40px;
    font-size: 16px;
    margin-bottom: 10px;
  }
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
    <Modal show={show} title="제보" onClose={onClose} hideOverlay={hideOverlay}>
      <Wrapper>
        <Box fontSize="11px" opacity="0.8">
          제보내용
        </Box>

        <textarea
          placeholder="제보내용 (필수)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <Box fontSize="11px" opacity="0.8" mt="20px">
          이메일
        </Box>
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
