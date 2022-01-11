import {createGlobalStyle} from "styled-components";
import reset from 'styled-reset';

export const lightTheme = {
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)"
}

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c"
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  input, button {
    all: unset;
  }
  a {
    text-decoration: none;
  }
  body {
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    background-color: ${props => props.theme.bgColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: ${props => props.theme.fontColor};
  }
`