import { useEffect, useState } from "react";
import Routers from "./Router";
import { EmptyBox, GlobalStyle, SafeArea } from "./styles";
import { SERVER_URI } from "./configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import styled from "styled-components";
import { setLoading, setSafeArea } from "./store/slices/appState";
import { IOS, MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "./configs/device";
import { Viewport } from "./nativeView";
import { imgSrc } from "./assets/img";
import GameBg from "./components/designs/GameBG";
import { usePageState } from "./hooks/getVisitedPage";
import { useSafeAreaSize } from "./hooks/getSafeAreaSize";
import Loading from "./components/designs/Loading";
import Cookies from "js-cookie";
import BottomModal from "./components/games/BottomModal";
import useDefaultBrowser from "./hooks/useDefaultBrowser";
import KakaoInAppBrowserDetect from "./KakaoInAppBrowserDetect";
import AudioComponent from "./components/Audio";

import { setInfomation, setLoginState } from "./store/slices/userState";
import { jwtApiRequest } from "./apis/jwtApiService";

import Popup from "./components/Popup";
// const BG = styled.div<{ show: boolean }>`
//   position: absolute;
//   width: 100vw;
//   height: 100%;
//   background-color: black;
//   opacity: 0.5;
//   z-index: 1;
//   cursor: pointer;
//   animation: ${(props) => (props.show ? FadeInPopup : FadeOutPopup)} ease-in-out
//     0.3s;
// `;

function App() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.appState.loading);
  const bgImg = useSelector((state: RootState) => state.appState.bgImg);
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);
  usePageState();
  useDefaultBrowser();

  useSafeAreaSize();

  // react native 이벤트
  useEffect(() => {
    const readDataFromReactNative = (event: MessageEvent<string>) => {
      if (typeof event.data === "string") {
        if (event.data.includes("init")) {
          const receivedData = event.data.split("/")[1].split(",");
          dispatch(
            setSafeArea([Number(receivedData[0]), Number(receivedData[1])])
          );
        }
      }
    };

    if (IOS) {
      window.addEventListener("message", readDataFromReactNative);
    } else if (!IOS) {
      //@ts-ignore
      document.addEventListener("message", readDataFromReactNative);
    }

    return () => {
      //@ts-ignore
      document.removeEventListener("message", readDataFromReactNative);
      window.removeEventListener("message", readDataFromReactNative);
    };
    // return () =>
  }, []);

  // 새로고침시 쿠키제거
  useEffect(() => {
    const removeCookies = (e: any) => {
      e.returnValue = "";
      const cookies = Cookies.get(); // 모든 쿠키를 가져옵니다.
      for (const cookie in cookies) {
        if (cookie === "mute") {
          Cookies.remove(cookie); // 각 쿠키를 삭제합니다.
        }
      }
    };

    window.addEventListener("beforeunload", removeCookies);
    window.addEventListener("pagehide", removeCookies);
    return () => {
      window.removeEventListener("beforeunload", removeCookies);
      window.removeEventListener("pagehide", removeCookies);
    };
  }, []);

  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  useEffect(() => {
    const req = async (at: string) => {
      try {
        const res = await jwtApiRequest("user/verify", "POST", { at });
        dispatch(setLoginState(true));
        dispatch(setInfomation({ ...infomation, ...res }));
      } catch (err: any) {
        console.log(err.message);
        localStorage.clear();
      }
    };
    const at = window.localStorage.getItem("at");
    if (at != null) {
      req(at);
    }
  }, []);

  const mute = useSelector((state: RootState) => state.appState.mute);
  const canScroll = useSelector((state: RootState) => state.appState.canScroll);

  console.log("로딩", loading);
  return (
    <KakaoInAppBrowserDetect>
      <SafeArea>
        <Viewport src={imgSrc.bg_viewport} />

        <Background>
          <Popup />
          <AudioComponent />
          <Loading />

          <GameBg visible={bgImg !== undefined} src={bgImg} />
          <EmptyBox
            height={safeArea[0]}
            width={SCREEN_WIDTH}
            style={{ zIndex: 100 }}
          />
          <GlobalStyle canScroll={canScroll} />
          <Routers />
          <BottomModal setVisible={setModal} visible={modal} />
        </Background>
      </SafeArea>
    </KakaoInAppBrowserDetect>
  );
}

/* 
const 
*/
const Background = styled.div<{ bgImg?: string }>`
  position: relative;
  /* top: 0; */
  display: flex;
  flex-direction: column;
  width: ${SCREEN_WIDTH}px;
  max-width: 760px;
  height: ${SCREEN_HEIGHT}px;
  /* max-height: ${SCREEN_HEIGHT}px; */
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0) 22.92%,
    rgba(53, 0, 166) 100%
  );
`;

export default App;
