import styled, { css, keyframes } from "styled-components";
import { View } from "../../nativeView";
import { Container, EmptyBox } from "../../styles";
import { Text } from "../../assets/fontStyles";
import { SCREEN_WIDTH } from "../../configs/device";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
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
    transform: scale(0.8);
    
  }
  to{
    transform: scale(0);

  }
`;
const toHalf = keyframes`
    from{
      top:0;
      transform: scale(1);
      opacity: 1;
    }
    to{
      top: -10%;
      transform: scale(5);
      opacity: 0;
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
const antimationToHalf = css`
  animation: ${toHalf} 0.3s linear forwards;
`;
const antimationToSmall = css`
  animation: ${toVerySmall} 0.2s linear forwards;
`;
interface ICardLayerProps {
  selected: boolean;
  choiced: boolean;
  state: "choice" | "wait";
}

const CardLayer = styled(View)<ICardLayerProps>`
  position: relative;
  min-width: ${SCREEN_WIDTH * 0.68}px;
  /* min-width: ${SCREEN_WIDTH * 0.68}px; */
  /* width: ${SCREEN_WIDTH * 0.48}px; */
  /* height: ${SCREEN_WIDTH * 0.932}px; */
  height: ${SCREEN_WIDTH * 0.832}px;
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
  animation: ${(props) => (props.selected ? toBig : toSmall)} linear 0.25s
    forwards;
  /* ${(props) => props.choiced && `background-color:  #304FFE`}; */
  ${(props) =>
    props.state === "choice" && props.selected
      ? antimationToHalf
      : !props.selected && props.state === "choice"
      ? antimationToSmall
      : {}}
`;

const CardImg = styled.img`
  width: 100%;
  aspect-ratio: 1;
`;

const GameCard: React.FC<{
  img: any;
  title: string | undefined;
  selected: boolean;
  choiceTitle: boolean;
  description: string;
}> = ({ img, title, selected, choiceTitle, description }) => {
  // const [selected] = useState(focused ===index ||)
  const gameState = useSelector(
    (state: RootState) => state.gameState.status.gameTitle
  );

  console.log("카드컴포넌트", gameState);
  return (
    <CardLayer
      style={{ cursor: "pointer" }}
      selected={selected}
      choiced={choiceTitle}
      state={gameState === undefined ? "wait" : "choice"}
    >
      <CardImg style={{ pointerEvents: "none" }} src={img} />

      <EmptyBox height={10} />

      <View style={{ justifyContent: "space-between", height: "100%" }}>
        <View>
          <Text.Spo_Medium_14>{title}</Text.Spo_Medium_14>
        </View>

        <View>
          <Text.Spo_Medium_14>{description}</Text.Spo_Medium_14>
        </View>
      </View>
    </CardLayer>
  );
};

export default GameCard;
