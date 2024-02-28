import { useEffect } from "react";
import Routers from "./Router";
import { EmptyBox, GlobalStyle, SafeArea } from "./styles";
import { SERVER_URI } from "./configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import styled from "styled-components";
import { setSafeArea } from "./store/slices/appState";
import { IOS, SCREEN_HEIGHT, SCREEN_WIDTH } from "./configs/device";
import { Viewport } from "./nativeView";
import { imgSrc } from "./assets/img";
import GameBg from "./components/designs/GameBG";
import { usePageState } from "./hooks/getVisitedPage";
import { useSafeAreaSize } from "./hooks/getSafeAreaSize";
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

  const bgImg = useSelector((state: RootState) => state.appState.bgImg);
  const canPopstate = useSelector(
    (state: RootState) => state.appState.canPopstateEvent
  );
  // const popupState = useSelector((state: RootState) => state.appState.popup);
  // const modalState = useSelector((state: RootState) => state.appState.modal);
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);
  // const receiveRef = useRef(false);
  // const containerRef = useRef<HTMLDivElement>(null);
  console.log(SERVER_URI);
  console.log(window.innerHeight);
  console.log(window.innerWidth);
  useSafeAreaSize();
  // const dispatch = useDispatch<AppDispatch>();

  const dispatch = useDispatch<AppDispatch>();
  const choiceTitle = useSelector(
    (state: RootState) => state.gameState.status.gameTitle
  );
  useEffect(() => {
    // 여기서 리덕스로 히스토리를 잡아 그냥 계속.
    const state = () => {
      alert(canPopstate);
      console.log("이건 메인APP", canPopstate);
      if (canPopstate) {
        window.history.go(0);
      } else {
        window.history.go(1);
      }
    };
    window.addEventListener("popstate", state);

    return () => {
      window.removeEventListener("popstate", state);
    };
  }, []);
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

    //   if (IOS) {
    //     window.addEventListener("message", readDataFromReactNative);
    //   } else if (!IOS) {
    //     //@ts-ignore
    //     document.addEventListener("message", readDataFromReactNative);
    //   }

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

  // useEffect(() => {
  //   const preventGoBack = () => {
  //     console.log("popstate 이벤트 발생", canPopstate);
  //     if (canPopstate) {
  //       console.log("뒤로갈 수 있는 페이지");
  //     } else {
  //       console.log("뒤로갈 수 없는 페이지임니다!!");
  //       window.history.pushState(null, "", window.location.href);
  //     }

  //     // console.log("ㅎㅇㅎㅇ");
  //     // if (window.confirm("뒤로 가렽?")) {
  //     //   console.log(window.history.state);
  //     //   window.history.go(-1);
  //     // } else {
  //     //   console.log(window.history.state);
  //     // }
  //   };

  //   window.addEventListener("popstate", preventGoBack);
  //   return () => window.removeEventListener("popstate", preventGoBack);
  //   return () => {
  //     //@ts-ignore
  //     document.removeEventListener("message", readDataFromReactNative);
  //     window.removeEventListener("message", readDataFromReactNative);
  //   };
  //   // return () =>
  // }, []);

  const canScroll = false;
  console.log(imgSrc.bg_game);
  return (
    <SafeArea>
      <Viewport src={imgSrc.bg_viewport} />

      <Background>
        <GameBg visible={bgImg !== undefined} src={bgImg} />
        <EmptyBox
          height={safeArea[0]}
          width={SCREEN_WIDTH}
          style={{ zIndex: 100 }}
        />
        <GlobalStyle canScroll={canScroll} />
        <Routers />
      </Background>
    </SafeArea>
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
