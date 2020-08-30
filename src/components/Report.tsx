import React, { useState, FC, useRef, useEffect } from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import Button from "@components/Button";
import { Col, Row } from "@components/Layout";

import { theme } from "@styles/themes";
import { EMAIL_API, EMAIL } from "@consts";
import Spinner from "./Spinner";
import { useObjectState } from "@hooks/useObjectState";

const Wrapper = styled(Col)`
  height: 100%;
  input,
  textarea {
    color: ${theme("darkGreyText")};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${theme("semigreyText")};
    }
  }
  textarea {
    font-size: 14px;
    border: none;
    padding: 10px 0px;
    background: transparent;
    border: none;
    flex: 1;
  }
  input {
    height: 40px;
    border: none;
    font-size: 14px;
    border-bottom: 1px solid ${theme("darkGreyText")}20;
    background: transparent;
    box-shadow: none;
  }
  a {
    color: ${theme("darkGreyText")};
    margin-left: 2px;
  }
`;

const Label = styled(Row)`
  margin-top: 16px;
  font-size: 11px;
`;
interface Props {
  show: boolean;
  onClose: any;
  hideOverlay?: boolean;
  errorReport?: any;
}

const initialState = {
  message: "",
  email: "",
  src: "",
  cases: "",
};

const Report: FC<Props> = ({ show, onClose, hideOverlay, errorReport }) => {
  const [isLoading, setisLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>();
  const [{ src, email, title, cases }, setForm] = useObjectState({
    ...initialState,
    title: errorReport || "",
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    setForm({ [name]: value });
  };

  useEffect(() => {
    if (show) {
      setisLoading(false);
      setForm({
        ...initialState,
        cases: errorReport ? "오류 제보" : "",
        title: errorReport || "",
      });
    }
  }, [show]);

  const onSumbit = async () => {
    if (isLoading) return;
    if (title.trim().length == 0) return alert("지역을 적어주세요");
    if (cases.trim().length == 0) return alert("확진자수를 적어주세요");
    if (src.trim().length == 0) return alert("출처을 적어주세요");

    setisLoading(true);
    await fetch(EMAIL_API, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, content: `${cases} ${src}`, title }),
    });
    onClose();
  };

  return (
    <Modal show={show} title={"제보하기"} onClose={onClose} hideOverlay={hideOverlay}>
      <Wrapper fadeInUp delay={1}>
        <Row textAlign="center" fontSize="12px" jc="center">
          공지사항 체크 먼저 해주시기 바랍니다
        </Row>
        <Row textAlign="center" fontSize="12px" jc="center" mt="2px">
          문의는 <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
        </Row>

        <Label>지역*</Label>
        <input placeholder="지역" value={title} onChange={onChange} name="title"></input>

        {!errorReport && (
          <>
            <Label>확진자수*</Label>
            <input placeholder="확진자수" value={cases} onChange={onChange} name="cases"></input>
          </>
        )}

        <Label>이메일 (선택)</Label>
        <input placeholder="이메일" value={email} onChange={onChange} name="email"></input>

        <Label>{errorReport ? "오류*" : "출처*"}</Label>
        <textarea
          autoFocus={!!errorReport}
          ref={(el) => (textRef.current = el)}
          placeholder={errorReport ? "오류설명" : "지자체 링크/재난문자만 가능 (뉴스 x)"}
          value={src}
          onChange={onChange}
          name="src"
        ></textarea>

        <Button big onClick={onSumbit}>
          {isLoading ? (
            <Spinner size={20} color={"darkGreyText"} bg={"greyBg"}></Spinner>
          ) : (
            "제보하기"
          )}
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default Report;
