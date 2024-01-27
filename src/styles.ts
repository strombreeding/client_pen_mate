import styled, { createGlobalStyle, keyframes } from "styled-components";
import { MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "./configs/device";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

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
	/* font-size: 100%; */
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
  height: 100vh;
  background-color: transparent;
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
  overflow: hidden;
  overscroll-behavior: none;
  overflow-y: ${(props) => (props.canScroll ? "unset" : "hidden")};
  box-sizing: border-box;
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-text-size-adjust:none;
  -ms-text-size-adjust : none;
  -moz-text-size-adjust:none;
  -o-text-size-adjust:none;
  user-select: none; /* 표준 속성 */
  ::-webkit-scrollbar {
    display: none;
  }
}
div {
  touch-action: manipulation; /* 더블 클릭에 의한 확대 방지 */
}
a {
  text-decoration: none;
  color: inherit;
}
`;

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: ${MOBILE ? "auto" : SCREEN_HEIGHT - 56 + "px"};
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

const PretendardRegular = styled.div`
  font-family: "Pretendard Variable";
  font-weight: 400;
  cursor: pointer;
  white-space: pre-wrap;
`;
const PretendardSemiBold = styled.div<{ cursor?: string }>`
  font-family: "Pretendard Variable";
  font-weight: 600;
  cursor: pointer;
  white-space: pre-wrap;
`;
const PretendardBold = styled.div`
  font-family: "Pretendard Variable";
  font-weight: 700;
  cursor: pointer;
  white-space: pre-wrap;
`;
const ChangwonDangamAsac = styled.div`
  font-family: "ChangwonDangamAsac";
  font-weight: 700;
  white-space: pre-wrap;
`;

export const ScrollView = styled.div<{ horizontal?: boolean }>`
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
`;

export const Text = {
  LargeTitle: styled(PretendardSemiBold)<{
    color?: string;
    cursor?: string;
  }>`
    font-size: 35px;
    /* line-height: 41px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title1: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 29px;
    /* line-height: 34px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title2: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 23px;
    /* line-height: 28px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title3: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 21px;
    /* line-height: 25px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title4: styled(PretendardSemiBold)<{ cursor?: string; color?: string }>`
    font-size: 14px;
    /* line-height: 25px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Headline: styled(PretendardSemiBold)<{ cursor?: string; color?: string }>`
    font-size: 18px;
    /* line-height: 22px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Body: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 18px;
    /* line-height: 22px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Callout: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 17px;
    /* line-height: 21px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Subhead: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 16px;
    /* line-height: 20px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Footnote: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 14px;
    /* line-height: 18px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Caption1: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 13px;
    /* line-height: 16px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Caption2: styled(PretendardSemiBold)<{ cursor?: string; color?: string }>`
    font-size: 12px;
    /* line-height: 13px; */
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  ChangwonDangamAsac: styled(ChangwonDangamAsac)<{ color?: string }>`
    font-size: 50px;
    /* line-height: 60px; */
    color: ${(props) => props.color};
  `,
};

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
  width: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  position: relative;
  /* background-color: skyblue; */
`;

export const EmptyBox = styled.div<{ height?: number; width?: number }>`
  /* height: ${(props) => props.height}px; */
  padding-top: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

export const SafeArea = styled.div<{ safearea: number[] }>`
  display: flex;
  width: ${SCREEN_WIDTH};
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) => props.safearea[0]}px;
  padding-bottom: ${(props) => props.safearea[1]}px;
  background-color: white;
`;
