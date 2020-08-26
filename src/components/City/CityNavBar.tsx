import React, { useState } from "react";

import { Row } from "@components/Layout";
import Icon from "@components/Icon";
import Button from "@components/Button";
import Underline from "@components/Underline";
import Report from "@components/Report";

import { useTheme } from "@hooks/useTheme";
import { useHistory } from "react-router-dom";
import { useTranslation } from "@hooks/useTranslation";

type Props = {
  cityId: string;
  mutateData: any;
};

const CityNavBar: React.FC<Props> = ({ cityId, mutateData }) => {
  const [ct] = useTranslation();
  const history = useHistory();
  const [showReport, setShowReport] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Report show={showReport} onClose={() => setShowReport(false)} referTo={ct(cityId)}></Report>
      <Row jc="space-between" ai="center" mb="20px" mt="0px" fadeInUp>
        <Button icon onClick={() => history.push("/")}>
          <Icon name="ChevronLeft" stroke={theme("darkGreyText")} size={24}></Icon>
        </Button>
        <Underline fontSize="18px " fontWeight={900}>
          {ct(cityId)}
        </Underline>
        <Button icon onClick={() => setShowReport(true)}>
          <Icon name="SendMessage" size={20} fill={theme("darkGreyText")}></Icon>
        </Button>
      </Row>
    </>
  );
};

export default CityNavBar;
