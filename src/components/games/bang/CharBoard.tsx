import styled from "styled-components";
import { emptyVal } from "../../../pages/Test";
import { View } from "../../../nativeView";
import { useEffect, useState } from "react";
import { gameImg } from "../../../assets/gameImg";
import { url } from "inspector";
interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}
const RightChar = styled.div<{ data: ICharProps; stand: number }>`
  position: relative;
  /* top: 300px; */

  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  /* background-image: url(${(props) => props.data.imgSrc}); */
  background-image: url(${gameImg.tile4});
  /* background-image: url(${gameImg.tile2}); */
  /* background-image: url(${gameImg.mars_tile}); */
  background-color: ${(props) =>
    props.stand === 1 ? "red" : props.stand === 2 ? "blue" : "pink"};
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
`;
const Char = styled.div<{ data: ICharProps }>`
  position: absolute;
  top: ${(props) => props.data.width * 0.625}px;
  right: ${(prop) =>
    emptyVal(prop.data.width) + -emptyVal(prop.data.width) / 3}px;
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-image: url(${(props) => props.data.imgSrc});

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
function CharBoard({ obj, board }: { obj: ICharProps; board: number[][] }) {
  const boardXSize = [1, 2, 3];
  const boardYSize = [1, 2, 3, 4, 5, 6];
  const width = obj.height;
  useEffect(() => {}, [board]);
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#9B5127",
        // height: obj.width * 0.625 * boardXSize.length + 50,
        position: "relative",
      }}
    >
      {boardXSize.map((empty, x) => (
        <RowView data={obj}>
          {boardYSize.map((useless, y) => {
            const xy = [x, y];

            return <RightChar data={obj} stand={board[x][y]} />;
          })}
        </RowView>
      ))}
      <Char
        data={obj}
        style={{
          left:
            emptyVal(obj.width) + // 최소한의 캐릭터 히트박스
            -emptyVal(obj.width) / 3 + // 처음 여유값
            obj.width * 0.75 * 0, // 이동하려는 값
          // zIndex: board[x][y] > 0 ? 0 : 1,
        }}
      />
    </View>
  );
}

export default CharBoard;

export const getLocationValue = (
  target: number[],
  width: number,
  board: number[][]
) => {
  const x = target[0];
  const y = target[1];
  // x축 은 0, height , height x 2 이기떄문에
  // 현재 x가 0이라면 맨위, 1이라면 height만큼, 2라면 2배만큼 내려가면 됨
  const top = x * width * 0.625; // 80의 width를 가졌다면 60의 height를 가짐
  const left = emptyVal(width) + -emptyVal(width) / 3 + width * 0.75 * y;
  return [top, left];
};
// 0,1 에서 0,2 으로 이동하면
// 기존 -15
// top : 0, right : emptyVal(obj.width) + -emptyVal(obj.width) / 3 + obj.width * 0.75 * target[1],
