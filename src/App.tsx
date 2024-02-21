import { useEffect, useRef, useState } from "react";
import Routers from "./Router";
import { GlobalStyle, SafeArea } from "./styles";
import { SERVER_URI } from "./configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import styled from "styled-components";
import { setSafeArea, showModal } from "./store/slices/appState";
import { IOS, MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "./configs/device";
import { Viewport } from "./nativeView";
import { imgSrc } from "./assets/img";
import { colors } from "./assets/colors";
import GameBg from "./components/designs/GameBG";
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
  const popupState = useSelector((state: RootState) => state.appState.popup);
  const modalState = useSelector((state: RootState) => state.appState.modal);
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);
  const receiveRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(SERVER_URI);
  console.log(window.innerHeight);

  const dispatch = useDispatch<AppDispatch>();
  const unShowPopup = () => {
    setTimeout(() => {
      dispatch(showModal(false));
    }, 300);
  };
  // useEffect(() => {
  //   const handleTouchStart = (event: TouchEvent) => {
  //     if (event.touches.length >= 2) {
  //       event.preventDefault();
  //     }
  //   };

  //   const handleTouchMove = (event: TouchEvent) => {
  //     if (event.touches.length >= 2) {
  //       event.preventDefault();
  //     }
  //   };
  //   const containerElement = containerRef.current;

  //   if (containerElement) {
  //     containerElement.addEventListener("touchstart", handleTouchStart, {
  //       passive: false,
  //     });
  //     containerElement.addEventListener("touchmove", handleTouchMove, {
  //       passive: false,
  //     });
  //   }

  //   return () => {
  //     if (containerElement) {
  //       containerElement.removeEventListener("touchstart", handleTouchStart);
  //       containerElement.removeEventListener("touchmove", handleTouchMove);
  //     }
  //   };
  // }, []);

  const [req, setReq] = useState(0);

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
  console.log(imgSrc.bg_game);
  return (
    <SafeArea safearea={safeArea}>
      <Viewport bgUrl={imgSrc.bg_viewport} />

      <Background>
        <GlobalStyle canScroll={canScroll} />
        <Routers />
      </Background>
    </SafeArea>
  );
}

/* 

*/
const Background = styled.div<{ bg?: any }>`
  position: sticky;
  top: 0;
  display: flex;
  width: ${MOBILE ? SCREEN_WIDTH + "px" : "20%"};
  min-width: 360px;
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
