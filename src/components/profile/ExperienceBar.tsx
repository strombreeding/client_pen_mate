import styled, { keyframes } from "styled-components";
import { View } from "../../nativeView";
import { colors } from "../../assets/colors";
import { Text } from "../../assets/fontStyles";
interface ExperienceBarProps {
  experience: number;
  maxExperience: number;
  leftText: string;
}
const ExperienceBarContainer = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  height: 30px;
`;

const slide = (width: number) => keyframes`
  from{
    width:0px
  }
  to{
    width:${width}%

  }
`;
const ExperienceProgressBar = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  background-color: rgba(191, 189, 189, 0.5);
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: width 0.3s ease-in-out;
  animation: ${(props) => slide(props.percentage)} linear 300ms forwards;
`;

function ExperienceBar({
  experience,
  maxExperience,
  leftText,
}: ExperienceBarProps) {
  const experiencePercentage = (experience / maxExperience) * 100;

  return (
    <ExperienceBarContainer>
      <ExperienceProgressBar percentage={experiencePercentage}>
        <View style={{ position: "absolute", left: 15 }}>
          <Text.Spo_Light_12>{leftText}</Text.Spo_Light_12>
        </View>
        <View style={{ position: "absolute", right: 15 }}>
          <Text.Spo_Light_12>{`${experience}`}%</Text.Spo_Light_12>
        </View>
      </ExperienceProgressBar>
    </ExperienceBarContainer>
  );
}
export default ExperienceBar;
