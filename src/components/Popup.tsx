import styled from "styled-components";
import { View } from "../nativeView";
import { useEffect, useRef } from "react";
import { SCREEN_WIDTH } from "../configs/device";
import { Text } from "../assets/fontStyles";
import { PrevBtn } from "./navigations/BottomPrevNext";
import { EmptyBox } from "../styles";
import { colors } from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setPopup } from "../store/slices/appState";

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

interface IPopupProps {
  title: string;
  description: string;
  rightText: string;
  leftText?: string;
  rightSubText?: string;
  rightAction: (data?: any) => void;
}

function Popup() {
  const popupState = useSelector((state: RootState) => state.appState.popup);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  // popupState.leftText =
  //   popupState.leftText == null ? "취소" : popupState.leftText;

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
          {popupState.leftText != null && (
            <>
              <PrevBtn
                onClick={() =>
                  dispatch(setPopup({ ...popupState, show: false }))
                }
              >
                <Text.Light_16>{popupState.leftText}</Text.Light_16>
              </PrevBtn>
              <EmptyBox width={5} />
            </>
          )}
          <PrevBtn
            onClick={popupState.rightAction}
            style={{ backgroundColor: colors.Main_Button1 }}
          >
            <Text.Light_16>{popupState.rightText}</Text.Light_16>
            <Text.Light_12>{popupState.rightSubText}</Text.Light_12>
          </PrevBtn>
        </View>
      </Box>
    </Wraper>
  );
}

export default Popup;
