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
  blueBg: string;
  redBg: string;
  updateCard: string;

  kakao: string;
  kakaoBg: string;
  facebook: string;
  blog: string;
  twitter: string;
  link: string;
  instagram: string;

  notification: string;
  shadow: string;
  mapLabel: string;
  mapBorder: string;

  themeShadow: string;

  dark: string;
  light: string;

  navBarShadow: string;
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
  semigreyText: "#c3c3c3",
  lightGreyText: "#eaeaea",

  blue: "#5673EB",
  red: "#EB5374",
  blueBg: "#e0e6fb",
  redBg: "#eb53741f",

  updateCard: "white",

  kakao: "#564a00",
  kakaoBg: "#efdb487a",
  facebook: "#3672E4",
  blog: "#57C04F",
  twitter: "#4A9AE5",
  link: "#999999",
  instagram: "#bf2e70",

  notification: "#000000d6",
  shadow: "#FFFFFF",
  mapLabel: "#FFFFFF",
  mapBorder: "#FFFFFF",

  themeShadow: "#cccccc",

  light: "white",
  dark: "#191F2C",

  navBarShadow: "#0000001e",
};

const darkTheme: ThemeProps = {
  bg: "#191F2C",
  // bg: "#171725",
  text: "#C8C9CD",
  border: "#C8C9CD",
  greyBg: "#272b38",

  greyText: "#828284",
  semigreyText: "#7e8186",
  semiDarkGreyText: "#C8C9CD",
  darkGreyText: "#cfcfcf",
  lightGreyText: "#3E3E3E",
  blackText: "#ffffff",

  blue: "#5673EB",
  red: "#EB5374",

  blueBg: "#263051",
  redBg: "#EB537415",
  updateCard: "#272b38",

  kakao: "#EFDB48",
  kakaoBg: "#EFDB4830",
  facebook: "#3672E4",
  blog: "#57C04F",
  twitter: "#4A9AE5",
  link: "#ffffff",
  instagram: "#bf2e70",

  notification: "#000000d6",
  shadow: "#272b38",
  mapLabel: "#272b38ed",
  mapBorder: "rgba(86, 115, 235,0.5)",

  themeShadow: "#000000a3",
  light: "white",
  dark: "#191F2C",

  navBarShadow: "#8282821e",
};

export default { light: lightTheme, dark: darkTheme };
