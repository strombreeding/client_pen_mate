import styled from "styled-components";
import { Text, colors } from "../../styles";
import React, { useEffect, useState } from "react";
import { BtnStatus } from "../../types";
const LayOut = styled.div<{
  status: BtnStatus;
  exception: boolean | undefined;
}>`
  background-color: ${(props) => {
    switch (props.status) {
      case "default":
        return colors.Grey1100;
      case "pressed":
        return colors.Black;
      case "disabled":
        return colors.Grey300;
    }
  }};
  padding: 14px 30px 14px 30px;
  border-radius: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: ${(props) => (props.exception == undefined ? "300px" : "100%")};
  color: ${colors.White};
  cursor: pointer;
`;

const PrimaryBtn: React.FC<{
  text: string;
  state: BtnStatus;
  onClick?: (event: any) => void;
  exception?: true;
  style?: React.CSSProperties;
}> = ({ text, state, onClick, exception, style }) => {
  const [status, setStatus] = useState<BtnStatus>("disabled");
  useEffect(() => {
    console.log(state);
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
      <Text.Headline color="white">{text}</Text.Headline>
    </LayOut>
  );
};

export default React.memo(PrimaryBtn);
