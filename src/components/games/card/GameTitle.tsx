import { Text } from "../../../assets/fontStyles";
import { imgSrc } from "../../../assets/img";
import { View } from "../../../nativeView";
import { GameProps } from "../../../pages/SelectGames";

function GameTitle({
  gameProps,
  style,
}: {
  gameProps: GameProps;
  style?: React.CSSProperties;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        ...style,
      }}
    >
      <Text.Spo_Medium_14>{gameProps.title}</Text.Spo_Medium_14>
    </View>
  );
}

export default GameTitle;
