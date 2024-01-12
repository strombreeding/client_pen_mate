import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useCountryFromLocation from "./hooks/getCountry";
import Routers from "./Router";
import { BrowserView, MobileOnlyView, isMobile } from "react-device-detect";
import { GlobalStyle, Background } from "./styles";
import { CLIENT_URI, SERVER_URI } from "./configs/server";

function App() {
  const [isBrowser] = useState(!isMobile);
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(isBrowser);
  console.log(SERVER_URI);
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
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    // return () => document.body.removeChild(script);

    return () => window.sessionStorage.setItem("App", "1");
  }, []);
  const shareToKakao = () => {
    //@ts-ignore
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_JS_KEY);
    }

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "***님이 편지를 전송했어요",
        describe: "***님의 정성을 확인해보러 가실까요?",
        imageUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDA4MTZfOTQg/MDAxNTk3NTM2MzM1ODE2.SUFLHsAUlgQWdBLs1bFkYx8d6gTojXA7RBk3swoSq74g.vWy_0TFOcixv9M-672xFCqe4ZzypQZauiGLxcesliVQg.PNG.munjatime/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C2.PNG?type=w800",
        link: {
          mobileWebUrl: CLIENT_URI,
        },
      },
      buttons: [
        {
          title: "확인하러 가기",
          link: {
            mobileWebUrl: CLIENT_URI,
          },
        },
      ],
    });
  };
  return (
    <Fragment>
      <GlobalStyle />
      <Background>
        {isBrowser ? (
          // <BrowserView>
          <Routers isMobile={false} />
        ) : (
          // </BrowserView>
          // {/* <MobileOnlyView> */}
          <Routers isMobile={true} />
          // </MobileOnlyView>
        )}
      </Background>
    </Fragment>
  );
}

export default App;
