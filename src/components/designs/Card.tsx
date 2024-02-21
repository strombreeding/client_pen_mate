import styled from "styled-components";
import { View } from "../../nativeView";
import { Container, EmptyBox } from "../../styles";
import { Text } from "../../assets/fontStyles";
import { SCREEN_WIDTH } from "../../configs/device";

const CardLayer = styled(View)`
  position: relative;
  min-width: ${SCREEN_WIDTH * 0.68}px;
  width: ${SCREEN_WIDTH * 0.48}px;
  height: ${SCREEN_WIDTH * 0.932}px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
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
  return (
    <CardLayer>
      <CardImg src={img} />

      <EmptyBox height={10} />

      <View style={{ justifyContent: "space-between", height: "100%" }}>
        <View>
          <Text.Esa_Medium_14>{title}</Text.Esa_Medium_14>
        </View>

        <View>
          <Text.Esa_Medium_14>안녕</Text.Esa_Medium_14>
        </View>
      </View>
    </CardLayer>
  );
};

export default GameCard;
