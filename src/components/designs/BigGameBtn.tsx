import React, { memo, useState } from "react";
import { imgSrc } from "../../assets/img";
import { Pressable, View } from "../../nativeView";
import styled, { keyframes } from "styled-components";
import { BtnStatus } from "../../types";
import { isMobile } from "react-device-detect";
import { SCREEN_WIDTH } from "../../configs/device";
import { useNavigate } from "react-router-dom";

const BtnContainer = styled.div<{ status: BtnStatus }>`
  transform: scale(${(props) => (props.status === "pressed" ? 1.03 : 1)});
  ${!isMobile &&
  `:hover {
      transform: scale(1.03);
    }`}

  cursor: pointer;
`;
const Btn = styled.img`
  width: calc(100% * 0.6666667);
  height: calc(100% * 0.727777778);
  align-self: center;
`;

const BigGameBtn = () => {
  const [language] = useState("ko");
  const [status, setStatus] = useState<BtnStatus>("default");

  const setPressed = () => {
    if (status !== "disabled") setStatus("pressed");
  };
  const setEnd = () => {
    if (status !== "disabled") setStatus("default");
  };

  const navigation = useNavigate();
  const onPress = () => {
    navigation("/games");
  };

  return (
    <BtnContainer
      status={status}
      onTouchStart={setPressed}
      onTouchEnd={setEnd}
      onMouseDown={setPressed}
      onMouseUp={setEnd}
    >
      <Pressable onClick={onPress}>
        <Btn
          src={
            language === "ko" ? imgSrc.polygon_big_ko : imgSrc.polygon_big_en
          }
        />
      </Pressable>
    </BtnContainer>
  );
};

export default memo(BigGameBtn);
