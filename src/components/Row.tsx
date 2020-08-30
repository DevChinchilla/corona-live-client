import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

import Icon from "@components/Icon";
import UpdateTime from "@components/UpdateTime";
import { Row, Box } from "@components/Layout";
import DeltaTag from "@components/DeltaTag";
import { UpdateModal } from "@components/UpdateModal";

import { numberWithCommas } from "@utils";
import { ifProp } from "@styles/tools";
import { theme } from "@styles/themes";
import { useTranslation } from "@hooks/useTranslation";

const Wrapper = styled(Row)`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  height: 48px;
  padding: 0px 12px;
  margin-bottom: 2px;
  cursor: pointer;
  ${ifProp(
    "even",
    css`
      background: ${theme("greyBg")};
    `
  )}
`;
const Cases = styled(Box)`
  font-size: 12px;
  color: ${theme("darkGreyText")};
  font-weight: 600;
`;

const Divider = styled(Box)`
  width: 1px;
  height: 10px;
  background: ${theme("greyText")};
`;

interface PTd {
  end?: boolean;
  flex?: string;
}
const Td = styled(Row)<PTd>`
  align-items: center;
  flex: ${(props) => (props.flex ? props.flex : 1)};
  justify-content: ${(props) => (props["end"] ? "flex-end" : "flex-start")};
`;

const RowComponent = ({ updates, data, cityId, id, updateTime, tdFlex, ...props }) => {
  const history = useHistory();
  const [ct] = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const { total, current } = data;

  const deltaPositive = current[1] > 0;
  const currentColor = deltaPositive ? "red" : "blue";

  const name = cityId ? ct(cityId, id) : ct(id);

  if (!name) return <></>;

  const onClick = () => {
    if (cityId == null) {
      history.push(`./city/${cityId || id}`);
    } else {
      if (updateTime || updates.length != 0) setShowModal(true);
    }
  };

  return (
    <>
      <UpdateModal
        isDistrict={cityId != null}
        {...{ onClose: () => setShowModal(false), showModal, data: updates }}
      ></UpdateModal>

      <Wrapper {...props} onClick={onClick}>
        <Td flex={tdFlex[0]}>
          <Box fontSize="12px" fontWeight={500}>
            {name}
          </Box>
        </Td>
        <Td flex={tdFlex[1]}>
          <Divider></Divider>
        </Td>
        <Td flex={tdFlex[2]}>
          {total ? (
            <>
              <Cases>{numberWithCommas(total[0])}</Cases>
              <Box fontSize="10px" opacity={0.6} ml="2px">
                명
              </Box>
              {cityId == null && <DeltaTag color={"red"} delta={total[1]} small showBg></DeltaTag>}
            </>
          ) : (
            <Box fontSize="12px" opacity={0.8} ml="2px">
              NA
            </Box>
          )}
        </Td>
        <Td flex={tdFlex[3]}>
          <Cases>{numberWithCommas(current[0])}</Cases>
          <Box fontSize="10px" opacity={0.6} ml="2px">
            명
          </Box>
          <DeltaTag color={currentColor} delta={current[1]} small showBg></DeltaTag>
        </Td>
        <Td end={true} flex={tdFlex[4]}>
          {(updateTime || updates.length != 0) && (
            <>
              {updateTime && <UpdateTime isOld date={updateTime}></UpdateTime>}
              <div style={{ width: "8px" }}></div>
              <Icon name="ChevronRight" size={18}></Icon>
            </>
          )}
        </Td>
      </Wrapper>
    </>
  );
};

export default RowComponent;
