import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, EmptyBox } from "../styles";
import { colors } from "../assets/colors";
import { ScrollView, View } from "../nativeView";
import { imgSrc } from "../assets/img";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import styled from "styled-components";
import { Text } from "../assets/fontStyles";
import WorkStatus from "../components/reward/WorkStatus";
import PointData from "../components/reward/PointData";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import { gameImg } from "../assets/gameImg";

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

export interface IRewardProps {
  _id: string;
  cost_obj: { type: string; cost: number }[];
  game_result: string;
  game_special_option: string;
  game_title: string;
  play_at: Date;
  play_time: number; //sec
  player_id: string;
  rewards: { item_name: string; cnt: number }[];
  bounti?: boolean;
}

function Reward() {
  const location = useLocation();
  const [gameState, setGameState] = useState<IRewardProps>({} as IRewardProps);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const gameData: IRewardProps = location.state.data;
    console.log(gameData);
    setGameState(gameData);
    setReady(true);
  }, []);

  console.log(location);
  const dispatch = useDispatch<AppDispatch>();

  if (!ready) return <></>;
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
          <PointData reward={gameState} />

          <EmptyBox height={15} />

          {/* <WorkStatus reward={gameState} /> */}

          <EmptyBox height={15} />

          {/* 리워드 */}
          <View style={{ width: "100%" }}>
            <Text.Regular_20 style={{ alignSelf: "flex-start" }}>
              Game Rewards
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
                {gameState.rewards.map((item, i) => {
                  console.log(item);
                  return (
                    <View
                      key={i}
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
                      <img
                        src={
                          //@ts-ignore
                          imgSrc[item.item_name] == null
                            ? //@ts-ignore
                              gameImg[item.item_name]
                            : //@ts-ignore
                              imgSrc[item.item_name]
                        }
                        style={{ width: 20 }}
                      />
                      <Text.Spo_Light_12>{item.cnt}</Text.Spo_Light_12>
                    </View>
                  );
                })}
              </View>
            </GameResultView>
          </View>
          <EmptyBox height={10} />

          {/* 코스트 */}
          <View style={{ width: "100%" }}>
            <Text.Regular_20 style={{ alignSelf: "flex-start" }}>
              Consum
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
                {gameState.cost_obj.map((item, i) => {
                  console.log(item);

                  return (
                    <View
                      key={i}
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
                      <img
                        src={
                          //@ts-ignore
                          imgSrc[item.type] == null
                            ? //@ts-ignore
                              gameImg[item.type]
                            : //@ts-ignore
                              imgSrc[item.type]
                        }
                        style={{ width: 20 }}
                      />
                      <EmptyBox height={5} />
                      <Text.Spo_Light_12>{item.cost}</Text.Spo_Light_12>
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
