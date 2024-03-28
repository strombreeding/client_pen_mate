import { useSelector } from "react-redux";
import { Text } from "../assets/fontStyles";
import { imgSrc } from "../assets/img";
import { View } from "../nativeView";
import { EmptyBox } from "../styles";
import { RootState } from "../store/store";
import { memo } from "react";
import { addK } from "../utils/randomCnt";

function HeaderPoint() {
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <EmptyBox width={5} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <img
          src={imgSrc.energy}
          style={{ width: 20, height: 20, marginTop: 0, marginRight: -2 }}
        />
        <Text.Spo_Medium_16>{addK(infomation.energy)}</Text.Spo_Medium_16>
      </View>
      <EmptyBox width={5} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <img
          src={imgSrc.atata_stone}
          style={{ width: 20, height: 20, marginTop: -3, marginRight: -2 }}
        />
        <Text.Spo_Medium_16>{addK(infomation.atata_stone)}</Text.Spo_Medium_16>
      </View>

      <EmptyBox width={5} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <img
          src={imgSrc.atata_point}
          style={{ width: 20, height: 20, marginTop: -3, marginRight: -2 }}
        />
        <Text.Spo_Medium_16>{addK(infomation.atata_point)}</Text.Spo_Medium_16>
      </View>
    </View>
  );
}

export default memo(HeaderPoint);
