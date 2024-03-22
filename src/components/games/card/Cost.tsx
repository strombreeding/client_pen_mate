import styled from "styled-components";
import { View } from "../../../nativeView";
import { Text } from "../../../assets/fontStyles";
import { colors } from "../../../assets/colors";
import { imgSrc } from "../../../assets/img";
import { EmptyBox } from "../../../styles";

const Wraper = styled(View)`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px) contrast(30%);
  -webkit-backdrop-filter: blur(2px) contrast(30%);
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

function Cost({ costObj }: { costObj: { type: string; cost: number }[] }) {
  const costSrc: { imgUrl: string; cost: number }[] = [];
  const findInObj = costObj.filter((obj) => {
    const keys = Object.keys(imgSrc);
    const values = Object.values(imgSrc);
    const index = keys.findIndex((key) => key === obj.type);
    costSrc.push({ imgUrl: values[index], cost: obj.cost });
  });
  return (
    <Wraper>
      <Text.Light_12
        color={colors.Accent_Red}
        style={{ marginTop: -3, fontSize: 12 }}
      >
        필요 재화
      </Text.Light_12>
      <EmptyBox height={5} />
      <View
        style={{
          width: "auto%",
          alignItems: "center",
        }}
      >
        {costSrc.map((src, i) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <img
                  key={i}
                  src={src.imgUrl}
                  style={{ width: 18, height: 18 }}
                />
                <EmptyBox width={5} />
                <Text.Light_12 style={{ marginLeft: -2 }}>x</Text.Light_12>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <EmptyBox width={10} />
                <Text.Light_12 style={{ marginLeft: -2 }}>
                  {src.cost}
                </Text.Light_12>
              </View>
            </View>
          );
        })}
      </View>
    </Wraper>
  );
}

export default Cost;
