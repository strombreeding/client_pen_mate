import styled, { keyframes } from "styled-components";
import { View } from "../nativeView";
import { Container } from "../styles";
import { SCREEN_WIDTH } from "../configs/device";
import { imgSrc } from "../assets/img";
import Login from "../components/join/Login";

import { useState } from "react";
import SignUp from "../components/join/SignUp";
import { usePageState, useVisitedPage } from "../hooks/getVisitedPage";

const BgImg = styled.img`
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
const Logo = styled.img<{ visited: boolean }>`
  width: ${SCREEN_WIDTH * 0.4}px;
  height: ${SCREEN_WIDTH * 0.4613}px;
  position: absolute;
  top: 60%;
  transform: scale(0.5);
  animation: ${(props) => (props.visited ? {} : slide_up_logo)} linear forwards
    0.3s;
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
  opacity: ${(props) => (!props.visited ? 0 : 1)};
  animation: ${(props) => !props.visited && fadeIn} linear 1s forwards;
`;

type PageStep = "login" | "signUp";

function Join() {
  const isVisited = useVisitedPage();
  const [step, setStep] = useState<PageStep>("login");
  const pageState = usePageState();
  const handleStep = (type: PageStep) => {
    setStep(type);
  };
  // safeArea 영역이 잡히는데 어떻게하지..

  return (
    <Container style={{ justifyContent: "space-between" }}>
      <View style={{ alignItems: "center", zIndex: 2 }}>
        <BgImg src={imgSrc.bg_login} />
        <Logo visited={isVisited} src={imgSrc.atata_join} />
      </View>

      <AnimationView
        visited={isVisited}
        style={{ width: "100%", alignItems: "center", marginTop: 20 }}
      >
        {step === "login" ? (
          <SignUp step={step} />
        ) : (
          // ? <Login step={step} />
          // : <SignUp step={step} />}
          <Login step={step} />
        )}
      </AnimationView>

      {/* <BottomNav /> */}
      {/* <EmptyBox height={50} /> */}
    </Container>
  );
}

export default Join;
