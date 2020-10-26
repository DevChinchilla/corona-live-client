import React, { useState } from "react";
import styled, { css } from "styled-components";

import { Row, Box } from "@components/Layout";
import Icon from "@components/Icon";
import DeltaTag from "@components/DeltaTag";
import UpdateTime from "@components/UpdateTime";
import UpdateModal from "@components/UpdateModal";

import { numberWithCommas, ct } from "@utils";
import { ifProp } from "@styles/tools";
import { theme } from "@styles/themes";
import ALink from "../ALink";

const Wrapper = styled(Row)`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  height: 48px;
  padding: 0px 12px;
  margin-bottom: 2px;
  position: relative;
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
  const [showUpdates, setShowUpdates] = useState(false);

  const { total, current } = data;

  const deltaPositive = current[1] > 0;
  const currentColor = deltaPositive ? "red" : "blue";

  const name = cityId ? ct(cityId, id) : ct(id);
  if (!name) return <></>;

  const onClick = (e) => {
    if (cityId == null && name != "대구" && name != "검역") {
    } else {
      e.preventDefault();
      if (updateTime || updates.length != 0) setShowUpdates(true);
    }
  };

  return (
    <>
      <UpdateModal
        isDistrict={cityId != null}
        cityId={cityId || id}
        guId={cityId ? id : null}
        {...{ onClose: () => setShowUpdates(false), showUpdates, data: updates }}
      ></UpdateModal>

      <Wrapper {...props} onClick={onClick}>
        <ALink to={cityId == null ? `/city/${id}` : (null as any)}>{name}</ALink>

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
          {name != "대구" && name != "검역" ? (
            <>
              <Cases>{numberWithCommas(current[0])}</Cases>
              <Box fontSize="10px" opacity={0.6} ml="2px">
                명
              </Box>
              <DeltaTag color={currentColor} delta={current[1]} small showBg></DeltaTag>
            </>
          ) : (
            <Row fontSize="11px" fontWeight={700}>
              NA
            </Row>
          )}
        </Td>
        <Td end={true} flex={tdFlex[4]}>
          {(updateTime ||
            updates.length != 0 ||
            (cityId === undefined && name != "대구" && name != "검역")) && (
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
