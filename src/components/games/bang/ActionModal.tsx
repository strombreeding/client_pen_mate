import styled from "styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../configs/device";
import { Pressable, View } from "../../../nativeView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setNowAction } from "../../../store/slices/bangState";
import { Dispatch, SetStateAction } from "react";
import { gameImg } from "../../../assets/gameImg";

const ActionContainer = styled(View)`
  position: absolute;
  height: ${SCREEN_HEIGHT};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  /* border: 0.5px solid rgba(255, 255, 255, 0.5); */
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px) contrast(90%);
  -webkit-backdrop-filter: blur(2px) contrast(90%);
  z-index: 100;
`;

const ActionBtn = styled(Pressable)`
  display: flex;
  border: 2px solid rgba(255, 255, 255, 0.5);
  /* background-color: rgba(0, 0, 0, 0.8); */
  background-color: rgba(145, 255, 0, 0.797);

  border-radius: 100px;
  padding: 10px;
  margin: ${SCREEN_WIDTH * 0.08}px;
  /* backdrop-filter: blur(15px) contrast(100%);
  -webkit-backdrop-filter: blur(15px) contrast(40%); */
  /* width: ${SCREEN_WIDTH * 0.4}px;
  height: ${SCREEN_WIDTH * 0.4}px; */
  align-items: center;
  justify-content: center;
`;

const ActionImg = styled.img`
  width: ${SCREEN_WIDTH * 0.2777777777777778}px;
  height: ${SCREEN_WIDTH * 0.2777777777777778}px;
`;
function ActionModal({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const nowAction = useSelector(
    (state: RootState) => state.bangState.nowAction
  );
  const step = useSelector((state: RootState) => state.bangState.step);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <ActionContainer>
      <ActionBtn
        style={{
          display:
            nowAction[0].action === "공격" || nowAction[1].action === "공격"
              ? "none"
              : "flex",
        }}
        onClick={() => {
          const copy = [...nowAction];
          copy[step].action = "공격";
          dispatch(setNowAction(copy));
          setModal(false);
          // setStep(step+1)
        }}
      >
        <ActionImg src={gameImg.action_atk} />
      </ActionBtn>
      <ActionBtn
        style={{
          display:
            nowAction[0].action === "회피" || nowAction[1].action === "회피"
              ? "none"
              : "flex",
        }}
        onClick={() => {
          const copy = [...nowAction];
          copy[step].action = "회피";
          setNowAction(copy);
          setModal(false);
          // setStep(step+1)
        }}
      >
        <ActionImg src={gameImg.action_jump} />
      </ActionBtn>
    </ActionContainer>
  );
}

export default ActionModal;