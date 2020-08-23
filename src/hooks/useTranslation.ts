import { useTranslation as useTranslationHook } from "react-i18next";

const useTranslation = () => {
  const { t } = useTranslationHook();
  const ct = (cityId, guId = null) => {
    let cityName = t(`c${cityId}`);
    cityName = cityName.indexOf("c") == -1 ? cityName : "";

    let guName = t(`c${cityId}/${guId}`);
    guName = guName.indexOf("c") == -1 ? guName : "";

    return guId ? guName : cityName;
  };

  return [ct, t];
};

export default useTranslation;
