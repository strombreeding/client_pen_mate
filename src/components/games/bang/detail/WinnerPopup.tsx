//

import styled from "styled-components";
import { View } from "../../../../nativeView";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Text } from "../../../../assets/fontStyles";
import { EmptyBox } from "../../../../styles";
import { PrevBtn } from "../../../navigations/BottomPrevNext";
import { colors } from "../../../../assets/colors";

const Wraper = styled(View)`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  z-index: 10000011111;
  background-color: rgba(0, 0, 0, 0.3);

  align-items: center;
  justify-content: center;
`;

const Box = styled(View)`
  position: absolute;
  top: 31%;
  left: 5%;
  right: 5%;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  min-height: ${150}px;
  border: 0.5px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px) contrast(30%);
  -webkit-backdrop-filter: blur(10px) contrast(30%);

  border-radius: 15px;
`;

export interface IBangPopupProps {
  show: boolean;
  title: string;
  description: string;
  rightAction: (data?: any) => void;
  leftAction: (data?: any) => void;
  setPopupState: Dispatch<SetStateAction<IBangPopupProps>>;
}

function WinnerPopup(popupState: IBangPopupProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  // leftText =
  //   leftText == null ? "취소" : leftText;

  useEffect(() => {
    if (!boxRef.current) return;
  }, []);

  if (!popupState.show) return <></>;
  return (
    <Wraper>
      <Box ref={boxRef}>
        <View style={{ alignItems: "center" }}>
          <Text.Regular_24>{popupState.title}</Text.Regular_24>

          <EmptyBox height={25} />
          <Text.Regular_16>{popupState.description}</Text.Regular_16>
          <EmptyBox height={35} />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <>
            <PrevBtn
              onClick={() => {
                popupState.leftAction();
                popupState.setPopupState({
                  description: "",
                  leftAction: () => {},
                  rightAction: () => {},
                  setPopupState: () => {},
                  show: false,
                  title: "",
                });
              }}
            >
              <Text.Light_16>{"무자비"}</Text.Light_16>
            </PrevBtn>
            <EmptyBox width={5} />
          </>
          <PrevBtn
            onClick={() => {
              popupState.rightAction();
              popupState.setPopupState({
                description: "",
                leftAction: () => {},
                rightAction: () => {},
                setPopupState: () => {},
                show: false,
                title: "",
              });
            }}
            style={{ backgroundColor: colors.Main_Button1 }}
          >
            <Text.Light_16>{"자비"}</Text.Light_16>
          </PrevBtn>
        </View>
      </Box>
    </Wraper>
  );
}

export default WinnerPopup;
