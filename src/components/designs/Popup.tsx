import styled, { keyframes } from "styled-components";
import { EmptyBox, Text, colors } from "../../styles";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { showPopup } from "../../store/slices/appState";
import { SCREEN_HEIGHT } from "../../configs/device";

const Popup: React.FC<{
  title: string;
  content: string;
  leftText: string;
  rightText: string;
  mission?: boolean;
  rightBtnAction: () => any;
}> = ({ title, content, leftText, rightText, rightBtnAction, mission }) => {
  const popupState = useSelector((state: RootState) => state.appState.popup);
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState(popupState);
  const cancelBtn = () => {
    setState(false);
    setTimeout(() => {
      dispatch(showPopup(false));
    }, 50);
  };
  const action = () => {
    if (mission) {
      rightBtnAction();
    }
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
      <BtnContainer>
        <SecondaryBtn
          style={{ marginRight: 10 }}
          exception={true}
          onClick={cancelBtn}
          text={leftText}
          state={"default"}
        />
        <PrimaryBtn
          exception={true}
          onClick={action}
          text={rightText}
          state={"default"}
        />
      </BtnContainer>
    </View>
  );
};

export default Popup;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: red;
`;
const FadeIn = keyframes`
    from{
        transform: scale(0.1);
        opacity: 0;
    }
    to{
        transform: scale(1);
        opacity: 1;
    }
    `;

const FadeOut = keyframes`
    from{
        opacity: 1;
    }
    to{
        opacity: 0;
    }
`;

const View = styled.div<{ show: boolean }>`
  position: absolute;
  top: ${(props) =>
    props.show ? SCREEN_HEIGHT / 3 - 20 : SCREEN_HEIGHT + 200}px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 46px 20px 20px 20px;
  border: 1px solid ${colors.Grey200};
  border-radius: 30px;
  background-color: white;
  opacity: ${(props) => (props.show ? 1 : 2)};
  animation: ${(props) => (props.show ? FadeIn : FadeOut)} linear 0.2s forwards;
  z-index: 2;
`;
