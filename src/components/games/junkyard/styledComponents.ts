import styled, { keyframes } from "styled-components";
import { MOBILE, SCREEN_WIDTH } from "../../../configs/device";
interface ICardPorps {
  clicked: boolean;
  success: boolean;
  processed?: boolean;
}
const flash = keyframes`
  0%{
    background-color: rgba(143,187,247,0.09);
  }
  50%{
    background-color: rgba(143,187,247,0.7);
  }
  100%{
    background-color: rgba(143,187,247,0.09);
  }
`;
export const Card = styled.div<ICardPorps>`
  width: ${SCREEN_WIDTH * 0.0833333333333333}px;
  aspect-ratio: 1;
  background-color: ${(props) =>
    props.success
      ? "rgba(143,187,247,0.09)"
      : props.clicked
      ? "rgba(143,187,247,0.3)"
      : "rgba(143,187,247,0.8)"};
  /* background-color: rgba(42, 200, 204, 0.5); */
  backdrop-filter: blur(0.8px) contrast(100%);
  -webkit-backdrop-filter: blur(0.8px) contrast(100%);
  /* border: 1px solid transparent; */
  border: 0.1px solid rgba(143, 187, 247, 0.2);
  display: flex;
  /* opacity: ${(props) => (props.success ? 0 : 1)}; */
  align-items: center;
  pointer-events: ${(props) => (props.success ? "none" : "auto")};
  justify-content: center;
  animation: ${(props) => (props.processed ? flash : {})} linear 0.1s forwards;
  ${!MOBILE &&
  `&:hover {
        background-color: rgba(143,187,247,0.5);
        cursor: pointer;
      }`}
`;

export const RowBoard = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
