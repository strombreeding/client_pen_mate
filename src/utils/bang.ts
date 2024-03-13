import { Dispatch, SetStateAction } from "react";
import { IStatusProps } from "../pages/Bang";

export const getChangeBoard = (
  board: number[][],
  player: "A" | "B",
  path: number[]
) => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const exchangeBoard = JSON.parse(JSON.stringify(board));
  const symbol = player === "A" ? 2 : 3;
  for (let x = 0; x < newBoard.length; x++) {
    for (let y = 0; y < newBoard[x].length; y++) {
      if (newBoard[x][y] === symbol) {
        // 일단 먼저 보드에 있는 이전기록 지워
        newBoard[x][y] = 0;

        // 상대가 전에 있던경로는 1로 하자
        exchangeBoard[x][y] = 1;
      } else if (x === path[0] && y === path[1]) {
        newBoard[x][y] = symbol;
        exchangeBoard[x][y] = symbol;
      }
    }
  }
  return [newBoard, exchangeBoard];
};

// 현재 내 보드와 상대 보드를 받아와서 내보드를 최신화
export const copyBoard = (
  board: number[][],
  targetBoard: number[][],
  player: "A" | "B"
) => {
  const symbol = player === "A" ? 3 : 2;
  let pathX = -1;
  let pathY = -1;

  const myBoard = JSON.parse(JSON.stringify(board));
  const copyTargetBoard = JSON.parse(JSON.stringify(targetBoard));
  for (let x = 0; x < copyTargetBoard.length; x++) {
    for (let y = 0; y < copyTargetBoard[x].length; y++) {
      if (copyTargetBoard[x][y] === 1) {
        copyTargetBoard[x][y] = 0;
      } else if (copyTargetBoard[x][y] === symbol) {
        pathX = x;
        pathY = y;
      }
    }
  }
  for (let x = 0; x < myBoard.length; x++) {
    for (let y = 0; y < myBoard[x].length; y++) {
      if (myBoard[x][y] === symbol) {
        myBoard[x][y] = 0;
      }
    }
  }
  myBoard[pathX][pathY] = symbol;

  return myBoard;
};

export const calculateDamage = (
  atk: number,
  subHealth: number,
  health: number
) => {
  // 남은 방어력을 계산합니다.
  let remainingDefense = subHealth - atk;
  if (remainingDefense <= 0) {
    remainingDefense = 0;
  }

  // 남은 공격력을 계산합니다.
  const remainingAttack = Math.max(0, atk - subHealth);

  // 남은 체력을 계산합니다.
  const remainingHealth = health - remainingAttack;

  return [remainingHealth, remainingDefense];
};
