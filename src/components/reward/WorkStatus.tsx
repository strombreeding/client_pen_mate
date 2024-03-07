import { Text } from "../../assets/fontStyles";
import { View } from "../../nativeView";
import { EmptyBox } from "../../styles";
import ExperienceBar from "../profile/ExperienceBar";

function WorkStatus({ reward }: { reward: any }) {
  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%" }}>
        <Text.Light_12>주간 작업현황</Text.Light_12>
        <EmptyBox height={3} />
        <ExperienceBar
          experience={10}
          maxExperience={1000}
          leftText={reward.gameTitle}
        />
        <EmptyBox height={10} />
        <Text.Light_12>주간 작업현황</Text.Light_12>
        <EmptyBox height={3} />
        <ExperienceBar
          experience={10}
          maxExperience={1000}
          leftText={reward.gameTitle}
        />
        <EmptyBox height={10} />
        <Text.Light_12>주간 작업현황</Text.Light_12>
        <EmptyBox height={3} />
        <ExperienceBar
          experience={10}
          maxExperience={1000}
          leftText={reward.gameTitle}
        />
      </View>
    </View>
  );
}

export default WorkStatus;
