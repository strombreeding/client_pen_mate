import styled, { keyframes } from "styled-components";
import { imgSrc } from "../assets/img";
import { MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ChangeToWhite = keyframes`
  from {
    background-color: #000000;
  }
  to {
    background-color: #fff;
  }
  `;
const Opacity = keyframes`
  from {
    opacity: 0
  }
  to {
   opacity:0.8
  }
  
`;
const BackgroundView = styled.div<{ loggedIn: boolean }>`
  width: ${SCREEN_WIDTH};
  /* height: 100vh; */
  height: 100vh;
  position: absolute;
  background-color: black;
  animation: ${(props) => (props.loggedIn ? ChangeToWhite : {})} ease-in-out 0.4
    forwards;
  ${(props) =>
    props.loggedIn ? `filter : blur(20px);` : ""}/* filter: blur(20px); */
`;

const ColorView = styled.div<{ loggedIn: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: black;
  opacity: ${(props) => (props.loggedIn ? 0.8 : 0)};
  animation: ${(props) => (props.loggedIn ? ChangeToWhite : {})} ease-in-out
    0.4s forwards;
  animation: ${(props) => (props.loggedIn ? Opacity : {})};
`;
const Background: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.userState.logedIn);
  return (
    <BackgroundView loggedIn={loggedIn}>
      <ColorView loggedIn={loggedIn} />
      {MOBILE && (
        <img
          src={imgSrc.bg}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </BackgroundView>
  );
};

export default Background;
