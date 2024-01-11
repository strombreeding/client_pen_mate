import styled, { createGlobalStyle } from "styled-components";
// import { Pretendard } from "./assets/fonts/fontFamilys";
// import Pretendard from "./assets/fonts/pretendard.css"

export const GlobalStyle = createGlobalStyle`


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
  background-color: skyblue;
  margin: 0;
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
  Red50: "#FF99A5",
  Red80: "#FF5C6F",
  Red100: "#FF334B",
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
const PretendardSemiBold = styled.span`
  font-family: "Pretendard SemiBold";
  font-weight: 600;
  font-display: swap;
`;
export const Text = {
  LargeTitle: styled(PretendardRegular)<{ color?: string }>`
    font-size: 34px;
    line-height: 41px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Title1: styled(PretendardRegular)<{ color?: string }>`
    font-size: 28px;
    line-height: 34px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Title2: styled(PretendardRegular)<{ color?: string }>`
    font-size: 22px;
    line-height: 28px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Title3: styled(PretendardRegular)<{ color?: string }>`
    font-size: 22px;
    line-height: 28px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Headline: styled(PretendardSemiBold)<{ color?: string }>`
    font-size: 20px;
    line-height: 25px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Body: styled(PretendardRegular)<{ color?: string }>`
    font-size: 17px;
    line-height: 22px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Callout: styled(PretendardRegular)<{ color?: string }>`
    font-size: 16px;
    line-height: 21px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Subhead: styled(PretendardRegular)<{ color?: string }>`
    font-size: 15px;
    line-height: 20px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Footnote: styled(PretendardRegular)<{ color?: string }>`
    font-size: 13px;
    line-height: 18px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Caption1: styled(PretendardRegular)<{ color?: string }>`
    font-size: 12px;
    line-height: 16px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
  Caption2: styled(PretendardRegular)<{ color?: string }>`
    font-size: 11px;
    line-height: 13px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
  `,
};
