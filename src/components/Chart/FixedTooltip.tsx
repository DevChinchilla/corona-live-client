import React from "react";
import { theme } from "@styles/themes";
import styled from "styled-components";
import { Col } from "@components/Layout";

const Wrapper = styled(Col)`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0px;
  top: -10px;
  font-size: 11px;
  background: ${theme("greyBg")};
  padding: 10px;
  border-radius: 6px;
  strong {
    font-weight: bold;
  }
  .title {
    font-weight: bold;
    font-size: 14px;
    color: ${theme("darkGreyText")};
    margin-bottom: 2px;
  }
  .today {
    color: ${theme("blue")};
    &:before {
      background: ${theme("blue")};
      box-shadow: 0 0 0 2px ${theme("blue")}50;
    }
  }
  .yesterday {
    color: ${theme("greyText")};
    &:before {
      background: ${theme("greyText")};
      box-shadow: 0 0 0 2px ${theme("greyText")}50;
    }
  }
  div {
    padding: 0px 4px;
    display: flex;
    align-items: center;
    &:before {
      content: "";
      display: flex;
      width: 6px;
      border-radius: 6px;
      height: 6px;
      margin-right: 8px;
    }
  }
`;

type Props = {
  title: string;
  today: string;
  yesterday: string;
};

const FixedTooltip: React.FC<Props> = ({ title, today, yesterday }) => {
  return (
    <Wrapper fadeInUp>
      <span className="title">{title}</span>
      <div className="yesterday">
        어제 <strong> &nbsp;{yesterday || 0}</strong>
      </div>
      <div className="today">
        오늘 <strong> &nbsp;{today || 0}</strong>
      </div>
    </Wrapper>
  );
};

export default FixedTooltip;
