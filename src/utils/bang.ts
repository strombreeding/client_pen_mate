import { Dispatch, SetStateAction } from "react";
import { IStatusProps } from "../pages/Bang";

export const emptyVal = (width: number) => -((width - width * 0.625) / 2);

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

export const getPostionValue = (target: number[], width: number) => {
  const x = target[0];
  const y = target[1];

  const top = x * width * 0.625; // 80의 width를 가졌다면 60의 height를 가짐
  const left =
    // defaultY +
    emptyVal(width) + -emptyVal(width) / 3 + width * 0.75 * y;
  return [top, left];
};

export const getTargetPath = (targetBoard: number[][], player: "A" | "B") => {
  const symbol = player === "A" ? 3 : 2;
  const result = [];
  for (let x = 0; x < targetBoard.length; x++) {
    for (let y = 0; y < targetBoard[x].length; y++) {
      if (targetBoard[x][y] === symbol) {
        result.push(x);
        result.push(y);
        break;
      }
    }
  }
  return result;
};

export const isValidIndex = (x: number, y: number, targetBoard: number[][]) => {
  const maxX = targetBoard.length;
  const maxY = targetBoard[0].length;
  return x >= 0 && x < maxX && y >= 0 && y < maxY;
};

export const isSpreadHit = (x: number, y: number, targetBoard: number[][]) => {
  const rtVis = isValidIndex(x + 1, y + 1, targetBoard);
  const rdVis = isValidIndex(x - 1, y + 1, targetBoard);
  const ltVis = isValidIndex(x + 1, y - 1, targetBoard);
  const ldVis = isValidIndex(x - 1, y - 1, targetBoard);
  let hit = false;
  if (rtVis) {
    if (targetBoard[x + 1][y + 1] === 1) {
      hit = true;
    }
  }
  if (rdVis) {
    if (targetBoard[x - 1][y + 1] === 1) {
      hit = true;
    }
  }
  if (ltVis) {
    if (targetBoard[x + 1][y - 1] === 1) {
      hit = true;
    }
  }
  if (ldVis) {
    if (targetBoard[x - 1][y + 1] === 1) {
      hit = true;
    }
  }
  if (targetBoard[x][y] === 1) {
    hit = true;
  }
  return hit;
};
