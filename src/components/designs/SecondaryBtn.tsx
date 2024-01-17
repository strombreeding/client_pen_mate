import styled from "styled-components";
import { Text, colors } from "../../styles";
import React, { memo, useEffect, useState } from "react";
import { type BtnStatus } from "../../types";
import { MOBILE } from "../../configs/device";
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
  padding: 14px 30px 14px 30px;
  border-radius: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  max-width: ${MOBILE ? "100%" : "320px"};
  min-width: ${MOBILE ? "" : "320px"};
  display: flex;
  cursor: pointer;
  position: relative;
`;
const BtnContainer = styled.div`
  display: flex;
  position: fixed;
  right: 20px;
  left: 20px;
  align-items: center;
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
    <>
      {!exception ? (
        <BtnContainer>
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
            <Text.Headline color={colors.Grey1100}>{text}</Text.Headline>
          </LayOut>
        </BtnContainer>
      ) : (
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
          <Text.Headline color={colors.Grey1100}>{text}</Text.Headline>
        </LayOut>
      )}
    </>
  );
};

export default React.memo(SecondaryBtn);
