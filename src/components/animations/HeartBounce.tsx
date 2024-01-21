import styled, { keyframes } from "styled-components";
import { imgSrc } from "../../assets/img";

const Bounce = keyframes`
  0%{
    opacity: 0.3;
    transform: scale(0.1);
  }
  40%{
    opacity: 1;
    transform: scale(1.2);
  }
  60%{
    opacity: 1;
    transform: scale(1);
  }
  80%{
    opacity: 1;
    transform: scale(1.1);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
`;
const BounceHeart = styled.img<{ vis: boolean }>`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 100px;
  right: 100px;
  left: 100px;
  animation: ${Bounce} linear 0.5s;
`;

const HeartBounce: React.FC<{ vis: boolean }> = ({ vis }) => {
  return <BounceHeart src={imgSrc.heart_fill} vis={vis} />;
};

export default HeartBounce;
