import styled, { keyframes } from "styled-components";
import { View } from "../nativeView";
import { Container, EmptyBox } from "../styles";
import { SCREEN_WIDTH } from "../configs/device";
import { imgSrc } from "../assets/img";
import Login from "../components/join/Login";

import { useState } from "react";
import SignUp from "../components/join/SignUp";
import { usePageState, useVisitedPage } from "../hooks/getVisitedPage";
import SoundPressable from "../components/designs/SoundPressable";
import { Text } from "../assets/fontStyles";

const BgImg = styled.img`
  position: fixed;
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_WIDTH * 0.6}px;
`;

const slide_up_logo = keyframes`
  from {
    top:100%;
    scale: 1;
  }
  to{
    top:60%;
    scale: 0.5;
  }
`;

const down_logo = keyframes`
  from{
    top:40%
    
  }
  to{
    top:200px;
    transform: scale(0.4);
  }
`;
const Logo = styled.img<{ visited: boolean }>`
  position: fixed;
  width: ${SCREEN_WIDTH * 0.4}px;
  height: ${SCREEN_WIDTH * 0.4613}px;
  position: absolute;
  top: 40%;
  transform: scale(0.5);
  animation: ${down_logo} linear 0.5s forwards;
  /* transform: scale(0.5); */
  /* animation: ${(props) =>
    props.visited ? {} : slide_up_logo} linear forwards
    0.3s; */
`;

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;
const AnimationView = styled(View)<{ visited: boolean }>`
  display: flex;
  /* opacity: ${(props) => (!props.visited ? 0 : 1)}; */
  animation: ${fadeIn} linear 0.5s forwards;
`;

const BgView = styled(View)`
  position: fixed;
  align-items: center;
  z-index: 2;
`;
function Join() {
  const isVisited = useVisitedPage();
  const [step, setStep] = useState<string>(window.location.pathname);
  const pageState = usePageState();
  const handleStep = (type: string) => {
    setStep(type);
  };
  // safeArea 영역이 잡히는데 어떻게하지..

  return (
    <Container style={{ flex: 1, justifyContent: "space-between" }}>
      <BgImg src={imgSrc.bg_login} />
      {/* <BgView> */}
      {/* <Logo visited={isVisited} src={imgSrc.atata_join} /> */}
      {/* </BgView> */}
      <EmptyBox height={10} />
      <EmptyBox height={10} />
      <EmptyBox height={10} />
      <EmptyBox height={10} />
      <EmptyBox height={10} />
      <AnimationView
        visited={!isVisited}
        style={{ width: "100%", alignItems: "center", marginTop: 20 }}
      >
        {step === "/login" ? (
          <Login step={step} />
        ) : (
          // ? <Login step={step} />
          // : <SignUp step={step} />}
          <SignUp step={step} />
        )}
      </AnimationView>
      <EmptyBox height={10} />

      {/* <BottomNav /> */}
      {/* <EmptyBox height={50} /> */}
    </Container>
  );
}

export default Join;
