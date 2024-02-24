import styled, { keyframes } from "styled-components";
import { View } from "../../nativeView";
import { Container, EmptyBox } from "../../styles";
import { Text } from "../../assets/fontStyles";
import { SCREEN_WIDTH } from "../../configs/device";

const toSmall = keyframes`
  from{
    /* height: ${SCREEN_WIDTH * 0.68}px; */
    transform: scaleY(1);
  }
  to{
    transform: scaleY(0.8);
    /* height: ${(SCREEN_WIDTH * 0.68) / 2}px; */
  }
  `;
const toBig = keyframes`
  from{
    transform: scaleY(0.7);
    /* height: ${(SCREEN_WIDTH * 0.68) / 2}px; */
    
  }
  to{
    transform: scaleY(1);
    /* height: ${SCREEN_WIDTH * 0.68}px; */

  }
`;

const CardLayer = styled(View)<{ selected: boolean }>`
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
  animation: ${(props) => (props.selected ? {} : toSmall)} linear 0.25s forwards;
  /* animation: ${(props) => props.selected !== true && toSmall} linear 0.3s; */
  /* forwards; */
`;
console.log(SCREEN_WIDTH * 0.68);

const CardImg = styled.img`
  width: 150px;
  height: 150px;
`;

const GameCard: React.FC<{ img: any; title: string; anythings?: any }> = ({
  img,
  title,
  anythings,
}) => {
  console.log(anythings);
  return (
    <CardLayer selected={anythings}>
      <CardImg src={img} />

      <EmptyBox height={10} />

      <View style={{ justifyContent: "space-between", height: "100%" }}>
        <View>
          <Text.Spo_Medium_14>{title}</Text.Spo_Medium_14>
        </View>

        <View>
          <Text.Spo_Medium_14>안녕</Text.Spo_Medium_14>
        </View>
      </View>
    </CardLayer>
  );
};

export default GameCard;
