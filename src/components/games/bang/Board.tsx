import styled from "styled-components";
import { emptyVal } from "../../../pages/Test";
import { View } from "../../../nativeView";
import { useState } from "react";
interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}
const RightChar = styled.div<{ data: ICharProps; stand: number }>`
  position: absolute;
  /* top: 300px; */
  right: ${(prop) =>
    emptyVal(prop.data.width) + -emptyVal(prop.data.width) / 3}px;
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  /* background-image: url(${(props) => props.data.imgSrc}); */
  border: 1px solid black;
  background-color: ${(props) =>
    props.stand === 1 ? "red" : props.stand === 2 ? "blue" : "pink"};
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
`;
const RowView = styled.div<{ data: ICharProps }>`
  position: relative;
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.data.width * 0.625}px;
  top: 0px;
  left: 0px;
`;
function BangBoard({ obj, board }: { obj: ICharProps; board: number[][] }) {
  const boardXSize = [1, 2, 3];
  const boardYSize = [1, 2, 3, 4, 5, 6];
  const width = obj.height;

  return (
    <View style={{ width: "100%", height: 300, position: "relative" }}>
      {boardXSize.map((empty, x) => (
        <RowView data={obj}>
          {boardYSize.map((useless, y) => {
            const xy = [x, y];

            return (
              <RightChar
                data={obj}
                stand={board[x][y]}
                style={{
                  right:
                    emptyVal(obj.width) +
                    -emptyVal(obj.width) / 3 +
                    obj.width * 0.75 * y,
                  zIndex: board[x][y] > 0 ? 0 : 1,
                }}
              />
            );
          })}
        </RowView>
      ))}
    </View>
  );
}

export default BangBoard;
