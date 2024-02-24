import styled, { createGlobalStyle, keyframes } from "styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./configs/device";

export const GlobalStyle = createGlobalStyle<{ canScroll: boolean }>`


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
  background-color: #181a1b;
}
body {
	line-height: 1;
}

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  overscroll-behavior: none;
  box-sizing: border-box;
  user-select: none; /* 표준 속성 */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-text-size-adjust:none;
  -ms-text-size-adjust : none;
  -moz-text-size-adjust:none;
  -o-text-size-adjust:none;
  ::-webkit-scrollbar {
    display: none;
  }
  touch-action: manipulation; /* 더블 클릭에 의한 확대 방지 */
}
div {
  touch-action: manipulation; /* 더블 클릭에 의한 확대 방지 */
}
a {
  text-decoration: none;
  color: inherit;
}
`;

export const FadeIn = keyframes`
  from {
    opacity: 0;  }
  to {
    opacity: 1;
  }
`;
export const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  to{
    opacity: 0;
  }
`;
export const FadeInPopup = keyframes`
 from {
    opacity: 0;
  }
  to{
    opacity: 0.7;
  }
`;
export const FadeOutPopup = keyframes`
 from {
    opacity: 0.7;
  }
  to{
    opacity: 0;
    display: none;
  }
`;

export const Container = styled.div`
  width: ${SCREEN_WIDTH}px;
  flex-direction: column;
  align-items: center;
  display: flex;
  position: relative;
`;

export const EmptyBox = styled.div<{ height?: number; width?: number }>`
  /* height: ${(props) => props.height}px; */
  padding-top: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

export const SafeArea = styled.div<{ safearea: number[] }>`
  display: flex;
  max-height: ${SCREEN_HEIGHT};
  flex-direction: column;
  align-items: center;
  /* padding-top: ${(props) => props.safearea[0]}px;
  padding-bottom: ${(props) => props.safearea[1]}px; */
  /* margin-top: ${(props) => props.safearea[0]}px; */
  /* margin-bottom: ${(props) => props.safearea[1]}px; */
  /* background-color: white; */
  /* background-color: #181a1b; */
`;
