import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const MOBILE = isMobile;

// export const SCREEN_HEIGHT = window.innerHeight;
export const SCREEN_HEIGHT = MOBILE
  ? window.innerHeight
  : window.innerHeight * 0.845;
// export const SCREEN_HEIGHT = MOBILE ? window.innerHeight : 850;
export const SCREEN_WIDTH = MOBILE ? window.innerWidth : 360;

export const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
// const isAndroid = /Android/.test(navigator.userAgent);

// // 사용 예시
// if (isIOS) {
//   alert("iOS에서 실행 중입니다.");
// } else if (isAndroid) {
//   alert("Android에서 실행 중입니다.");
// } else {
//   alert("다른 플랫폼에서 실행 중입니다.");
// }
