import styled from "styled-components";
import { emptyVal } from "../../../pages/Test";
import { View } from "../../../nativeView";
import { useEffect, useRef, useState } from "react";
import { gameImg } from "../../../assets/gameImg";
import { url } from "inspector";
import { Text } from "../../../assets/fontStyles";
import { SCREEN_WIDTH } from "../../../configs/device";
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
function CharBoard({
  obj,
  bObj,
  board,
  aChat,
  bChat,
  player,
}: {
  obj: ICharProps;
  bObj: ICharProps;
  board: number[][];
  aChat: string[];
  bChat: string[];
  player: "A" | "B";
}) {
  const boardXSize = [1, 2, 3];
  const boardYSize = [1, 2, 3, 4, 5, 6];
  const aChatRef = useRef<HTMLDivElement | null>(null);
  const bChatRef = useRef<HTMLDivElement | null>(null);

  const width = obj.height;
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        console.log("말풍선의 높이가 변경되었습니다:", height);
        // 여기서 말풍선의 크기에 따른 추가적인 작업을 수행할 수 있습니다.
      }
    });

    if (bChatRef.current) {
      resizeObserver.observe(bChatRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
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
      {/* A */}
      <Char
        data={obj}
        style={{
          display: "flex",
          alignItems: "center",
          left:
            emptyVal(obj.width) + // 최소한의 캐릭터 히트박스
            -emptyVal(obj.width) / 3 + // 처음 여유값
            obj.width * 0.75 * 0, // 이동하려는 값
          // zIndex: board[x][y] > 0 ? 0 : 1,
        }}
      >
        <ChatView
          style={{
            display: aChat.length >= 1 ? "flex" : "none",
          }}
          ref={aChatRef}
        >
          <Text.Spo_Light_12
            style={{ fontSize: 10, color: "black" }}
            // numOf2Lines
          >
            {aChat[0]}
            {"\n"}
            {aChat[1]}
          </Text.Spo_Light_12>
        </ChatView>
      </Char>
      {/* B */}
      <Char
        data={bObj}
        style={{
          right:
            emptyVal(obj.width) + // 최소한의 캐릭터 히트박스
            -emptyVal(obj.width) / 3 + // 처음 여유값
            obj.width * 0.75 * 0, // 이동하려는 값
          // zIndex: board[x][y] > 0 ? 0 : 1,
          alignItems: "center",
        }}
      >
        <ChatView
          style={{
            display: bChat.length >= 1 ? "flex" : "none",
          }}
          ref={bChatRef}
        >
          <Text.Spo_Light_12
            style={{ fontSize: 10, color: "black" }}
            // numOf2Lines
          >
            {bChat[0]}
            {"\n"}
            {bChat[1]}
          </Text.Spo_Light_12>
        </ChatView>
      </Char>
    </View>
  );
}

export default CharBoard;

const ChatView = styled.div`
  position: absolute;
  top: -25px;
  left: 25px;
  width: ${SCREEN_WIDTH * 0.15}px;
  padding: 5px;
  border-radius: 5px;
  background-color: #ffffff7f;
  text-align: center;
`;
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
