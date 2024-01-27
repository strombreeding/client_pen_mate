import styled, { keyframes } from "styled-components";
import { imgSrc } from "../assets/img";
import { MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

const ChangeToWhite = keyframes`
  from {
    background-color: #000000;
  }
  to {
    background-color: #fff;
  }
  `;
const ChangeToBlack = keyframes`
  from {
    background-color: #fff;
  }
  to {
    background-color: #000000;
  }
  `;
const Opacity = keyframes`
  from {
    opacity: 0.8
  }
  to {
   opacity:0.8
  }
  
`;
const WhiteView = styled.div`
  width: ${SCREEN_WIDTH};
  height: 100vh;
  position: absolute;
  background-color: white;
  filter: blur(8px);
`;
const BlackView = styled.div`
  width: ${SCREEN_WIDTH};
  height: 100vh;
  position: absolute;
  background-color: black;
`;
// ${(props) => props.loggedIn && "opacity: 0;"}
const ColorView = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.8;
  animation: ${ChangeToWhite} ease-in-out 0.1s forwards;
  animation: ${Opacity} ease-in-out 0.1s forwards;
`;
const Background: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.userState.logedIn);
  const thisPage = window.location.href;
  const signUp = thisPage.includes("sign-up");
  const signIn = thisPage.includes("sign-in");
  console.log("백그라운드 이미지 온 ? ", signUp, signIn);

  if (signUp) {
    return (
      <WhiteView>
        <ColorView />
        {MOBILE && (
          <img
            src={imgSrc.bg}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </WhiteView>
    );
  } else if (signIn) {
    return (
      <BlackView>
        {MOBILE && (
          <img
            src={imgSrc.bg}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </BlackView>
    );
  } else {
    return <WhiteView></WhiteView>;
  }
};

export default Background;
