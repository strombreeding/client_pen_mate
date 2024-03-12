import { EvpKDF } from "crypto-js";
import { Text } from "../../../assets/fontStyles";
import { gameImg } from "../../../assets/gameImg";
import { imgSrc } from "../../../assets/img";
import { View } from "../../../nativeView";
import { Ablilty, IStatusProps } from "../../../pages/Bang";

interface Props {
  player: "A" | "B";
  status: IStatusProps;
  ability: Ablilty;
  tartgetAbility: Ablilty;
  type: "A" | "B";
}

function PlayerInterface({
  player,
  status,
  ability,
  tartgetAbility,
  type,
}: Props) {
  return (
    <View style={{ alignItems: type === "A" ? "flex-start" : "flex-end" }}>
      <Text.Light_16>
        {player === type ? status.me.nickname : status.you.nickname}
      </Text.Light_16>
      <View style={{ flexDirection: "row" }}>
        {player === type
          ? Array(status.me.health)
              .fill(0)
              .map(() => <img src={imgSrc.heart_fill} style={{ width: 15 }} />)
          : Array(status.you.health)
              .fill(0)
              .map(() => <img src={imgSrc.heart_fill} style={{ width: 15 }} />)}
      </View>
      <View style={{ flexDirection: "row" }}>
        {player === type
          ? Array(status.me.subHealth)
              .fill(0)
              .map(() => <img src={imgSrc.sub_health} style={{ width: 15 }} />)
          : Array(status.you.subHealth)
              .fill(0)
              .map(() => <img src={imgSrc.sub_health} style={{ width: 15 }} />)}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <img src={gameImg.action_atk} style={{ width: 16, marginTop: -5 }} />
        <Text.Light_16>
          {player === type ? ability.atk : tartgetAbility.atk}
        </Text.Light_16>
      </View>
      <Text.Light_16>
        {player === type ? ability.skil : tartgetAbility.skil}
      </Text.Light_16>
    </View>
  );
}

export default PlayerInterface;
