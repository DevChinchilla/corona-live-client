import { palette } from "@styles";
import Icon from "./Icon";
import UpdateTime from "./UpdateTime";
import { Row, Box } from "./Layout";
import DeltaTag from "./DeltaTag";

import { numberWithCommas } from "@utils";
import useTheme from "@hooks/useTheme";

import styled, { css } from "styled-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { ifProp } from "@styles/tools";
import { theme } from "@styles/themes";

const Wrapper = styled(Row)`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  height: 48px;
  padding: 0px 14px;
  margin-bottom: 2px;
  ${ifProp(
    "even",
    css`
      background: ${palette.lightGrey};
    `
  )}
`;
const Cases = styled(Box)`
  font-size: 13px;
  color: ${theme("darkGreyText")};
  font-weight: 500;
`;

const Divider = styled(Box)`
  width: 1px;
  height: 10px;
  background: ${theme("greyText")};
`;

const Td = styled(Row)<{ end?: boolean; flex?: string }>`
  align-items: center;
  flex: ${(props) => (props.flex ? props.flex : 1)};
  justify-content: ${(props) => (props["end"] ? "flex-end" : "flex-start")};
`;

const RowComponent = ({ data, cityId, updateTime, ...props }) => {
  const { t } = useTranslation();
  const _theme = useTheme();

  const { total, today } = data;
  const onClick = () => {};

  const deltaPositive = today.delta > 0;
  const todayColor = deltaPositive ? "red" : "blue";

  const name = t(`c${cityId}`);
  if (name.indexOf("c") > -1) return <></>;
  return (
    <Wrapper onClick={onClick} {...props}>
      <Td flex="0 1 40px">
        <Box fontSize="13px">{name}</Box>
      </Td>
      <Td flex="0 1 16px">
        <Divider></Divider>
      </Td>
      <Td flex="0 1 106px">
        <Cases>{numberWithCommas(total.total)}명</Cases>
        <DeltaTag color={"greyText"} delta={total.delta} small></DeltaTag>
      </Td>
      <Td>
        <Cases>{numberWithCommas(today.total)}명</Cases>
        <DeltaTag color={todayColor} delta={today.delta} small showBg></DeltaTag>
      </Td>
      <Td end>
        {updateTime && <UpdateTime isOld date={updateTime}></UpdateTime>}
        <div style={{ width: "14px" }}></div>
        <Icon name="ChevronRight" size={18}></Icon>
      </Td>
    </Wrapper>
  );
};

export default RowComponent;
