import { useSelector } from "react-redux";
import { gameImg } from "../../../../assets/gameImg";
import { SCREEN_WIDTH } from "../../../../configs/device";
import { View } from "../../../../nativeView";
import { IWillAction } from "../../../../pages/Test";
import { RootState } from "../../../../store/store";

interface IActionStateProp {
  nowAction: IWillAction[];
  targetAction: IWillAction[];
  player: "A" | "B";
}

function ActionState({ player, nowAction, targetAction }: IActionStateProp) {
  const step = useSelector((state: RootState) => state.bangState.step);
  if (player === "A") {
    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <img
          src={
            nowAction[0].action === "공격"
              ? gameImg.target
              : nowAction[0].action === "회피"
              ? gameImg.action_jump
              : gameImg.empty
          }
          style={{
            backgroundColor:
              step === 0 && nowAction[0].action !== ""
                ? "rgba(255,255,255,0.3)"
                : "",
            width: SCREEN_WIDTH * 0.09,
            height: SCREEN_WIDTH * 0.09,
          }}
        />
        <img
          src={
            nowAction[1].action === "공격"
              ? gameImg.target
              : nowAction[1].action === "회피"
              ? gameImg.action_jump
              : gameImg.empty
            // gameImg.action_jump
          }
          style={{
            backgroundColor:
              step === 1 && nowAction[1].action !== ""
                ? "rgba(255,255,255,0.3)"
                : "",
            width: SCREEN_WIDTH * 0.09,
            height: SCREEN_WIDTH * 0.09,
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <img
        src={
          targetAction[0].action === "공격"
            ? gameImg.target
            : targetAction[0].action === "회피"
            ? gameImg.action_jump
            : gameImg.empty
        }
        style={{
          backgroundColor:
            step === 0 && targetAction[0].action !== ""
              ? "rgba(255,255,255,0.3)"
              : "",
          width: SCREEN_WIDTH * 0.09,
          height: SCREEN_WIDTH * 0.09,
        }}
      />
      <img
        src={
          targetAction[1].action === "공격"
            ? gameImg.target
            : targetAction[1].action === "회피"
            ? gameImg.action_jump
            : gameImg.empty
        }
        style={{
          backgroundColor:
            step === 1 && targetAction[1].action !== ""
              ? "rgba(255,255,255,0.3)"
              : "",
          width: SCREEN_WIDTH * 0.09,
          height: SCREEN_WIDTH * 0.09,
        }}
      />
    </View>
  );
}

export default ActionState;
