import styled, { createGlobalStyle, keyframes } from "styled-components";
import { MOBILE, SCREEN_HEIGHT } from "./configs/device";
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
body {
	/* line-height: 1; */
  /* overflow-y: hidden; */
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
  overflow: ${(props) => (props.canScroll ? "unset" : "hidden")};
  box-sizing: border-box;
  -webkit-user-select: none; /* iOS와 일부 브라우저를 위한 접두사 */
  -moz-user-select: none; /* Firefox를 위한 접두사 */
  -ms-user-select: none; /* Internet Explorer를 위한 접두사 */
  user-select: none; /* 표준 속성 */
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

export const ScrollView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = {
  LargeTitle: styled(PretendardSemiBold)<{
    color?: string;
    cursor?: string;
  }>`
    font-size: 34px;
    line-height: 41px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title1: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 28px;
    line-height: 34px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title2: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 22px;
    line-height: 28px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Title3: styled(PretendardBold)<{ cursor?: string; color?: string }>`
    font-size: 20px;
    line-height: 25px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Headline: styled(PretendardSemiBold)<{ cursor?: string; color?: string }>`
    font-size: 17px;
    line-height: 22px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Body: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 17px;
    line-height: 22px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Callout: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 16px;
    line-height: 21px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Subhead: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 15px;
    line-height: 20px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Footnote: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 13px;
    line-height: 18px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Caption1: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 12px;
    line-height: 16px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  Caption2: styled(PretendardRegular)<{ cursor?: string; color?: string }>`
    font-size: 11px;
    line-height: 13px;
    color: ${(props) => (props.color == null ? colors.Black : props.color)};
    cursor: ${(props) => (props.cursor == null ? "pointer" : props.cursor)};
  `,
  ChangwonDangamAsac: styled(ChangwonDangamAsac)<{ color?: string }>`
    font-size: 50px;
    line-height: 60px;
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
  overflow: unset;
`;

export const EmptyBox = styled.div<{ height?: number; width?: number }>`
  /* height: ${(props) => props.height}px; */
  padding-top: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

export const SafeArea = styled.div<{ safeArea: number[] }>`
  padding-top: ${(props) => props.safeArea[0]};
  padding-bottom: ${(props) => props.safeArea[1]};
  background-color: white;
`;
