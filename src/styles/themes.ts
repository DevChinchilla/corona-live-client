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

  updateCard: string;

  kakao: string;
  kakaoBg: string;
  facebook: string;
  blog: string;
  twitter: string;
  link: string;
  instagram: string;

  notification: string;
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
  lightGreyText: "#eaeaea",
  blue: "#5673EB",
  red: "#EB5374",

  updateCard: "white",

  kakao: "#564a00",
  kakaoBg: "#efdb4866",
  facebook: "#3672E4",
  blog: "#57C04F",
  twitter: "#4A9AE5",
  link: "#999999",
  instagram: "#bf2e70",

  notification: "#000000d6",
};

const darkTheme: ThemeProps = {
  bg: "#191F2C",
  text: "#C8C9CD",
  border: "#C8C9CD",
  greyBg: "#272b38",

  greyText: "#828284",
  semigreyText: "#979AA0",
  semiDarkGreyText: "#C8C9CD",
  darkGreyText: "#E0E0E0",
  lightGreyText: "#3E3E3E",
  blackText: "#ffffff",
  blue: "#5673EB",
  red: "#EB5374",

  updateCard: "#272b38",
  kakaoBg: "#EFDB4830",
  kakao: "#EFDB48",
  facebook: "#3672E4",
  blog: "#57C04F",
  twitter: "#4A9AE5",
  link: "#ffffff",
  instagram: "#bf2e70",
  notification: "#000000d6",
};

export default { light: lightTheme, dark: darkTheme };
