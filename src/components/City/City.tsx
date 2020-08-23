import React from "react";
import { useLocation, useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const City = ({ match }) => {
  const { t } = useTranslation();

  const cityId = match.params.id;
  const location = useLocation();
  const history = useHistory();
  return (
    <div>
      <div onClick={() => history.push("/")}>뒤로</div>
      <h1>{t(`c${cityId}`)}</h1>
    </div>
  );
};

export default City;
