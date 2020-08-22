interface ThemeProps {
  bg: string;
  text: string;
  border: string;
  greyBg: string;

  greyText: string;
  semigreyText: string;
  semiDarkGreyText: string;
  darkGreyText: string;
  lightGreyText: string;
  blackText: string;

  blue: string;
  red: string;
}
export type ThemeType = keyof ThemeProps;

export const theme = (attr: ThemeType) => ({ theme }) => theme[attr];

const lightTheme: ThemeProps = {
  bg: "white",
  text: "#4A4A4A",
  border: "#F5F5F5",
  greyBg: "#F5F5F5",

  blackText: "#222222",
  darkGreyText: "#4A4A4A",
  semiDarkGreyText: "#5a5a5a",
  greyText: "#868686",
  semigreyText: "#d2d2d2",
  lightGreyText: "#F5F5F5",
  blue: "#5673EB",
  red: "#EB5374",
};

const darkTheme: ThemeProps = {
  bg: "",
  text: "",
  border: "",
  greyBg: "",

  greyText: "",
  semigreyText: "",
  semiDarkGreyText: "#5a5a5a",
  darkGreyText: "",
  lightGreyText: "",
  blackText: "",
  blue: "#5673EB",
  red: "#EB5374",
};

export default { light: lightTheme, dark: darkTheme };
