import styled from "styled-components";
import { Text, colors } from "../../styles";
import React, { memo } from "react";
type BtnStatus = "default" | "pressed" | "disabled";
const LayOut = styled.div<{ bgColor?: any; status: BtnStatus }>`
  background-color: ${colors.White};
  border: ${(props) => {
    let result = "solid 1px ";
    switch (props.status) {
      case "default":
        result = result + colors.Grey200;
        break;
      case "pressed":
        result = result + colors.Black;
        break;
      case "disabled":
        result = result + colors.Grey100;
        break;
    }
    return result;
  }};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  width: calc(100% * 0.8333);
  color: ${(props) => (props.color == null ? "black" : props.color)};
  padding: 14px 30px 14px 30px;
`;

const SecondaryBtn: React.FC<{
  status: BtnStatus;
  text: string;
}> = ({ status, text }) => {
  return (
    <LayOut status={status}>
      <Text.Headline>{text}</Text.Headline>
    </LayOut>
  );
};

export default React.memo(SecondaryBtn);
