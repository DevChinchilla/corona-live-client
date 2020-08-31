import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const DEBUG = false;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    keySeparator: false,
    returnEmptyString: false,
    fallbackLng: "korean",
    load: "languageOnly",
    backend: {
      loadPath: `${API_ROOT}locale_{{lng}}.json`,
      addPath: "http://localhost:9999/",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
