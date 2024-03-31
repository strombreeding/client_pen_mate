import { useSelector } from "react-redux";
import { colors } from "../../assets/colors";
import { Text } from "../../assets/fontStyles";
import { imgSrc } from "../../assets/img";
import { View } from "../../nativeView";
import { IRewardProps } from "../../pages/Reward";
import { EmptyBox } from "../../styles";
import { RootState } from "../../store/store";
import { addK } from "../../utils/randomCnt";

function PointData({ reward }: { reward: IRewardProps }) {
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  const asCnt =
    reward.rewards.find((item) => item.item_name === "atata_stone")?.cnt! ==
    null
      ? 0
      : reward.rewards.find((item) => item.item_name === "atata_stone")?.cnt!;
  console.log(reward.skul);
  return (
    <View style={{ alignItems: "center" }}>
      <img src={imgSrc.star} style={{ width: 60, aspectRatio: 1 }} />

      <EmptyBox height={10} />

      <Text.Regular_36>{reward.game_result}</Text.Regular_36>

      <EmptyBox height={10} />

      <View style={{ flexDirection: "row" }}>
        <Text.Regular_32 color={colors.Accent}>
          {reward.game_special_option}
        </Text.Regular_32>
      </View>

      <EmptyBox height={10} />

      <Text.Regular_20 color="#F828B1">{reward.play_time}초</Text.Regular_20>

      <EmptyBox height={15} />

      <Text.Regular_16></Text.Regular_16>

      <EmptyBox height={10} />

      <View style={{ flexDirection: "row" }}>
        <img
          src={imgSrc.atata_stone}
          style={{ width: 20, height: 20, marginTop: -3.5 }}
          alt=""
        />
        <Text.Regular_16>
          {infomation.atata_stone! -
            (reward.bounti ? asCnt + reward.skul * 200 : asCnt)}
        </Text.Regular_16>
        <img
          src={imgSrc.right_arrow}
          style={{ width: 20, aspectRatio: 1, marginTop: -3.5 }}
        />
        <Text.Regular_16>{infomation.atata_stone}</Text.Regular_16>
        <Text.Regular_16 color={colors.Accent}>
          (+
          {reward.bounti ? asCnt + reward.skul * 200 : asCnt})
        </Text.Regular_16>
      </View>
    </View>
  );
}

export default PointData;
