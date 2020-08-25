import { useTranslation as useTranslationHook } from "react-i18next";

export const useTranslation = () => {
  const { t } = useTranslationHook();
  const ct = (cityId, guId = null) => {
    let cityName = t(`c${cityId}`);
    cityName = cityName.indexOf("c") == -1 ? cityName : "";

    let guName = t(`c${cityId}/${guId}`);
    // if(guName)
    guName = guName == cityName || guId == "_" ? "전체" : guName;
    guName = guName.indexOf("c") > -1 ? "" : guName;
    return guId != null ? guName : cityName;
  };

  return [ct, t];
};
