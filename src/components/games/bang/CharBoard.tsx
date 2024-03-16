import styled from "styled-components";
import { View } from "../../../nativeView";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { gameImg } from "../../../assets/gameImg";
import { url } from "inspector";
import { Text } from "../../../assets/fontStyles";
import { SCREEN_WIDTH } from "../../../configs/device";
import ChatBox from "./detail/Chat";
import { jump } from "./animations/jump";
import { emptyVal, getTargetPath } from "../../../utils/bang";
import Character from "./animations/Character";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CharacterA from "./animations/Character";
import CharacterB from "./animations/CharacterB";
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
  left: ${(props) =>
    emptyVal(props.data.width) + // 최소한의 캐릭터 히트박스
    -emptyVal(props.data.width) / 3 + // 처음 여유값
    props.data.width * 0.75 * 0}px; // 이동하려는 값 0 === y 축

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
  targetBoard,
  aChat,
  bChat,
  setObj,
  setBObj,
  player,
  action,
}: {
  obj: ICharProps;
  bObj: ICharProps;
  board: number[][];
  targetBoard: number[][];
  aChat: string[];
  bChat: string[];
  player: "A" | "B";
  setObj: Dispatch<SetStateAction<ICharProps>>;
  setBObj: Dispatch<SetStateAction<ICharProps>>;
  action?: "jump" | "atk" | "stand" | "walk" | null[];
}) {
  const boardXSize = [1, 2, 3];
  const boardYSize = [1, 2, 3, 4, 5, 6];
  const aChatRef = useRef<HTMLDivElement | null>(null);
  const bChatRef = useRef<HTMLDivElement | null>(null);
  const aCurrentPath = getTargetPath(
    player === "A" ? board : targetBoard,
    player
  );
  const animationRef = useRef(0);
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

  const divRef = useRef<HTMLDivElement | null>(null);

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
      <CharacterA
        charObj={obj}
        setCharObj={setObj}
        type={"A"}
        player={player}
      />

      {/* B */}
      <CharacterB
        charObj={bObj}
        setCharObj={setBObj}
        type={"B"}
        player={player}
      />
    </View>
  );
}

export default CharBoard;
