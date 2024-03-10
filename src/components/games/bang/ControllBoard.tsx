import styled, { keyframes } from "styled-components";
import { IWillAction, emptyVal } from "../../../pages/Test";
import { Pressable, View } from "../../../nativeView";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Text } from "../../../assets/fontStyles";
import { EmptyBox } from "../../../styles";
import { colors } from "../../../assets/colors";
import { gameImg } from "../../../assets/gameImg";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../configs/device";
import BottomPrevNext from "../../navigations/BottomPrevNext";
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
      : colors.Pale_Puple};
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  animation: ${(props) =>
      props.type === "move" || props.type === "willAtk" ? flash : {}}
    1s linear;
  animation-iteration-count: infinite;
`;
// const StayI = styled.div<{ data: ICharProps; stand: number }>`
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
  setBoard,
  nowAction,
  setNowAction,
  player,
  step,
  setStep,
  setReady,
}: {
  obj: ICharProps;
  board: number[][];
  setBoard: Dispatch<SetStateAction<number[][]>>;
  player: string;
  nowAction: IWillAction[];
  setNowAction: Dispatch<SetStateAction<IWillAction[]>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setReady: Dispatch<SetStateAction<boolean>>;
}) {
  const boardXSize = [1, 2, 3];
  const boardYSize = [1, 2, 3, 4, 5, 6];
  const [copyPath] = useState([nowAction[0].path, nowAction[1].path]);
  const [canMove, setCanMove] = useState([] as number[][]);
  const [modal, setModal] = useState(true);
  const width = obj.height;
  useEffect(() => {
    const getPosition = (board: number[][]) => {
      board.map((list, x) => {
        list.map((val, y) => {
          const symbol = player === "A" ? 2 : 3;
          const canMoveLength = []; // 1,0 기준 1,1 / 0,0 / 2,0 가능
          if (board[x][y] === symbol) {
            const topRight = [x - 1, y + 1];
            const topLeft = [x - 1, y - 1];
            const botRight = [x + 1, y + 1];
            const botLeft = [x + 1, y - 1];
            const hold = [x, y];
            canMoveLength.push(topRight, topLeft, botRight, botLeft, hold);
            setCanMove(canMoveLength);
          }
        });
      });
    };
    getPosition(board);
    // 0은 이동가능,
    // -1은 이동불가
    // 1은 A
    // 2는 B
  }, [board]);

  return (
    <>
      <View style={{ width: "100%", position: "relative" }}>
        {boardXSize.map((empty, x) => (
          <RowView data={obj}>
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
              const filter = canMove.filter((arr, i) => {
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
                  <StayI data={obj} type={"willAtk"}>
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
                  <StayI data={obj} type={"willAtk"}>
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
                  <StayI data={obj} type={"move"}>
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
                  <StayI data={obj} type={"move"}>
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
                    onClick={() => {
                      const copy = [...nowAction];
                      copy[step].path = [x, y];
                      setStep(step + 1);
                      setNowAction(copy);
                      if (step < 1) {
                        setModal(true);
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
                    onClick={() => {
                      const copy = [...nowAction];
                      copy[step].path = [x, y];
                      setStep(step + 1);
                      setNowAction(copy);
                      if (step < 1) {
                        setModal(true);
                      }
                    }}
                    data={obj}
                    type={"atk"}
                  />
                );
              }

              if (filter.length > 0 && nowAction[step].action === "회피") {
                return (
                  <StayI
                    onClick={() => {
                      const copy = [...nowAction];
                      copy[step].path = [x, y];
                      setStep(step + 1);
                      setNowAction(copy);
                      if (step < 1) {
                        setModal(true);
                      }
                    }}
                    data={obj}
                    type={"move"}
                  />
                );
              } else if (nowAction[step].action === "공격" && symbol !== "me") {
                return (
                  <StayI
                    onClick={() => {
                      const copy = [...nowAction];
                      copy[step].path = [x, y];
                      setStep(step + 1);
                      setNowAction(copy);
                      if (step < 1) {
                        setModal(true);
                      }
                    }}
                    data={obj}
                    type={"willAtk"}
                  />
                );
              } else {
                return <StayI data={obj} type={symbol} />;
              }
            })}
          </RowView>
        ))}
      </View>
      {modal && (
        <ActionContainer obj={obj}>
          <ActionBtn
            style={{
              display:
                nowAction[0].action === "공격" || nowAction[1].action === "공격"
                  ? "none"
                  : "flex",
            }}
            onClick={() => {
              const copy = [...nowAction];
              copy[step].action = "공격";
              setNowAction(copy);
              setModal(false);
              // setStep(step+1)
            }}
          >
            <ActionImg src={gameImg.action_atk} />
          </ActionBtn>
          <ActionBtn
            style={{
              display:
                nowAction[0].action === "회피" || nowAction[1].action === "회피"
                  ? "none"
                  : "flex",
            }}
            onClick={() => {
              const copy = [...nowAction];
              copy[step].action = "회피";
              setNowAction(copy);
              setModal(false);
              // setStep(step+1)
            }}
          >
            <ActionImg src={gameImg.action_jump} />
          </ActionBtn>
        </ActionContainer>
      )}
      <BottomPrevNext
        rightBtnColor="rgba(145, 255, 0, 0.797)"
        visible={
          true
          // nowAction[0].action !== "" && nowAction[1].action !== "" && step >= 2
        }
        prevAction={() => {
          setStep(0);
          setModal(true);
          setReady(false);
          setNowAction([
            {
              action: "",
              path: [],
            },
            {
              action: "",
              path: [],
            },
            {
              action: "",
              path: [],
            },
          ]);
        }}
        prevText={"초기화"}
        nextAction={() => {
          setReady(true);
        }}
        nextText={"준비완료"}
      />
    </>
  );
}
const ActionContainer = styled(View)<{ obj: ICharProps }>`
  position: absolute;
  height: ${SCREEN_HEIGHT};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  /* border: 0.5px solid rgba(255, 255, 255, 0.5); */
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px) contrast(90%);
  -webkit-backdrop-filter: blur(2px) contrast(90%);
  z-index: 100;
`;

const ActionBtn = styled(Pressable)`
  display: flex;
  border: 2px solid rgba(255, 255, 255, 0.5);
  /* background-color: rgba(0, 0, 0, 0.8); */
  background-color: rgba(145, 255, 0, 0.797);

  border-radius: 100px;
  padding: 10px;
  margin: ${SCREEN_WIDTH * 0.08}px;
  /* backdrop-filter: blur(15px) contrast(100%);
  -webkit-backdrop-filter: blur(15px) contrast(40%); */
  /* width: ${SCREEN_WIDTH * 0.4}px;
  height: ${SCREEN_WIDTH * 0.4}px; */
  align-items: center;
  justify-content: center;
`;

const ActionImg = styled.img`
  width: ${SCREEN_WIDTH * 0.2777777777777778}px;
  height: ${SCREEN_WIDTH * 0.2777777777777778}px;
`;
export default ControllBoard;

// 0,1 에서 0,2 으로 이동하면
// 기존 -15
// top : 0, right : emptyVal(obj.width) + -emptyVal(obj.width) / 3 + obj.width * 0.75 * atk[1],
