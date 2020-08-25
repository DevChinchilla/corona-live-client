import * as React from "react";

import { Col, Row, Box } from "@components/Layout";
import Icon from "@components/Icon";
import Button from "@components/Button";
import Underline from "@components/Underline";

import { useTheme } from "@hooks/useTheme";
import { useHistory } from "react-router-dom";
import { useTranslation } from "@hooks/useTranslation";

type Props = {
  cityId: number;
  mutateData: any;
};

const CityNavBar: React.FC<Props> = ({ cityId, mutateData }) => {
  const [ct] = useTranslation();
  const history = useHistory();
  const theme = useTheme();
  return (
    <Row jc="space-between" ai="center" mb="20px" mt="0px" fadeInUp>
      <Button onClick={() => history.push("/")} white>
        <Icon name="ChevronLeft" stroke={theme("darkGreyText")} size={20}></Icon>
      </Button>
      <Underline fontSize="18px " fontWeight={900}>
        {ct(cityId)}
      </Underline>
      <Button white>
        <Icon name="SendMessage" size={12} fill={theme("darkGreyText")}></Icon>
      </Button>
    </Row>
  );
};

export default CityNavBar;
