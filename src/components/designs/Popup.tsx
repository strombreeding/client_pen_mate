import styled from "styled-components";
import { EmptyBox, Text, colors } from "../../styles";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { showPopup } from "../../store/slices/appState";
import { SCREEN_HEIGHT } from "../../configs/device";
import { SlideDown, SlideUp } from "../../animations";

const View = styled.div<{ show: boolean }>`
  position: absolute;
  top: ${(props) =>
    props.show ? SCREEN_HEIGHT / 3 - 20 : SCREEN_HEIGHT + 200}px;
  width: 300px;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 46px 20px 20px 20px;
  border: 1px solid ${colors.Grey200};
  border-radius: 30px;
  background-color: white;
  animation: ${(props) => (props.show ? SlideUp : SlideDown)} ease-in-out 0.5s;
  z-index: 2;
`;

const Popup: React.FC<{
  title: string;
  content: string;
  leftText: string;
  rightText: string;
  rightBtnAction: () => any;
}> = ({ title, content, leftText, rightText, rightBtnAction }) => {
  const popupState = useSelector((state: RootState) => state.appState.popup);
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState(popupState);
  const cancelBtn = () => {
    setState(false);
    setTimeout(() => {
      dispatch(showPopup(false));
    }, 500);
  };
  return (
    <View show={state}>
      <div>
        <EmptyBox height={10} />
        <Text.Title3>{title}</Text.Title3>
        <EmptyBox height={10} />
      </div>
      <div>
        <EmptyBox height={10} />
        <Text.Subhead color={colors.Grey500} style={{ textAlign: "center" }}>
          {content}
        </Text.Subhead>
        <EmptyBox height={10} />
      </div>
      <EmptyBox height={20} />
      <EmptyBox height={10} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <SecondaryBtn
          exception={true}
          onClick={cancelBtn}
          text={leftText}
          state={"default"}
          style={{ marginRight: 10 }}
        />
        <PrimaryBtn
          exception={true}
          onClick={rightBtnAction}
          text={rightText}
          state={"default"}
        />
      </div>
    </View>
  );
};

export default Popup;
