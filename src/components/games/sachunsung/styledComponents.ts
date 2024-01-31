import styled from "styled-components";
import { MOBILE } from "../../../configs/device";

export const Card = styled.div<{ clicked: boolean; success: boolean }>`
  width: 25px;
  height: 25px;
  margin: 0.5px;
  background-color: ${(props) => (props.clicked ? "#868181" : "#cecbcb")};
  text-align: center;
  display: flex;
  opacity: ${(props) => (props.success ? 0 : 1)};
  align-items: center;
  pointer-events: ${(props) => (props.success ? "none" : "auto")};
  justify-content: center;
  ${!MOBILE &&
  `&:hover {
        background-color: #868181;
        cursor: pointer;
      }`}
`;

export const RowBoard = styled.div`
  display: flex;
  flex-direction: row;
`;
