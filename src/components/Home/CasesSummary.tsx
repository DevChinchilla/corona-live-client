import { Row } from "@components/Layout";
import { theme, ThemeType } from "@styles/themes";
import { ifProp } from "@styles/tools";
import { CasesSummaryType } from "@types";
import React, { FC } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled(Row)`
  border-radius: 4px;
  /* border: 1px solid ${theme("greyText")}; */
  padding: 0px 8px;
  padding-bottom: 10px;
  margin-bottom: 12px;
  /* justify-content: space-between; */
  align-items: center;
`;

const Stat = styled(Row)<{ color?: ThemeType }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  span:first-child {
    font-weight: 400;
    font-size: 10px;
    margin-bottom: 2px;
    color: ${theme("greyText")};
  }
  span:last-child {
    font-size: 12px;
    font-weight: 700;
    :after {
      content: "명";
    }

    ${ifProp(
      "color",
      css`
        color: ${(props) => theme(props["color"])};
      `
    )}
  }
`;

const Divider = styled(Row)`
  width: 1px;
  height: 20px;
  background: ${theme("lightGreyText")};
`;

interface Props {
  data: CasesSummaryType;
}

const CasesSummary: FC<Props> = ({ data }) => {
  const { checking, totalCases, yesterdayCases } = data;
  return (
    <Wrapper fadeInUp>
      <Stat>
        <span>오늘발생 </span> <span>{totalCases}</span>
      </Stat>
      <Divider></Divider>
      <Stat color="greyText">
        <span>어제확진 </span> <span>{yesterdayCases}</span>
      </Stat>
      <Divider></Divider>

      <Stat color="greyText">
        <span>확인중 </span> <span>{checking}</span>
      </Stat>
      <Divider></Divider>
      <Stat color="red">
        <span>오늘확진 </span> <span>{totalCases - yesterdayCases - checking}</span>
      </Stat>
    </Wrapper>
  );
};

export default CasesSummary;
