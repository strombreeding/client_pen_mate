import { Fragment, useEffect, useRef } from "react";
import Routers from "./Router";
import { GlobalStyle, Background, FadeInPopup, FadeOutPopup } from "./styles";
import { SERVER_URI } from "./configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import styled from "styled-components";
import { showPopup } from "./store/slices/appState";

const BG = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
  cursor: pointer;
  animation: ${(props) => (props.show ? FadeInPopup : FadeOutPopup)} ease-in-out
    0.3s;
`;

function App() {
  const popupState = useSelector((state: RootState) => state.appState.popup);
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(SERVER_URI);
  console.log(window.innerHeight);

  const dispatch = useDispatch<AppDispatch>();
  const unShowPopup = () => {
    dispatch(showPopup(false));
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

  return (
    <Fragment>
      <GlobalStyle />
      {popupState && <BG onClick={unShowPopup} show={popupState} />}
      <Background>
        <Routers />
      </Background>
    </Fragment>
  );
}

export default App;
