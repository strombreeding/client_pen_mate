import styled from "styled-components";
import { Text, colors } from "../../styles";
import React from "react";
type BtnStatus = "default" | "pressed" | "disabled";
const LayOut = styled.div<{ status: BtnStatus }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "default":
        return colors.Grey1100;
      case "pressed":
        return colors.Black;
      case "disabled":
        return colors;
    }
    return;
  }};
  padding: 14px 30px 14px 30px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  width: calc(100% * 0.8333);
  color: ${colors.White};
`;

const PrimaryBtn: React.FC<{
  bgColor?: string;
  status: BtnStatus;
  text: string;
}> = ({ bgColor, status, text }) => {
  return (
    <LayOut status={status}>
      <Text.Headline>{text}</Text.Headline>
    </LayOut>
  );
};

export default React.memo(PrimaryBtn);
