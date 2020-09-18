import React, { useRef } from "react";
import { theme, ThemeType } from "@styles/themes";
import styled from "styled-components";
import { Absolute, Col, Row } from "@components/Layout";
import Icon from "@components/Icon";

const Wrapper = styled(Row)`
  background: ${theme("greyBg")};
  border: 1px solid ${theme("greyText")}50;
  padding: 6px 20px;
  /* width: calc(100% - 20px); */
  width: calc(100% - 80px);
  top: -30px;
  left: 0px;
  position: absolute;
  border-radius: 4px;
  margin: 10px 0px;
  /* box-shadow: -1px 1px 10px #0000002e; */
  /* box-shadow: -1px 1px 10px ${theme("text")}2e; */
  box-shadow: 0px 0px 3px ${theme("text")}2e;
  background: ${theme("greyBg")};
  /* background: ${theme("bg")}; */
  border: 0px;
  & > div {
    /* justify-content: center; */
    flex: 1;
  }
`;

const SelectContainer = styled(Row)`
  font-size: 12px;
  margin-bottom: 2px;
  justify-content: flex-start;

  /* padding-right: 16px; */
  /* margin-right: 20px; */
  /* border-right: 1px solid ${theme("greyText")}50; */
  position: relative;
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: ${theme("greyText")};
    outline: none;
    border: none;
    background: transparent;
    padding-right: 20px;
    font-weight: 700;
    cursor: pointer;
    z-index: 1;
  }
  svg {
    stroke: ${theme("greyText")};
  }
`;

const Info = styled(Row)<{ color: ThemeType }>`
  font-size: 12px;
  flex: 1;
  color: ${(props) => theme(props.color)};
  padding: 0px 4px;
  display: flex;
  align-items: center;
  strong {
    font-weight: 700;
  }
  &:before {
    content: "";
    background: ${(props) => theme(props.color)};
    box-shadow: 0 0 0 4px ${(props) => theme(props.color)}50;
    display: flex;
    width: 6px;
    border-radius: 6px;
    height: 6px;
    margin-right: 12px;
  }
`;

type Props = {
  title: string;
  today: string;
  yesterday: string;
  onOptionSelect?: any;
  options?: string[];
  selectedOption: any;
  optionName: any;
};

const FixedTooltip: React.FC<Props> = ({
  title,
  today,
  yesterday,
  onOptionSelect,
  selectedOption,
  options,
  optionName,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <Wrapper>
      <Row>
        <SelectContainer>
          <Absolute right="0px">
            <Icon onClick={() => selectRef!.current!.click()} name="ChevronDown"></Icon>
          </Absolute>
          <select
            ref={selectRef}
            value={selectedOption}
            onChange={(e) => onOptionSelect(e.target.value)}
          >
            {options?.map((value, index) => {
              return (
                <option key={index} value={index}>
                  {optionName(value)}
                </option>
              );
            })}
          </select>
        </SelectContainer>
      </Row>

      <Info color={"greyText"}>
        어제 <strong> &nbsp;{yesterday || 0}명</strong>
      </Info>
      <Info color={"blue"}>
        오늘 <strong> &nbsp;{today || 0}명</strong>
      </Info>
    </Wrapper>
  );
};

export default FixedTooltip;
