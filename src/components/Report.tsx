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
  overflow-y: auto;
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
    -webkit-border-radius: 0px;
    -webkit-appearance: none;
  }
  a {
    color: ${theme("darkGreyText")};
    margin-left: 2px;
  }
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
  website: "",
};

const ReportOptions = ["재난문자", "지자체 사이트"];
const ErrorOptions = ["어제 이미 집계", "확진자수 오류"];
const ErrorOptionsPlaceHolder = ["어제 집계된 확진자 번호 예) 1,2,3,...", "확진자수 (숫자만)"];

const Report: FC<Props> = ({ show, onClose, hideOverlay, errorReport }) => {
  const [isLoading, setisLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>();
  const [{ src, email, title, cases, website }, setForm] = useObjectState({
    ...initialState,
    title: errorReport || "",
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setForm({ [name]: value });
  };

  useEffect(() => {
    if (show) {
      setisLoading(false);
      setForm({
        ...initialState,
        cases: "",
        title: errorReport || "",
      });
    }
  }, [show]);

  const onSumbit = async () => {
    if (isLoading) return;
    if (!errorReport) {
      if (title.trim().length == 0) return alert("지역을 적어주세요");
      if (title.trim().split(" ").length > 2) return alert("한지역만 적어주세요");
      if (
        title
          .trim()
          .split(" ")
          .find((a) => a.length > 6)
      )
        alert("한지역만 적어주세요");
    }
    if (cases.trim().length == 0) return alert("확진자수를 적어주세요");
    if (!parseInt(cases)) return alert("확진자수 숫자만 적어주세요");
    // if (src.trim().length == 0) return alert("출처을 적어주세요");

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
    <Modal
      show={show}
      title={"제보하기"}
      onClose={onClose}
      hideOverlay={hideOverlay}
      dynamic
      zIndex={10000}
    >
      <Wrapper fadeInUp delay={1}>
        {!errorReport && (
          <Row textAlign="center" fontSize="12px" jc="center">
            공지사항 체크 먼저 해주시기 바랍니다
          </Row>
        )}

        <Row textAlign="center" fontSize="12px" jc="center" mt="2px">
          문의는 <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
        </Row>

        {!errorReport && (
          <>
            <input placeholder="지역 " value={title} onChange={onChange} name="title"></input>
            {/* <input
              placeholder="링크 (선택)"
              value={website}
              onChange={onChange}
              name="website"
            ></input> */}
          </>
        )}
        <input
          placeholder="확진자수 (숫자만)"
          value={cases}
          onChange={onChange}
          name="cases"
        ></input>
        <Row h="10px"></Row>
        {/* <textarea
          autoFocus={!!errorReport}
          ref={(el) => (textRef.current = el)}
          placeholder={errorReport ? "오류설명" : "지자체 링크 또는 재난문자만 (뉴스 x)"}
          value={src}
          onChange={onChange}
          name="src"
        ></textarea> */}

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
