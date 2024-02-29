import styled, { keyframes } from "styled-components";
import { View } from "../../nativeView";
import React from "react";

const slideDown = keyframes`
  from{
    bottom: -1px;
  }
  to{
    bottom: -300px;
  }
`;
const slideUp = keyframes`
  from{
    bottom: -100px;
  }
  to{
    bottom: -1px;
  }
`;

const BottomBtnBox = styled(View)<{ visible: boolean }>`
  position: absolute;
  bottom: -300px;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding: 25px 20px 25px 20px;
  border-radius: 50px 50px 0px 0px;
  box-shadow: 0px -5px 30px rgba(41, 39, 130, 0.2),
    inset 0px 1.5px 0.5px rgba(255, 255, 255, 0.5);

  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50px 50px 0px 0px;
  backdrop-filter: blur(10px) contrast(60%);
  -webkit-backdrop-filter: blur(10px) contrast(60%);
  animation: ${(props) => (props.visible ? slideUp : slideDown)} linear 0.55s
    forwards;
`;

const Layer = styled.div`
  /* background-color: white; */
  background-color: rgba(0, 0, 0, 0.2);
  /* background-color: rgba(255, 255, 255, 0.2); */
  position: absolute;
  top: 0.7px;
  left: 0;
  right: 0;
  border-radius: 50px 50px 0 0;
  width: 100%;
  height: 100%;
  /* backdrop-filter: blur(10px) contrast(50%);
    -webkit-backdrop-filter: blur(10px) contrast(60%); */

  will-change: transform;
`;

function BottomNavLayer({
  children,
  style,
  visible,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  visible: boolean;
}) {
  return (
    <BottomBtnBox style={style} visible={visible}>
      <Layer />
      {children}
    </BottomBtnBox>
  );
}

export default React.memo(BottomNavLayer);
