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
  const pageState = usePageState();
  useDefaultBrowser();
  const loading = useSelector((state: RootState) => state.appState.loading);
  // useEffect(() => {}, [loading]);
  const bgImg = useSelector((state: RootState) => state.appState.bgImg);
  const canPopstate = useSelector(
    (state: RootState) => state.appState.canPopstateEvent
  );
  // const popupState = useSelector((state: RootState) => state.appState.popup);
  // const modalState = useSelector((state: RootState) => state.appState.modal);
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);
  // const receiveRef = useRef(false);
  // const containerRef = useRef<HTMLDivElement>(null);
  // console.log(SERVER_URI);
  // console.log(window.innerHeight);
  // console.log(window.innerWidth);
  useSafeAreaSize();
  // const dispatch = useDispatch<AppDispatch>();
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const choiceTitle = useSelector(
    (state: RootState) => state.gameState.status.gameTitle
  );

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

  const canScroll = false;

  console.log("로딩", loading);
  return (
    <KakaoInAppBrowserDetect>
      <SafeArea>
        <Viewport src={imgSrc.bg_viewport} />

        <Background>
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
