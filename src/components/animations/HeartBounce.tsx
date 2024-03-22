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
  display: flex;
  width: 20px;
  height: 20px;
  animation: ${(props) => (props.vis ? Bounce : {})} linear 0.5s;
`;

const HeartBounce: React.FC<{ vis: boolean }> = ({ vis }) => {
  return (
    <BounceHeart src={vis ? imgSrc.heart_fill : imgSrc.heart_un} vis={vis} />
  );
};

export default HeartBounce;
