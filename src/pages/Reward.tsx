import { useEffect, useState } from "react";
import { getDecryptedCookie } from "../utils/cookies";
import { useLocation } from "react-router-dom";
import { Container, EmptyBox } from "../styles";
import { colors } from "../assets/colors";
import { ScrollView, View } from "../nativeView";
import { imgSrc } from "../assets/img";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setBgImg } from "../store/slices/appState";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import styled from "styled-components";
import { Text } from "../assets/fontStyles";
import ChevronRight from "../components/designs/20px/ChevronRight";
import ArrowRight26 from "../components/designs/26px/ArrowRight_26";
import ExperienceBar from "../components/profile/ExperienceBar";
import WorkStatus from "../components/reward/WorkStatus";
import PointData from "../components/reward/PointData";
import BottomPrevNext from "../components/navigations/BottomPrevNext";

const GameDataView = styled(View)`
  width: 100%;
  padding: 30px 16px 30px 16px;
  align-items: center;
  display: flex;
  flex: 1;
`;

const GameResultView = styled(View)`
  width: 100%;
  height: 100px;
  padding: 20px 20px 20px 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

function Reward() {
  const location = useLocation();
  const [reward, setReward] = useState({
    id: location.state.data.id,
    gameTitle: "고철장",
    score: "작업끝", // 뱅 승|패 고철장 작업끝 반물질 재단끝
    point1: 512,
    point2: "작업량 12  레벨",
    nickname: "easynee_",
    prevAp: 1000,
    currentAP: 0,
    result: ["운석", "반물질", "AP"],
  });
  const req = async () => {
    const gameData = location.state.data;
    // 게임데이타를 백엔드에 보내면 게임 ID 별로 맞는 점수환산 가져올거임. 그걸 SetState해야함
  };
  console.log(location);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {}, []);
  return (
    <Container style={{ flex: 1, backgroundColor: colors.Background2 }}>
      <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <img
          src={imgSrc.bg_reward}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.7,
          }}
        />
      </View>
      <ScrollView style={{ width: "100%", height: SCREEN_HEIGHT - 96.45 }}>
        <GameDataView>
          <PointData reward={reward} />

          <EmptyBox height={15} />

          <WorkStatus reward={reward} />

          <EmptyBox height={40} />

          <View style={{ width: "100%" }}>
            <Text.Regular_20 style={{ alignSelf: "flex-start" }}>
              Game Result
            </Text.Regular_20>
            <EmptyBox height={10} />

            <GameResultView>
              <View
                style={{
                  display: "grid",
                  gridTemplateColumns: " repeat(auto-fill, minmax(40px, 1fr))",
                  gap: 10,
                }}
              >
                {reward.result.map((item, i) => {
                  console.log(item);
                  return (
                    <View
                      style={{
                        width: 50,
                        aspectRatio: 1,
                        border: "1px solid white",
                        borderRadius: 15,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text.Spo_Light_12>{item}</Text.Spo_Light_12>
                    </View>
                  );
                })}
              </View>
            </GameResultView>
          </View>
        </GameDataView>
      </ScrollView>

      <BottomPrevNext justHome visible={true} />
    </Container>
  );
}

export default Reward;
