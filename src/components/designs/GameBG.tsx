import styled from "styled-components";
import { MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";
import { imgSrc } from "../../assets/img";

// Linear Gradient 스타일
const LinearBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

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
const CenteredImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  margin: 0 auto; /* 가운데 정렬을 위한 스타일 */
  opacity: 1; /* 이미지의 투명도 */
  background-size: cover;
  background-position: center;
`;

// 텍스트 색상 스타일

const GameBg: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <LinearBackground>
      <CenteredImage src={imgSrc.bg_game} />
      {children}
    </LinearBackground>
  );
};

export default GameBg;
