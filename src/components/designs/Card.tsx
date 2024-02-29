import styled, {
  CSSProperties,
  RuleSet,
  css,
  keyframes,
} from "styled-components";
import { View } from "../../nativeView";
import { Container, EmptyBox } from "../../styles";
import { Text } from "../../assets/fontStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { imgSrc } from "../../assets/img";
import { GameProps } from "../../pages/SelectGames";
import { PrevBtn } from "../navigations/BottomPrevNext";
import { setGameSelectState, setGameState } from "../../store/slices/gameState";
import Keyframes from "styled-components/dist/models/Keyframes";
import { useNavigate } from "react-router-dom";
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
    transform: scale(1.45);
      min-height: ${SCREEN_HEIGHT / 1.8}px;
    }
`;
const bigToDefault = keyframes`
    from{
      transform: scale(1.45);
      min-height: ${SCREEN_HEIGHT / 1.8}px;
    }
    to{
      transform: scale(1);
      min-height: ${SCREEN_WIDTH * 0.832}px;
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

interface ICardLayerProps {
  animation: Animations;
}

const CardLayer = styled(View)<ICardLayerProps>`
  position: relative;
  min-width: ${SCREEN_WIDTH * 0.68}px;
  /* max-width: ${SCREEN_WIDTH * 0.68}px; */
  /* min-width: ${SCREEN_WIDTH * 0.68}px; */
  /* width: ${SCREEN_WIDTH * 0.48}px; */
  /* height: ${SCREEN_WIDTH * 0.932}px; */
  /* height: ${SCREEN_WIDTH * 0.832}px; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  /* background-color: white; */
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
    linear 0.2s forwards;
`;

const cardCheck = keyframes`
  from{
    width: 100%;
  }
  to{
    width: 50%;
  }
`;
const cardUnCheck = keyframes`
  from{
    width: 50%;
  }
  to{
    width: 100%;
  }
`;
const CardImg = styled.img<{ choice: boolean }>`
  width: 100%;
  position: relative;
  aspect-ratio: 1;
  animation: ${(props) => (props.choice ? cardCheck : cardUnCheck)} 0.25s linear
    forwards;
`;

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
  const gameState = useSelector(
    (state: RootState) => state.gameState.status.gameTitle
  );
  const gameSelectState = useSelector(
    (state: RootState) => state.gameState.selectState
  );
  const dispatch = useDispatch<AppDispatch>();
  const [animation, setAnimation] = useState<Animations>("");
  const [special, setSpecial] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    let zz = "";

    if (gameSelectState === "choice" && special === false) {
      // to
      setSpecial(true);
      if (selected) {
        zz = "toBigger";
        console.log(zz);

        setAnimation("toBigger");
      } else {
        zz = "toVerySmall";
        setAnimation("toVerySmall");
      }
    }

    //클릭 했었는데 닫기 할때
    else if (gameSelectState === "choice" && special === true) {
      setSpecial(false);
      if (selected) {
        zz = "bigToDefault";
        console.log(zz);

        setAnimation("bigToDefault");
      } else {
        zz = "smallToDefault";
        setAnimation("smallToDefault");
      }
    }

    // 카드 고르는 중
    else if (gameSelectState === "move") {
      setSpecial(false);

      if (selected) {
        zz = "toBig";
        console.log(zz);

        setAnimation("toBig");
      } else {
        zz = "toSmall";
        setAnimation("toSmall");
      }
    } else {
    }
  }, [gameState, selected, gameSelectState]);

  useEffect(() => {
    return () => {
      setSpecial(false);
    };
  }, []);
  return (
    <CardLayer style={{ cursor: "pointer" }} animation={animation}>
      <CardImg
        choice={false}
        style={{ pointerEvents: "none" }}
        src={gameProps.img}
      />

      <EmptyBox height={10} />

      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text.Spo_Medium_14>{gameProps.title}</Text.Spo_Medium_14>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src={imgSrc.atata_un}
              width={20}
              height={20}
              style={{ marginTop: -2 }}
            />
            <Text.Spo_Medium_14>{"+" + gameProps.minReward}</Text.Spo_Medium_14>
          </View>
        </View>

        {gameState !== undefined && (
          <View style={{ width: "100%" }}>
            <Text.Spo_Medium_14>{gameProps.description}</Text.Spo_Medium_14>

            <View style={styles.contentView}>
              <PrevBtn
                onClick={() => {
                  dispatch(setGameState({ gameTitle: undefined }));
                  setSpecial(true);
                }}
              >
                <Text.Light_12>{"이전"}</Text.Light_12>
              </PrevBtn>
              <EmptyBox width={5} />
              <PrevBtn
                onClick={() => {
                  navigation(`/games/sachunsung`);
                }}
              >
                <Text.Light_12>시작</Text.Light_12>
              </PrevBtn>
            </View>
          </View>
        )}
      </View>
    </CardLayer>
  );
};

export default GameCard;

const styles: {
  [key: string]: CSSProperties;
} = {
  contentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
};
