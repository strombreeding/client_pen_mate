import styled, { keyframes } from "styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";
import { Container } from "../../styles";
import { View } from "../../nativeView";
import { Text } from "../../assets/fontStyles";
import { imgSrc } from "../../assets/img";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
  /* 0%{
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
    
  } */
  /* 100%{
    opacity: 0;
    display: none;
    z-index: -10000;
  } */
  from{
    background-color: rgba(0,0,0,1);
  }
  to{
    background-color: rgba(0,0,0,0);
    z-index: -1000;
  }
`;
const fadeIn = keyframes`
  from{
    opacity: 0;
    display: flex;
  }
  to{
    opacity: 1;
    display: flex;
  }
`;
const hide = keyframes`
  0%{
    display: none;
  }
  100%{
    display: none;
  }
`;
const BgImg = styled.img<{ loading: boolean }>`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_WIDTH * 0.6}px;
  animation: ${(props) => (props.loading ? {} : hide)} 0.25s linear forwards;
`;
const Logo = styled.img<{ loading: boolean }>`
  /* display: ${(props) => (props.loading ? "" : "none")}; */
  width: ${SCREEN_WIDTH * 0.4}px;
  height: ${SCREEN_WIDTH * 0.4613}px;
  position: absolute;
  top: 40%;
  transform: scale(0.5);
  animation: ${(props) => (props.loading ? bounce : hide)} 1s linear;
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
  background-color: black;
  animation: ${(props) => (props.loading ? {} : fadeOut)} 0.25s linear forwards;
`;
function Loading() {
  const loading = useSelector((state: RootState) => state.appState.loading);
  useEffect(() => {}, []);
  console.log(loading, "로딩");
  return (
    <Layer loading={loading}>
      <BgImg loading={loading} src={imgSrc.bg_login} />
      <Logo loading={loading} src={imgSrc.atata_join} />
    </Layer>
  );
}

export default memo(Loading);
