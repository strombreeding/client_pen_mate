import styled from "styled-components";
import { Text, colors } from "../../styles";
import React, { memo, useEffect, useState } from "react";
import { type BtnStatus } from "../../types";
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
  width: calc(100% * 0.88888);
  color: ${(props) => (props.color == null ? "black" : props.color)};
  padding: 14px 30px 14px 30px;
`;

const SecondaryBtn: React.FC<{
  state: BtnStatus;
  text: string;
  onClick?: (event?: any) => void;
}> = ({ state, text, onClick }) => {
  const [status, setStatus] = useState<BtnStatus>("disabled");
  useEffect(() => {
    setStatus(state);
  }, [state]);
  return (
    <LayOut
      onMouseDown={() => {
        if (status !== "disabled") setStatus("pressed");
      }}
      onMouseUp={() => {
        if (status !== "disabled") setStatus("default");
        if (onClick) {
          onClick();
        }
      }}
      status={status}
    >
      <Text.Headline>{text}</Text.Headline>
    </LayOut>
  );
};

export default React.memo(SecondaryBtn);
