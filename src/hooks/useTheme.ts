import { useContext } from "react";

import { ThemeContext } from "styled-components";
import { theme, ThemeType } from "@styles/themes";

const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  const getTheme = (attr: ThemeType) => {
    return theme(attr)({ theme: themeContext });
  };
  return getTheme;
};

export default useTheme;
