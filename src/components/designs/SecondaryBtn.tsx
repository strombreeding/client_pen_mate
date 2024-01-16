import styled from "styled-components";
import { Text, colors } from "../../styles";
import React, { memo, useEffect, useState } from "react";
import { type BtnStatus } from "../../types";
const LayOut = styled.div<{
  status: BtnStatus;
  exception: boolean | undefined;
}>`
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
  text-align: center;
  justify-content: center;
  width: ${(props) => (props.exception == undefined ? "300px" : "100%")};
  color: ${(props) => (props.color == null ? "black" : props.color)};
  padding: 14px 30px 14px 30px;
  cursor: pointer;
`;

const SecondaryBtn: React.FC<{
  state: BtnStatus;
  text: string;
  onClick?: (event?: any) => void;
  exception?: boolean;
  style?: React.CSSProperties;
}> = ({ state, text, onClick, exception, style }) => {
  const [status, setStatus] = useState<BtnStatus>("disabled");
  useEffect(() => {
    setStatus(state);
  }, [state]);

  const setPressed = () => {
    if (status !== "disabled") setStatus("pressed");
  };
  const setEnd = () => {
    if (status !== "disabled") setStatus("default");
  };
  return (
    <LayOut
      style={style}
      exception={exception}
      onClick={onClick}
      onTouchStart={setPressed}
      onTouchEnd={setEnd}
      onMouseDown={setPressed}
      onMouseUp={setEnd}
      status={status}
    >
      <Text.Headline>{text}</Text.Headline>
    </LayOut>
  );
};

export default React.memo(SecondaryBtn);
