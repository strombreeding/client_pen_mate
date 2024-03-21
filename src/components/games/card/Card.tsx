import styled, { keyframes } from "styled-components";
import { View } from "../../../nativeView";
import { EmptyBox } from "../../../styles";
import { Text } from "../../../assets/fontStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../configs/device";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { GameProps } from "../../../pages/SelectGames";
import CardBottomBtn from "./CardBottomBtn";
import GameTitle from "./GameTitle";
import GameOption from "./GameOption";
import Shake from "../../animations/Shake";
import LoadingLottie from "../../LoadingLottie";
import { imgSrc } from "../../../assets/img";
import { colors } from "../../../assets/colors";
import RewardItems from "./RewardItems";
import GameDescription from "./GameDescription";

interface ICardLayerProps {
  animation: Animations;
}

type Animations =
  | "toBig"
  | "toSmall"
  | "toBigger"
  | "toVerySmall"
  | "bigToDefault"
  | "smallToDefault"
  | "";

const GameCard: React.FC<{
  gameProps: GameProps;
  selected: boolean;
}> = ({ gameProps, selected }) => {
  // const [selected] = useState(focused ===index ||)
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const gameSelectState = useSelector(
    (state: RootState) => state.gameState.selectState
  );
  const [animation, setAnimation] = useState<Animations>("");
  const [special, setSpecial] = useState(false);

  useEffect(() => {
    if (gameSelectState === "choice" && special === false) {
      // to
      setSpecial(true);
      if (selected) {
        setAnimation("toBigger");
      } else {
        setAnimation("toVerySmall");
      }
    }

    //클릭 했었는데 닫기 할때
    else if (gameSelectState === "choice" && special === true) {
      setSpecial(false);
      if (selected) {
        setAnimation("bigToDefault");
      } else {
        setAnimation("smallToDefault");
      }
    }

    // 카드 고르는 중
    else if (gameSelectState === "move") {
      setSpecial(false);

      if (selected) {
        setAnimation("toBig");
      } else {
        setAnimation("toSmall");
      }
    } else {
    }
  }, [gameState.gameTitle, selected, gameSelectState]);

  useEffect(() => {
    return () => {
      setSpecial(false);
    };
  }, []);

  return (
    <CardLayer style={{ cursor: "pointer" }} animation={animation}>
      <CardImg
        choice={gameState.gameTitle}
        style={{ pointerEvents: "none" }}
        src={gameProps.img}
      />

      <EmptyBox height={10} />

      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          width: "100%",
          flexDirection: "column",
        }}
      >
        <GameTitle gameProps={gameProps} />
        {gameState.gameTitle !== undefined && <EmptyBox height={9} />}

        {gameState.gameTitle !== undefined && (
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <GameDescription description={gameProps.description} />

            <EmptyBox height={10} />

            <RewardItems rewards={gameProps.rewards} />
            {/* 게임 옵션. 현재는 개발 리소스 부족으로 보류 */}
            {/* <GameOption gameProps={gameProps} /> */}
            <EmptyBox height={10} />

            <CardBottomBtn gameProps={gameProps} setSpecial={setSpecial} />
          </View>
        )}
      </View>
    </CardLayer>
  );
};

export default memo(GameCard);

const toSmall = keyframes`
  from{
    transform: scaleY(1);
  }
  to{
    transform: scaleY(0.8);
  }
  `;
const toVerySmall = keyframes`
  from{
    transform: scale(0.65);
  }
  to{
    transform: scale(0);
}
`;
const toBigger = keyframes`
    from{
      transform: scale(1);
      min-height: ${SCREEN_WIDTH * 0.832}px;
    }
    to{
    transform: scale(1.30);
      min-height: ${SCREEN_HEIGHT / 2}px;
    }
`;
const bigToDefault = keyframes`
    from{
      transform: scale(1.45);
      /* min-height: ${SCREEN_HEIGHT / 1.8}px; */
      min-height: ${SCREEN_HEIGHT / 2}px;
    }
    to{
      transform: scale(1);
      min-height:auto;
    }
`;
const smallToDefault = keyframes`
    from{
      transform: scaleX(0) scaleY(0.8);
    }
    to{
      transform: scaleX(1) scaleY(0.8);
    }
`;
const toBig = keyframes`
    from{
    transform: scaleY(0.8);
  }
  to{
    transform: scaleY(1);
  }
`;
const CardLayer = styled(View)<ICardLayerProps>`
  position: relative;
  min-width: ${SCREEN_WIDTH * 0.68}px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  animation: ${(props) =>
      props.animation === "bigToDefault"
        ? bigToDefault
        : props.animation === "smallToDefault"
        ? smallToDefault
        : props.animation === "toBig"
        ? toBig
        : props.animation === "toBigger"
        ? toBigger
        : props.animation === "toSmall"
        ? toSmall
        : props.animation === "toVerySmall"
        ? toVerySmall
        : {}}
    linear 0.25s forwards;
`;

const cardCheck = keyframes`
  from{
    width: 100%;
  }
  to{
    width: 30%;
  }
`;
const cardUnCheck = keyframes`
  from{
    width: 30%;
  }
  to{
    width: 100%;
  }
`;
const CardImg = styled.img<{ choice: string | undefined }>`
  width: 100%;
  position: relative;
  aspect-ratio: 1;
  animation: ${(props) =>
      props.choice === undefined
        ? cardUnCheck
        : props.choice.length > 0
        ? cardCheck
        : cardUnCheck}
    0.25s linear forwards;
`;
