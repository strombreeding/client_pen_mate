import { Text } from "../../../assets/fontStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../configs/device";
import { Pressable, View } from "../../../nativeView";
import { EmptyBox } from "../../../styles";
import CharBoard from "./CharBoard";
import ControllBoard from "./ControllBoard";
import ActionBtn from "./detail/ActionBtn";

function MainBoard() {
  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: "relative",
      }}
    >
      <EmptyBox height={20} />
      {/* <Text.Light_32>{cnt}</Text.Light_32>
      <CharBoard board={board} obj={obj} />

      <ControllBoard
        ready={ready}
        setReady={setReady}
        nowAction={nowAction}
        setNowAction={setNowAction}
        step={step}
        setStep={setStep}
        board={board}
        obj={obj}
        setBoard={setBoard}
        player={player}
      />

 
      <ActionBtn
        nowAction={nowAction}
        step={step}
        setExecAction={setExecAction}
      /> */}
    </View>
  );
}
