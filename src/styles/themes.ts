interface ThemeProps {
  bg: "";
  text: "";
  border: string;
  greyBg: string;

  greyText: string;
  darkGreyText: string;
  lightGreyText: string;
  blackText: string;
}
type ThemeType = keyof ThemeProps;

export const theme = (attr: ThemeType) => ({ theme }) => theme[attr];

const lightTheme: ThemeProps = {
  bg: "",
  text: "",
  border: "",
  greyBg: "",

  greyText: "",
  darkGreyText: "",
  lightGreyText: "",
  blackText: "",
};
const darkTheme: ThemeProps = {
  bg: "",
  text: "",
  border: "",
  greyBg: "",

  greyText: "",
  darkGreyText: "",
  lightGreyText: "",
  blackText: "",
};

export default { light: lightTheme, dark: darkTheme };
