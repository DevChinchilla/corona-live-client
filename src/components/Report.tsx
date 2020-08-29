import React, { useState, FC, useRef, useEffect } from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import Button from "@components/Button";
import { Col, Box, Row } from "@components/Layout";

import { theme } from "@styles/themes";
import { EMAIL_API } from "@consts";
import { sleep } from "@utils";
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
    padding: 10px;
    /* background: ${theme("greyBg")}; */
    background: transparent;
    border: none;
    flex: 1;
  }
  input {
    height: 40px;
    border: none;
    font-size: 14px;
    padding: 0px 10px;
    border-bottom: 1px solid ${theme("darkGreyText")}20;
    background: transparent;
    box-shadow: none;
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
  referTo?: any;
}

const Report: FC<Props> = ({ show, onClose, hideOverlay, referTo }) => {
  const [{ message, email, title, src, totalCases }, setForm] = useObjectState({
    message: "",
    email: "",
    totalCases: "",
    src: "",
    title: referTo || "",
  });
  const onChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    setForm({ [name]: value });
  };
  const [isLoading, setisLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>();
  useEffect(() => {
    if (referTo && !message) {
      setForm({ title: referTo });
    }
  }, [referTo]);

  useEffect(() => {
    if (show) {
      setisLoading(false);
      setForm({
        message: "",
        email: "",
        totalCases: "",
        src: "",
        title: referTo || "",
      });
    }
  }, [show]);

  const onSumbit = async () => {
    if (isLoading) return;
    if (title.trim().length == 0) return alert("제목을 적어주세요");
    if (message.trim().length == 0) return alert("내용을 적어주세요");
    setisLoading(true);
    await fetch(EMAIL_API, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, content: message, title }),
    });
    onClose();
  };

  return (
    <Modal show={show} title={"제보하기"} onClose={onClose} hideOverlay={hideOverlay}>
      <Wrapper fadeInUp delay={1}>
        <label>지역 (필수)</label>
        <input placeholder="지역 (필수)" value={title} onChange={onChange} name="title"></input>
        <label>확진자수 (필수)</label>
        <input
          placeholder="오늘확진 판정 확진자만 카운트"
          value={email}
          onChange={onChange}
          name="email"
        ></input>
        <label>출처</label>
        <input
          placeholder="재난문자/지자체 공식사이트, 뉴스 불가능"
          value={email}
          onChange={onChange}
          name="email"
        ></input>
        <label>이메일 (선택)</label>
        <input placeholder="이메일 (선택)" value={email} onChange={onChange} name="email"></input>
        {/* <textarea
          autoFocus={!!referTo}
          ref={(el) => (textRef.current = el)}
          placeholder="제보하시기전에 공지확인 부탁드리겠습니다. 확진자명수랑 지자체 사이트 링크/블로그 링크/재난문자를 꼭 첨부해주세요 (뉴스 x)"
          value={message}
          onChange={onChange}
          name="message"
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
