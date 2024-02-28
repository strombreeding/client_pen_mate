import styled from "styled-components";
import { MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";
import { imgSrc } from "../../assets/img";
import { Fragment, useEffect, useState } from "react";
import Loading from "./Loading";

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
  background-size: cover;
  background-position: center;
`;

// 텍스트 색상 스타일

const GameBg: React.FC<{
  children?: React.ReactNode;
  visible: boolean;
  src: string | undefined;
}> = ({ children, visible, src }) => {
  const [loading, setLoading] = useState(true);
  const onLoad = () => {
    setTimeout(() => setLoading(false), 300);
  };

  if (!src) return <></>;
  return (
    <Fragment>
      <Loading loading={loading} />
      <CenteredImage visible={visible} src={src} onLoad={onLoad} />
    </Fragment>
  );
};

export default GameBg;
