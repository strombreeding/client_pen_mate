import { useSelector } from "react-redux";
import { Text } from "../assets/fontStyles";
import { imgSrc } from "../assets/img";
import { View } from "../nativeView";
import { EmptyBox } from "../styles";
import { RootState } from "../store/store";
import { memo } from "react";

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
          style={{ width: 20, height: 20, marginTop: 0 }}
        />
        <Text.Spo_Medium_16>{infomation.energy}</Text.Spo_Medium_16>
      </View>
      <EmptyBox width={5} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <img
          src={imgSrc.atata_point}
          style={{ width: 20, height: 20, marginTop: -3 }}
        />
        <Text.Spo_Medium_16>{infomation.atataPoint}</Text.Spo_Medium_16>
      </View>
      <EmptyBox width={5} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <img
          src={imgSrc.atata_un}
          style={{ width: 20, height: 20, marginTop: -3 }}
        />
        <Text.Spo_Medium_16>{infomation.atataStone}</Text.Spo_Medium_16>
      </View>
    </View>
  );
}

export default memo(HeaderPoint);
