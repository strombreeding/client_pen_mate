import styled from "styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";
import { Fragment, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setLoading } from "../../store/slices/appState";

// Linear Gradient 스타일
const LinearBackground = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: -1;
  width: ${SCREEN_WIDTH + "px"};
  min-width: 360px;
  max-width: 760px;
  height: ${SCREEN_HEIGHT}px;
  max-height: ${SCREEN_HEIGHT}px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 22.92%,
    rgba(53, 0, 166, 0.3) 100%
  );
  background-color: #211134;
`;

// 이미지 스타일
const CenteredImage = styled.img<{ visible: boolean }>`
  display: ${(prosp) => (prosp.visible ? "auto" : "none")};
  width: 100%;
  height: ${SCREEN_HEIGHT}px;
  position: absolute;
  top: 0;
  margin: 0 auto; /* 가운데 정렬을 위한 스타일 */
  opacity: 1; /* 이미지의 투명도 */
  /* z-index: 0; */
  background-size: contain;
  background-position: center;
`;

// 텍스트 색상 스타일

const GameBg: React.FC<{
  children?: React.ReactNode;
  visible: boolean;
  src: string | undefined;
}> = ({ children, visible, src }) => {
  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log("로딩시작");
    if (!src) return;
    dispatch(setLoading(true));
  }, [src]);

  const onLoad = () => {
    console.log("로딩종료");
    setTimeout(() => dispatch(setLoading(false)), 600);
  };

  const onLoadStart = () => {};

  if (!src) return <></>;

  return <CenteredImage visible={visible} src={src} onLoad={onLoad} />;
};

export default memo(GameBg);
