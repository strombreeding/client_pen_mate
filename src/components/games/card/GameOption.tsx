import { memo, useState } from "react";
import { Text } from "../../../assets/fontStyles";
import { Pressable, View } from "../../../nativeView";
import { GameProps } from "../../../pages/SelectGames";
import { colors } from "../../../assets/colors";
import { EmptyBox } from "../../../styles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setGameState } from "../../../store/slices/gameState";

const AI_OPTION = ["초보", "중수", "고수", "신"];

function GameOption({ gameProps }: { gameProps: GameProps }) {
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const [matchType, setMatchType] = useState(gameState.matchType);
  const [player, setPlayer] = useState(gameState.player);
  const [aiOption, setAiOption] = useState("초보");

  const dispatch = useDispatch<AppDispatch>();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text.Spo_Light_14>게임 옵션</Text.Spo_Light_14>

      <EmptyBox height={8} />

      <View style={{ flexDirection: "row" }}>
        {gameProps.matchType.map((type, i) => (
          <OptionBtn
            selected={type === matchType}
            onClick={() => {
              setMatchType(type);
              dispatch(
                setGameState({
                  matchType: type,
                })
              );
            }}
          >
            <Text.Light_12 style={{ fontSize: 10 }}>{type}</Text.Light_12>
          </OptionBtn>
        ))}
      </View>

      <EmptyBox height={8} />

      <View style={{ flexDirection: "row" }}>
        {gameProps.player.map((item, i) => (
          <OptionBtn
            selected={item === player}
            onClick={() => {
              setPlayer(item);
              dispatch(
                setGameState({
                  player: item,
                })
              );
            }}
          >
            <Text.Light_12 style={{ fontSize: 10 }}>{item}</Text.Light_12>
          </OptionBtn>
        ))}
      </View>

      <EmptyBox height={10} />

      <View style={{ flexDirection: "row" }}>
        {player === "AI" &&
          AI_OPTION.map((option, i) => (
            <AiOptions
              selected={option === aiOption}
              onClick={() => {
                setAiOption(option);
                dispatch(setGameState({ aiOption: option }));
              }}
            >
              <Text.Light_12 style={{ fontSize: 10 }}>{option}</Text.Light_12>
            </AiOptions>
          ))}
      </View>
    </View>
  );
}

export default GameOption;

const AiOptions = styled(Pressable)<{ selected: boolean }>`
  margin: 0px 2px 0px 2px;
  border-radius: 50px;
  padding: 10px;
  width: 40px;
  height: 18px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.selected ? colors.Pale_Puple : "transparent"};
  border: ${(props) => (props.selected ? "" : "solid 0.5px white")};
`;

const OptionBtn = styled(Pressable)<{ selected: boolean }>`
  margin: 0px 3px 0px 3px;
  border-radius: 50px;
  padding: 14px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.selected ? colors.Pale_Puple : "transparent"};
  border: ${(props) => (props.selected ? "" : "solid 0.5px white")};
`;
