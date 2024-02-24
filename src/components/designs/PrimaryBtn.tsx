import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BtnStatus } from "../../types";
import { MOBILE } from "../../configs/device";
import { colors } from "../../assets/colors";
import { Text } from "../../assets/fontStyles";
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
  display: flex;
  padding: 14px 30px 14px 30px;
  border-radius: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  max-width: ${MOBILE ? "100%" : "320px"};
  min-width: ${MOBILE ? "" : "320px"};
  color: ${colors.White};
  cursor: pointer;
  position: relative;
  right: 0;
`;

const BtnContainer = styled.div`
  display: flex;
  position: fixed;
  right: 20px;
  left: 20px;
  align-items: center;
`;

const PrimaryBtn: React.FC<{
  text: string;
  state: BtnStatus;
  onClick?: (event: any) => void;
  exception?: boolean;
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
    <>
      {!exception ? (
        <BtnContainer style={style}>
          <LayOut
            exception={exception}
            onClick={onClick}
            onTouchStart={setPressed}
            onTouchEnd={setEnd}
            onMouseDown={setPressed}
            onMouseUp={setEnd}
            status={status}
          >
            <Text.Spo_Medium_18 color="white">{text}</Text.Spo_Medium_18>
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
          <Text.Spo_Medium_18 color="white">{text}</Text.Spo_Medium_18>
        </LayOut>
      )}
    </>
  );
};

export default React.memo(PrimaryBtn);
