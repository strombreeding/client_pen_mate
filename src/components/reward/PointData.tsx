import { colors } from "../../assets/colors";
import { Text } from "../../assets/fontStyles";
import { imgSrc } from "../../assets/img";
import { View } from "../../nativeView";
import { EmptyBox } from "../../styles";

function PointData({ reward }: { reward: any }) {
  return (
    <View style={{ alignItems: "center" }}>
      <img src={imgSrc.star} style={{ width: 60, aspectRatio: 1 }} />

      <EmptyBox height={10} />

      <Text.Regular_36>{reward.score}</Text.Regular_36>

      <EmptyBox height={10} />

      <View style={{ flexDirection: "row" }}>
        <Text.Regular_32 color={colors.Accent}>{reward.point1}</Text.Regular_32>
      </View>

      <EmptyBox height={10} />

      <Text.Regular_20 color="#F828B1">{reward.point2}</Text.Regular_20>

      <EmptyBox height={15} />

      <Text.Regular_16>easynee__</Text.Regular_16>

      <EmptyBox height={10} />

      <View style={{ flexDirection: "row" }}>
        <img
          src={imgSrc.atata_stone}
          style={{ width: 20, height: 20, marginTop: -3.5 }}
          alt=""
        />
        <Text.Regular_16>{reward.prevAp}</Text.Regular_16>
        <img
          src={imgSrc.right_arrow}
          style={{ width: 20, aspectRatio: 1, marginTop: -3.5 }}
        />
        <Text.Regular_16>{reward.prevAp + reward.point1}</Text.Regular_16>
        <Text.Regular_16 color={colors.Accent}>
          (+{reward.point1})
        </Text.Regular_16>
      </View>
    </View>
  );
}

export default PointData;
