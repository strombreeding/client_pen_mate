import styled, { createGlobalStyle, keyframes } from "styled-components";
import { MOBILE } from "./configs/device";
// import { Pretendard } from "./assets/fonts/fontFamilys";
// import Pretendard from "./assets/fonts/pretendard.css"

export const GlobalStyle = createGlobalStyle`
/* @font-face {
  font-family: "ChangwonDangamAsac";
  font-weight: 700;
  font-size: 50px;
  line-height: 60px;
  src: url(./assets/fonts/ChangwonDangamAsac-Bold_0712.ttf) format("ttf");
} */
@font-face {
    font-family: 'ChangwonDangamAsac';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/CWDangamAsac-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
	font-family: 'Pretendard Black';
	font-weight: 900;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-Black.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-Black.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard ExtraBold';
	font-weight: 800;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-ExtraBold.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-ExtraBold.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard Bold';
	font-weight: 700;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-Bold.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-Bold.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard SemiBold';
	font-weight: 600;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-SemiBold.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-SemiBold.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard Medium';
	font-weight: 500;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-Medium.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-Medium.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard Regular';
	font-weight: 400;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-Regular.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-Regular.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard Light';
	font-weight: 300;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-Light.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-Light.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard ExtraLight';
	font-weight: 200;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-ExtraLight.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-ExtraLight.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard Thin';
	font-weight: 100;
	font-display: swap;
	src:
		url(./assets/fonts/woff2/Pretendard-Thin.woff2) format('woff2'), 
		url(./assets/fonts/woff/Pretendard-Thin.woff) format('woff');
}


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
body {
	line-height: 1;
  overflow: hidden;
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
  box-sizing: border-box;
}
body {
  font-family: "esamanru";
  /* transition: all 0.4s ease-in-out; */
}
a {
  text-decoration: none;
  color: inherit;
}
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: skyblue; */
  margin: 0;
`;
export const Wrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: ${MOBILE ? "start" : "center"};
`;

export const colors = {
  White: "#FFFFFF",
  Grey100: "#EBEBF0",
  Grey200: "#D8D8DC",
  Grey300: "#BCBCC0",
  Grey400: "#AEAEB2",
  Grey500: "#8E8E93",
  Grey600: "#7C7C80",
  Grey700: "#6C6C70",
  Grey800: "#545456",
  Grey900: "#444446",
  Grey1000: "#363638",
  Grey1100: "#242426",
  Black: "#000000",
  Red30: "#FFC7C4",
  Red50: "#FFA29C",
  Red100: "#FF453A",
  Red200: "#D70015",
  Blue400: "#96B2FF",
  Blue500: "#638DFF",
  Blue600: "#4D73FF",
  Blue700: "#2F59CC",
};

const PretendardRegular = styled.span`
  font-family: "Pretendard Regular";
  font-weight: 400;
  font-display: swap;
`;
const PretendardSemiBold = styled.span<{ cursor?: string }>`
  font-family: "Pretendard SemiBold";
  font-weight: 600;
  font-display: swap;
  cursor: auto;
  user-select: none;
`;
const PretendardBold = styled.span`
  font-family: "Pretendard Bold";
  font-weight: 700;
  font-display: swap;
  cursor: auto;
  user-select: none;
`;
const ChangwonDangamAsac = styled.span`
  font-family: "ChangwonDangamAsac";
  font-weight: 700;
  font-size: 50px;
  line-height: 60px;
  cursor: auto;
  user-select: none;
`;
export const Text = {
  LargeTitle: styled(PretendardSemiBold)<{
    color?: string;
    cursor?: string;
  }>`
    font-size: 34px;
    line-height: 41px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Title1: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 28px;
    line-height: 34px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Title2: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 22px;
    line-height: 28px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Title3: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 20px;
    line-height: 25px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Headline: styled(PretendardSemiBold)<{ cursor?: string; color?: string }>`
    font-size: 17px;
    line-height: 22px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Body: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 17px;
    line-height: 22px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Callout: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 16px;
    line-height: 21px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Subhead: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 15px;
    line-height: 20px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Footnote: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 13px;
    line-height: 18px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Caption1: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 12px;
    line-height: 16px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  Caption2: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 11px;
    line-height: 13px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    white-space: pre-line;
    user-select: none;
    cursor: ${(props) => (props.cursor == null ? "default" : props.cursor)};
  `,
  ChangwonDangamAsac: styled(ChangwonDangamAsac)<{ color?: string }>`
    color: ${(props) => props.color};
  `,
};

export const FadeIn = keyframes`
  from {
    opacity: 0;
  }
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
    opacity: 0.5;
  }
`;
export const FadeOutPopup = keyframes`
 from {
    opacity: 0.5;
  }
  to{
    opacity: 0;
    display: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  background-color: white;
  /* position: relative; */
`;

export const EmptyBox = styled.div<{ height?: number; width?: number }>`
  /* height: ${(props) => props.height}px; */
  padding-top: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;
