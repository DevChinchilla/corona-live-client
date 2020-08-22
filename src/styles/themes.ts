interface ThemeProps {
  bg: string;
  text: string;
  border: string;
  greyBg: string;

  greyText: string;
  semigreyText: string;
  darkGreyText: string;
  lightGreyText: string;
  blackText: string;
}
export type ThemeType = keyof ThemeProps;

export const theme = (attr: ThemeType) => ({ theme }) => theme[attr];

const lightTheme: ThemeProps = {
  bg: "white",
  text: "#4A4A4A",
  border: "#F5F5F5",
  greyBg: "#F5F5F5",

  greyText: "#868686",
  lightGreyText: "#F5F5F5",
  semigreyText: "#d2d2d2",
  darkGreyText: "#4A4A4A",
  blackText: "black",
};

const darkTheme: ThemeProps = {
  bg: "",
  text: "",
  border: "",
  greyBg: "",

  greyText: "",
  semigreyText: "",
  darkGreyText: "",
  lightGreyText: "",
  blackText: "",
};

export default { light: lightTheme, dark: darkTheme };
