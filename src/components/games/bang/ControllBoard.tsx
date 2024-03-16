import styled, { keyframes } from "styled-components";
import { View } from "../../../nativeView";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { gameImg } from "../../../assets/gameImg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  setActionModal,
  setNowAction,
  setStep,
} from "../../../store/slices/bangState";
interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}

const flash = keyframes`
  from{
    opacity: 1;
  }
  to{
    opacity: 0.4;
  }
`;
const StayI = styled.div<{ data: ICharProps; type: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  /* background-image: url(${(props) => props.data.imgSrc}); */
  border: 0.3px solid rgba(0, 0, 0, 0.5);
  background-color: ${(props) =>
    props.type === "willMove"
      ? "#87CEEB"
      : props.type === "move"
      ? "#87CEEB"
      : props.type === "willAtk"
      ? "#e04545ce"
      : props.type === "me"
      ? "#1610bcc4"
      : props.type === "atk"
      ? "#bc1010c4"
      : "#00000035"};
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  animation: ${(props) =>
      props.type === "move" || props.type === "willAtk" ? flash : {}}
    1s linear;
  animation-iteration-count: infinite;
`;
// const StayI  = styled.div<{ data: ICharProps; stand: number }>`
//   position: absolute;
//   /* top: 300px; */
//   right: ${(prop) =>
//     emptyVal(prop.data.width) + -emptyVal(prop.data.width) / 3}px;
//   width: ${(props) => props.data.width}px;
//   height: ${(props) => props.data.width * 0.625}px;
//   /* background-image: url(${(props) => props.data.imgSrc}); */
//   border: 1px solid black;
//   background-color: ${(props) =>
//     props.stand === 1 ? "red" : props.stand === 2 ? "blue" : "pink"};
//   background-size: ${(props) => props.data.width * props.data.cols}px
//     ${(props) => props.data.width * 0.625 * props.data.rows}px;
// `;
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
function ControllBoard({
  obj,
  board,
  player,
  setBoard,
}: {
  obj: ICharProps;
  board: number[][];
  setBoard: Dispatch<SetStateAction<number[][]>>;
  player: "A" | "B";
}) {
  const boardXSize = [1, 2, 3];
  const boardYSize = [1, 2, 3, 4, 5, 6];
  const nowAction = useSelector(
    (state: RootState) => state.bangState.nowAction
  );
  const ready = useSelector((state: RootState) => state.bangState.ready);
  const step = useSelector((state: RootState) => state.bangState.step);

  const [copyPath] = useState([nowAction[0].path, nowAction[1].path]);
  const [canMove, setCanMove] = useState([] as number[][]);
  const [canShot, setCanShot] = useState([] as number[][]);
  const dispatch = useDispatch<AppDispatch>();
  const getPosition = (board: number[][]) => {
    const me = player === "A" ? 2 : 3;
    const you = player === "A" ? 3 : 2;
    const canMoveLength: SetStateAction<number[][]> = []; // 1,0 기준 1,1 / 0,0 / 2,0 가능
    const canAtkLegnth: SetStateAction<number[][]> = [];
    board.map((list, x) => {
      list.map((val, y) => {
        const topRight = [x - 1, y + 1];
        const topLeft = [x - 1, y - 1];
        const botRight = [x + 1, y + 1];
        const botLeft = [x + 1, y - 1];
        if (board[x][y] === me) {
          canMoveLength.push(topRight, topLeft, botRight, botLeft);
        } else if (board[x][y] === you) {
          const topRight = [x - 1, y + 1];
          const topLeft = [x - 1, y - 1];
          const botRight = [x + 1, y + 1];
          const botLeft = [x + 1, y - 1];
          const hold = [x, y];
          canAtkLegnth.push(topRight, topLeft, botRight, botLeft, hold);
        }
      });
    });
    setCanShot(canAtkLegnth);
    setCanMove(canMoveLength);
  };
  useEffect(() => {
    getPosition(board);
    // 0은 이동가능,
    // -1은 이동불가
    // 1은 A
    // 2는 B
  }, [board]);

  return (
    <>
      <View style={{ width: "100%", position: "absolute", opacity: 0.8 }}>
        {boardXSize.map((empty, x) => (
          <RowView key={x} data={obj}>
            {boardYSize.map((useless, y) => {
              let symbol = "";
              if (player === "A" && board[x][y] === 2) {
                symbol = "me";
              } else if (player === "A" && board[x][y] === 3) {
                symbol = "atk";
              } else if (player === "B" && board[x][y] === 2) {
                symbol = "atk";
              } else if (player === "B" && board[x][y] === 3) {
                symbol = "me";
              } else {
                symbol = "tile";
              }
              const canMovePath = canMove.filter((arr, i) => {
                return arr[0] === x && arr[1] === y ? true : false;
              });
              const canShotPath = canShot.filter((arr, i) => {
                return arr[0] === x && arr[1] === y ? true : false;
              });

              // 준비직전 공격경로 나타내기 1
              if (
                step > 1 &&
                nowAction[0].action === "공격" &&
                nowAction[0].path[0] === x &&
                nowAction[0].path[1] === y
              ) {
                return (
                  <StayI key={y} data={obj} type={"willAtk"}>
                    <img
                      src={gameImg.target}
                      style={{ width: 30, aspectRatio: 1 }}
                      alt=""
                    />
                  </StayI>
                );
              }

              // 준비직전 공격경로 나타내기 2
              if (
                step > 1 &&
                nowAction[1].action === "공격" &&
                nowAction[1].path[0] === x &&
                nowAction[1].path[1] === y
              ) {
                return (
                  <StayI key={y} data={obj} type={"willAtk"}>
                    <img
                      src={gameImg.target}
                      style={{ width: 30, aspectRatio: 1 }}
                      alt=""
                    />
                  </StayI>
                );
              }

              // 준비직전 회피경로 나타내기 1
              if (
                step > 1 &&
                nowAction[0].action === "회피" &&
                nowAction[0].path[0] === x &&
                nowAction[0].path[1] === y
              ) {
                return (
                  <StayI key={y} data={obj} type={"move"}>
                    <img
                      src={gameImg.action_jump}
                      style={{ width: 30, aspectRatio: 1 }}
                      alt=""
                    />
                  </StayI>
                );
              }

              // 준비직전 회피경로 나타내기 2
              if (
                step > 1 &&
                nowAction[1].action === "회피" &&
                nowAction[1].path[0] === x &&
                nowAction[1].path[1] === y
              ) {
                return (
                  <StayI key={y} data={obj} type={"move"}>
                    <img
                      src={gameImg.action_jump}
                      style={{ width: 30, aspectRatio: 1 }}
                      alt=""
                    />
                  </StayI>
                );
              }

              // 회피 가능 범위 점멸등
              if (
                step <= 1 &&
                JSON.stringify(nowAction[step].path) ===
                  JSON.stringify([x, y]) &&
                nowAction[step].action === "회피"
              ) {
                return (
                  <StayI
                    key={y}
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(nowAction));
                      copy[step].path = [x, y];
                      const nextStep = step + 1;
                      dispatch(setStep(nextStep));
                      dispatch(setNowAction(copy));

                      if (step < 1) {
                        dispatch(setActionModal(true));
                      }
                    }}
                    data={obj}
                    type={"willMove"}
                  />
                );
              } else if (
                step <= 1 &&
                JSON.stringify(nowAction[step].path) ===
                  JSON.stringify([x, y]) &&
                nowAction[step].action === "공격"
              ) {
                return (
                  <StayI
                    key={y}
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(nowAction));
                      copy[step].path = [x, y];
                      const nextStep = step + 1;
                      dispatch(setStep(nextStep));
                      dispatch(setNowAction(copy));
                      if (step < 1) {
                        dispatch(setActionModal(true));
                      }
                    }}
                    data={obj}
                    type={"atk"}
                  />
                );
              }

              if (canMovePath.length > 0 && nowAction[step].action === "회피") {
                return (
                  <StayI
                    key={y}
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(nowAction));
                      copy[step].path = [x, y];
                      dispatch(setStep(step + 1));
                      dispatch(setNowAction(copy));
                      if (step < 1) {
                        dispatch(setActionModal(true));
                      }
                    }}
                    data={obj}
                    type={"move"}
                  />
                );
              } else if (
                canShotPath.length > 0 &&
                nowAction[step].action === "공격" &&
                symbol !== "me"
              ) {
                return (
                  <StayI
                    key={y}
                    onClick={() => {
                      const copy = JSON.parse(JSON.stringify(nowAction));
                      copy[step].path = [x, y];
                      dispatch(setStep(step + 1));
                      dispatch(setNowAction(copy));
                      if (step < 1) {
                        dispatch(setActionModal(true));
                      }
                    }}
                    data={obj}
                    type={"willAtk"}
                  />
                );
              } else {
                return <StayI key={y} data={obj} type={symbol} />;
              }
            })}
          </RowView>
        ))}
      </View>
    </>
  );
}

export default ControllBoard;

// 0,1 에서 0,2 으로 이동하면
// 기존 -15
// top : 0, right : emptyVal(obj.width) + -emptyVal(obj.width) / 3 + obj.width * 0.75 * atk[1],
