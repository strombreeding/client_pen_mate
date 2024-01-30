import { Fragment, useEffect, useRef, useState } from "react";
import Routers from "./Router";
import {
  GlobalStyle,
  FadeInPopup,
  FadeOutPopup,
  SafeArea,
  EmptyBox,
} from "./styles";
import { SERVER_URI } from "./configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import styled from "styled-components";
import { setSafeArea, showModal, showPopup } from "./store/slices/appState";
import { IOS } from "./configs/device";
import Background from "./pages/Background";

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
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        event.preventDefault();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        event.preventDefault();
      }
    };
    const containerElement = containerRef.current;

    if (containerElement) {
      containerElement.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      containerElement.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("touchstart", handleTouchStart);
        containerElement.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);
  useEffect(() => {
    // window.addEventListener("popstate", (e) => {
    //   alert("나갈꺼냐?");
    //   e.preventDefault();
    // });
    // window.addEventListener("beforeunload", (e) => {
    //   // alert("나갈꺼냐?");
    //   dispatch(showPopup(true));
    //   e.preventDefault();
    // });
  }, []);

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

  const canScroll = useSelector((state: RootState) => state.appState.overFlow);

  return (
    <SafeArea safearea={safeArea}>
      {/* {popupState && <BG onClick={() => console.log()} show={popupState} />} */}
      {/* {popupState && <BG onClick={unShowPopup} show={popupState} />} */}
      <Background></Background>
      <GlobalStyle canScroll={canScroll} />
      <Routers />
    </SafeArea>
  );
}

export default App;
