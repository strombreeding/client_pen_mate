import { isMobile } from "react-device-detect";

export const MOBILE = isMobile;

// export const SCREEN_HEIGHT = window.innerHeight;
export const SCREEN_HEIGHT = window.innerHeight;
export const SCREEN_WIDTH = window.innerWidth;

// alert(SCREEN_HEIGHT);
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
