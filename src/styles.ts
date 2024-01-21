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
  font-size: 1px;
}
body {
	/* line-height: 1; */
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
  /* overflow: hidden; */
overscroll-behavior: none;
  /* overflow-y: ${(props) => (props.canScroll ? "unset" : "hidden")}; */
  box-sizing: border-box;
  -webkit-user-select: none; /* iOS와 일부 브라우저를 위한 접두사 */
  -moz-user-select: none; /* Firefox를 위한 접두사 */
  -ms-user-select: none; /* Internet Explorer를 위한 접두사 */
  user-select: none; /* 표준 속성 */
  ::-webkit-scrollbar {
  display: none;
}
}

a {
  text-decoration: none;
  color: inherit;
}
`;

export const Background = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: skyblue; */
  margin: 0;
`;
export const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: ${MOBILE ? "auto" : SCREEN_HEIGHT - 56 + "rem"};
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
  font-family: "Pretendard";
  font-weight: 400;
  cursor: pointer;
  white-space: pre-wrap;
`;
const PretendardSemiBold = styled.div<{ cursor?: string }>`
  font-family: "Pretendard";
  font-weight: 600;
  cursor: pointer;
  white-space: pre-wrap;
`;
const PretendardBold = styled.div`
  font-family: "Pretendard";
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
    font-size: 34rem;
    line-height: 41rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title1: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 28rem;
    line-height: 34rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title2: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 22rem;
    line-height: 28rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title3: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 20rem;
    line-height: 25rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Headline: styled(PretendardSemiBold)<{ cursor?: string; color?: string }>`
    font-size: 17rem;
    line-height: 22rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Body: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 17rem;
    line-height: 22rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Callout: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 16rem;
    line-height: 21rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Subhead: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 15rem;
    line-height: 20rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Footnote: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 13rem;
    line-height: 18rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Caption1: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 12rem;
    line-height: 16rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Caption2: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 11rem;
    line-height: 13rem;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  ChangwonDangamAsac: styled(ChangwonDangamAsac)<{ color?: string }>`
    font-size: 50rem;
    line-height: 60rem;
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
`;

export const EmptyBox = styled.div<{ height?: number; width?: number }>`
  /* height: ${(props) => props.height}rem; */
  padding-top: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
`;

export const SafeArea = styled.div<{ safeArea: number[] }>`
  display: flex;
  width: ${SCREEN_WIDTH};
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) => props.safeArea[0]}rem;
  padding-bottom: ${(props) => props.safeArea[1]}rem;
  background-color: white;
`;
