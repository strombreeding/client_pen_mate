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

function RewardItems({ rewards }: { rewards: string[] }) {
  const imgSrcList: string[] = [];
  const findInObj = rewards.filter((img) => {
    const keys = Object.keys(imgSrc);
    const values = Object.values(imgSrc);
    const index = keys.findIndex((key) => key === img);
    imgSrcList.push(values[index]);
  });

  return (
    <Wraper>
      <Text.Light_12
        color={colors.Accent}
        style={{ marginTop: -3, fontSize: 12 }}
      >
        보상
      </Text.Light_12>
      <EmptyBox height={5} />

      <View style={{ flexDirection: "row", flex: 1 }}>
        {imgSrcList.map((img, i) => {
          return <img key={i} src={img} style={{ width: 18, height: 18 }} />;
        })}
      </View>
    </Wraper>
  );
}

export default RewardItems;
