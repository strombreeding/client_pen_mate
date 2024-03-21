import styled from "styled-components";
import { View } from "../../../nativeView";
import { Text } from "../../../assets/fontStyles";
import { colors } from "../../../assets/colors";
import { memo } from "react";

const Wraper = styled(View)`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px) contrast(30%);
  -webkit-backdrop-filter: blur(2px) contrast(30%);
  padding: 10px;
  border-radius: 5px;
`;

function GameDescription({ description }: { description: string }) {
  return (
    <Wraper>
      <Text.Light_12 style={{ fontSize: 11 }}>{description}</Text.Light_12>
    </Wraper>
  );
}

export default memo(GameDescription);
