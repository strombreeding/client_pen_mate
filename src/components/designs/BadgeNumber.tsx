import styled from "styled-components";
import { Text, colors } from "../../styles";
import { useEffect } from "react";

const View = styled.div`
  padding: "0px 4px 1px 4px";
  border-radius: 100px;
  border: 2px solid ${colors.White};
  background-color: ${colors.Red100};
`;
const BadgeNumber: React.FC<{ cnt: number }> = ({ cnt }) => {
  return (
    <View>
      <Text.Caption2 color="#FFFFFF">
        {cnt > 100 ? "99+" : cnt == null ? 0 : cnt}
      </Text.Caption2>
    </View>
  );
};

export default BadgeNumber;
