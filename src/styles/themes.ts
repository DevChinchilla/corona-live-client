interface ThemeProps {
  bg: string;
  text: string;
  border: string;
}
type ThemeType = keyof ThemeProps;

export const theme = (attr: ThemeType) => ({ theme }) => theme[attr];

const lightTheme: ThemeProps = {
  bg: "",
  text: "",
  border: "",
};
const darkTheme: ThemeProps = {
  bg: "",
  text: "",
  border: "",
};

export default { light: lightTheme, dark: darkTheme };
