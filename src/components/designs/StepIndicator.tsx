import styled from "styled-components";
import { colors } from "../../styles";

const RowView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActiveCircle = styled.div<{ activeColor?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background-color: ${(props) => props.activeColor};
`;
const UnActiveCircle = styled.div<{ unActiveColor?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 100px;
  background-color: ${(props) => props.unActiveColor};
`;
const StepIndicator: React.FC<{
  items: any[];
  index: number;
  activeColor?: string;
  unActiveColor?: string;
}> = ({ items, index, activeColor, unActiveColor }) => {
  return (
    <RowView>
      {items.map((item, i) => {
        if (index === i) {
          return (
            <ActiveCircle
              key={i}
              activeColor={activeColor == null ? colors.Grey1100 : activeColor}
              style={{ marginRight: i === items.length - 1 ? 0 : 2 }}
            />
          );
        } else {
          return (
            <UnActiveCircle
              key={i}
              unActiveColor={unActiveColor == null ? "#D9D9D9" : unActiveColor}
              style={{ marginRight: i === items.length - 1 ? 0 : 2 }}
            />
          );
        }
      })}
    </RowView>
  );
};

export default StepIndicator;
