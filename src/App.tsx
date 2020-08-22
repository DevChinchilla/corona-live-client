import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themes } from "@styles";

const App = () => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
