import styled, { keyframes } from "styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";
import { Container } from "../../styles";
import { View } from "../../nativeView";
import { Text } from "../../assets/fontStyles";
import { imgSrc } from "../../assets/img";

const bounce = keyframes`
    0%{
        scale: 0.8;
      }
      30%{
        scale: 1.1;
      }
      50%{
        scale: 1;
      }
      70%{
        scale: 1.4;
      }
      90%{
        scale  :1 ;
      }
      100%{
        scale: 0.8;
      }
`;

const fadeOut = keyframes`
  0%{
    opacity: 1;
    display: flex;
  }
50%{
  opacity: 1;
}
60%{
  opacity: 0.7;
}
70%{
  opacity: 0.45;
}
  80%{
    opacity: 0.2;
    display: flex;
  }
  99%{
    opacity: 0.1;
    display: flex;
    
  }
  100%{
    opacity: 0;
    display: none;
    z-index: -10000;
  }
`;

const BgImg = styled.img`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_WIDTH * 0.6}px;
`;
const Logo = styled.img<{ loading: boolean }>`
  /* display: ${(props) => (props.loading ? "" : "none")}; */
  width: ${SCREEN_WIDTH * 0.4}px;
  height: ${SCREEN_WIDTH * 0.4613}px;
  position: absolute;
  top: 40%;
  transform: scale(0.5);
  animation: ${(props) => (props.loading ? bounce : fadeOut)} 1s linear;
  animation-iteration-count: infinite;
`;

const Layer = styled(View)<{ loading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${SCREEN_HEIGHT}px;
  width: ${SCREEN_WIDTH}px;
  align-items: center;
  z-index: 10000;
  background-color: linear-gradient(180deg, #000000 22.92%, #3500a6 100%);
  background-color: black;
  animation: ${(props) => (props.loading ? {} : fadeOut)} 1s linear forwards;
`;
function Loading({ loading }: { loading: boolean }) {
  return (
    <Layer loading={loading} onClick={() => alert("시발럼아")}>
      <BgImg src={imgSrc.bg_login} />
      <Logo loading={loading} src={imgSrc.atata_join} />
    </Layer>
  );
}

export default Loading;
