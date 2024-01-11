import styled from "styled-components";
import { Text, colors } from "../../styles";
import React, { useEffect, useState } from "react";
import { BtnStatus } from "../../types";
const LayOut = styled.div<{ status: BtnStatus }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "default":
        return colors.Grey1100;
      case "pressed":
        return colors.Black;
      case "disabled":
        return colors.Grey300;
    }
    return;
  }};
  padding: 14px 30px 14px 30px;
  border-radius: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: calc(100% * 0.88888);
  color: ${colors.White};
`;

const PrimaryBtn: React.FC<{
  bgColor?: string;
  text: string;
  state: BtnStatus;
  onClick?: (event: any) => void;
}> = ({ bgColor, text, state, onClick }) => {
  const [status, setStatus] = useState<BtnStatus>("disabled");
  useEffect(() => {
    setStatus(state);
  }, [state]);

  return (
    <LayOut
      onClick={onClick}
      onMouseDown={() => {
        if (status !== "disabled") setStatus("pressed");
      }}
      onMouseUp={() => {
        if (status !== "disabled") setStatus("default");
      }}
      status={status}
    >
      <Text.Headline color="white">{text}</Text.Headline>
    </LayOut>
  );
};

export default React.memo(PrimaryBtn);
