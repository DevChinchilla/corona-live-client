import React from "react";
import { Box, Row } from "./Layout";
import useTheme from "@hooks/useTheme";
import Icon from "./Icon";

const DeltaTag = ({ color, delta }) => {
  const theme = useTheme();
  const _color = theme(color);
  return (
    <Row
      color={_color}
      bg={_color + 15}
      borderRadius="6px"
      p="8px 8px"
      pl="12px"
      ml="8px"
      ai="center"
    >
      {Math.abs(delta)}
      <Box w="2px"></Box>
      {delta > 0 ? (
        <Icon name="ArrowUp" stroke={_color}></Icon>
      ) : (
        <Icon name="ArrowDown" stroke={_color}></Icon>
      )}
    </Row>
  );
};

export default DeltaTag;
