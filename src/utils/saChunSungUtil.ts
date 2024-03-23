/** 클릭시 경로를 경로가 있는지 여부  */
export const findPathDFS = async (
  graph: number[][],
  start: number[],
  end: number[],
  startValue: number
) => {
  const directions = getImportance(start, end);
  const timer = setTimeout(() => {
    return null;
  }, 3000);
  if (start[0] === end[0] && start[1] === end[1]) return null;
  let bend = 0;
  const history: number[][] = [];

  const path = await dfs(graph, start, end, history, directions, startValue);

  clearTimeout(timer);

  return path;
};

/** 목표지점 최단거리 direction을 반환하여 성능 상승 */
const getImportance = (start: number[], end: number[]) => {
  const [sx, sy] = start;
  const [ex, ey] = end;
  let directions = [] as number[][];

  if (sx > ex && sy > ey) {
    // 30,15 15,13
    //
    directions = [
      [0, -1], // 좌
      [-1, 0], // 상
      [0, 1], // 우
      [1, 0], // 하
    ];
    // console.log("좌상우");
  } else if (sx > ex && sy < ey) {
    directions = [
      [0, 1], // 우
      [-1, 0], // 상
      [0, -1], // 좌
      [1, 0], // 하
    ];
    // console.log("우상좌");
  } else if (sx > ex && sy === ey) {
    directions = [
      [-1, 0], // 상
      [0, -1], // 좌
      [0, 1], // 우
      [1, 0], // 하
    ];
    // console.log("상좌우");
  } else if (sx < ex && sy > ey) {
    directions = [
      [0, -1], // 좌
      [1, 0], // 하
      [-1, 0], // 상
      [0, 1], // 우
    ];
    // console.log("좌하상");
  } else if (sx < ex && sy < ey) {
    directions = [
      [0, 1], // 우
      [1, 0], // 하
      [-1, 0], // 상
      [0, -1], // 좌
    ];
    // console.log("우하상");
  } else if (sx < ex && sy === ey) {
    directions = [
      [1, 0], // 하
      [0, -1], // 좌
      [0, 1], // 우
      [-1, 0], // 상
    ];
    // console.log("하좌우");
  } else if (sx === ex && sy > ey) {
    directions = [
      [0, -1], // 좌
      [-1, 0], // 상
      [1, 0], // 하
      [0, 1], // 우
    ];
    // console.log("좌상하");
  } else if (sx === ex && sy < ey) {
    directions = [
      [0, 1], // 우
      [-1, 0], // 상
      [1, 0], // 하
      [0, -1], // 좌
    ];
    // console.log("우상하");
  } else {
    directions = [
      [-1, 0], // 상
      [1, 0], // 하
      [0, -1], // 좌
      [0, 1], // 우
    ];
    // console.log("상하좌우");
  }
  return directions;
};

export const shuffleBoard = (board: number[][]) => {
  const row = board.length;
  const col = board[0].length;
  const innerBoard: any[] = [];

  // 가장자리 0 값 복사
  for (let i = 0; i < row; i++) {
    innerBoard.push([]);
    for (let j = 0; j < col; j++) {
      if (i === 0 || i === row - 1 || j === 0 || j === col - 1) {
        innerBoard[i].push(0);
      } else {
        innerBoard[i].push(board[i][j]);
      }
    }
  }

  // 내부 숫자들을 무작위로 섞기
  const innerNumbers = innerBoard
    .slice(1, -1)
    .flatMap((row) => row.slice(1, -1));
  shuffle(innerNumbers);

  // 섞인 숫자들을 다시 보드에 배치
  let k = 0;
  for (let i = 1; i < row - 1; i++) {
    for (let j = 1; j < col - 1; j++) {
      innerBoard[i][j] = innerNumbers[k++];
    }
  }

  return innerBoard;
};

// 배열 무작위 섞는 함수
const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// export const createBoard = (originalRow: number, originalCol: number) => {
//   // row와 col을 각각 2씩 증가
//   const row = originalRow + 2;
//   const col = originalCol + 2;
//   const totalInnerCells = (row - 2) * (col - 2);
//   const board = new Array(row).fill(null).map(() => new Array(col).fill(0));
//   let numbers = [];

//   // 내부 셀에 사용할 수 있는 숫자들을 준비 (1부터 8까지 숫자가 정확히 2개씩)
//   for (let i = 1; i <= 8 && numbers.length < totalInnerCells; i++) {
//     numbers.push(i, i);
//   }

//   // 숫자들이 전체 셀을 채우지 못할 경우, 남은 셀 수에 맞춰서 숫자 추가
//   while (numbers.length < totalInnerCells) {
//     // 이미 8개 숫자를 모두 사용한 경우, 남은 공간을 채우기 위해 필요한 추가 숫자들 선택
//     for (let i = 1; i <= 8 && numbers.length < totalInnerCells; i++) {
//       numbers.push(i, i);
//     }
//   }

//   // 숫자들을 섞음
//   numbers.sort(() => Math.random() - 0.5);

//   // 보드 내부에 숫자 배치, 가장자리는 0으로 유지
//   for (let i = 1; i < row - 1; i++) {
//     for (let j = 1; j < col - 1; j++) {
//       const index = (i - 1) * (col - 2) + (j - 1); // 내부 셀에 대한 인덱스 계산
//       board[i][j] = numbers[index];
//     }
//   }

//   // const zz = [
//   //   [0, 0, 0, 0, 0, 0],
//   //   [0, 1, 2, 3, 4, 0],
//   //   [0, 2, 1, 5, 6, 0],
//   //   [0, 3, 4, 5, 6, 0],
//   //   [0, 0, 0, 0, 0, 0],
//   // ];
//   // return zz;
//   return board;
// };
export const createBoard = (originalRow: number, originalCol: number) => {
  // row와 col을 각각 2씩 증가
  const row = originalRow + 2;
  const col = originalCol + 2;
  const totalInnerCells = (row - 2) * (col - 2);
  const board = new Array(row).fill(null).map(() => new Array(col).fill(0));
  let numbers = [];

  // 내부 셀에 사용할 수 있는 숫자들을 준비 (1부터 14까지 숫자가 정확히 2개씩)
  for (let i = 1; i <= 14 && numbers.length < totalInnerCells; i++) {
    numbers.push(i, i);
  }

  // 숫자들이 전체 셀을 채우지 못할 경우, 남은 셀 수에 맞춰서 숫자 추가
  while (numbers.length < totalInnerCells) {
    // 이미 14개 숫자를 모두 사용한 경우, 남은 공간을 채우기 위해 필요한 추가 숫자들 선택
    for (let i = 1; i <= 14 && numbers.length < totalInnerCells; i++) {
      numbers.push(i, i);
    }
  }

  // 숫자들을 섞음
  numbers.sort(() => Math.random() - 0.5);

  // 보드 내부에 숫자 배치, 가장자리는 0으로 유지
  for (let i = 1; i < row - 1; i++) {
    for (let j = 1; j < col - 1; j++) {
      const index = (i - 1) * (col - 2) + (j - 1); // 내부 셀에 대한 인덱스 계산
      board[i][j] = numbers[index];
    }
  }
  console.log(board);
  return board;
};

// 예제 실행

/** 게임판 생성 로직 */
// export const createBoard = (rows: number, cols: number) => {
//   rows = rows + 2;
//   cols = cols + 2;
//   // 0으로 초기화된 rows x cols 크기의 2차원 배열 생성
//   const board = Array.from({ length: rows }, () => Array(cols).fill(0));

//   // "3,4", "3,6", "3,8", "4,4", "4,5", "4,6", "4,7","4,8","5,4","5,6","5,8","6,6","6,7","6,8","7,6","7,8","8,7","8,8","8,9",
//   const maxItem = ((rows - 2) * (cols - 2)) / 2; // 게임판의 최대 개수는 게임판 크기 /2
//   if (maxItem % 2 !== 0) return [[]]; // 짝수여야 짝이 맞음 이부분은

//   let cnt = 1;
//   const itemLength: number[] = [1, 2, 3];
//   if (cols > 14) itemLength.push(4, 5, 6, 7, 8, 9);
//   // const itemLength: number[] = [1];
//   while (cnt < 10) {
//     // cnt++;
//     cnt++;

//     // 12 / 6 가 정수일 경우 멈춤
//     if (
//       Number.isInteger(maxItem / itemLength.length) &&
//       (maxItem / itemLength.length) % 2 === 0
//     ) {
//       break;
//     }
//     itemLength.pop();

//     // itemLength.push(cnt);
//   }

//   const maxStack = maxItem / itemLength.length; // 12면 아이템랭스는 3이고 12/ = 4, 각아이템이 4번씩

//   const itemStack = Array.from({ length: itemLength.length }, (i) =>
//     Array(maxStack).fill(1)
//   ); // [[],[],[]]
//   console.log(Math.floor(Math.random() * itemLength.length));
//   for (let i = 0; i < board.length; i++) {
//     if (i === 0 || i === board.length - 1) continue;
//     for (let r = 1; r < cols - 1; r++) {
//       const randomNumber = Math.floor(Math.random() * itemLength.length); // 랜덤으로하나뽑음

//       if (itemStack[randomNumber].length > 0) {
//         itemStack[randomNumber].pop();
//         board[i][r] = randomNumber + 1;
//       } else {
//         r--;
//       }
//     }
//   }

//   return board;
//   const zz = [
//     [0, 0, 0, 0, 0],
//     [0, 1, 2, 3, 0],
//     [0, 3, 1, 2, 0],
//     [0, 1, 1, 2, 0],
//     [0, 3, 3, 2, 0],
//     [0, 0, 0, 0, 0],
//   ];
//   return zz;
// };

// 경로를 넣으면 꺾임의 횟수를 판단하여
const calculTransXY = (pathArr: number[][], underBand: number) => {
  let bend = 0;
  const arrXY = [];

  // console.log(pathArr);
  // 다음과 같은 배열 생성 ["r","c","c","r","c"]
  for (let i = 1; i < pathArr.length; i++) {
    arrXY.push(
      pathArr[i][0] === pathArr[i - 1][0] && pathArr[i][1] !== pathArr[i - 1][1]
        ? "col"
        : "row"
    );
  }
  // 생성된 배열
  for (let i = 1; i < arrXY.length; i++) {
    if (arrXY[i] !== arrXY[i - 1]) {
      bend++;
    }
  }

  if (bend >= underBand) return false;
  return true;
};

export const playerBot = async (board: number[][]): Promise<number[][]> => {
  // const graph = JSON.parse(JSON.stringify(board));
  const graph = [...board];
  if (graph.length === 0 || graph == null) return [[]];
  const isPath = await remainingPathFinder(graph, "bot");
  console.log(isPath, graph);
  if (isPath === undefined) {
    throw new Error("404");
  }
  return graph;
};

const dfs = async (
  graph: number[][],
  start: number[],
  end: number[],
  path: number[][],
  directions: number[][],
  startValue: number
): Promise<number[][] | null> => {
  const [x, y] = start;
  path.push(start);
  // visitPath[x][y] = true;
  const isUnder3Band = calculTransXY(path, 3);
  if (!isUnder3Band) {
    // console.log("꺾임이 3회이므로, 이번 노드는 조기 종료합니다.");
    return null;
  }
  // console.log("History: ", path, "End", end);
  // console.log(directions);
  // 도착점에 도달했을 때 경로 반환
  if (x === end[0] && y === end[1] && graph[x][y] === startValue) {
    return path;
  }

  //   각 방향을 한번씩 조회하여 목적지가 있다면 해당 목적지로 이동해야한다.
  //   두개의 for반복문을 이용하여 처음 반복문에서 위 기능 실행
  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX === end[0] && newY === end[1]) {
      // 시작점 방문 표시
      const foundPath = await dfs(
        graph,
        [newX, newY],
        end,
        path.slice(),
        directions,
        startValue
      );
      if (foundPath) {
        // const success = calculTransXY(foundPath, 3);
        return foundPath;
        // return success ? foundPath : null;
      } else {
        return null;
      }
    }
  }

  //   목적지가 없으니 다시 탐색
  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    const exists = path.some(([x, y]) => x === newX && y === newY); // 기존 경로에 이미 있따면 false
    if (
      newX >= 0 && // 좌표가 양수이고
      newX < graph.length && // 좌표값이 게임판의 범위이고
      newY >= 0 &&
      newY < graph[0].length &&
      !exists && // 기존 경로에 없고
      graph[newX][newY] === 0 // 목표점의 값이 0이라면 실행
    ) {
      const foundPath = await dfs(
        graph,
        [newX, newY],
        end,
        path.slice(),
        directions,
        startValue
      );

      if (foundPath) {
        return foundPath;
        // const success = calculTransXY(foundPath, 3);
        // return success ? foundPath : null;
      }
    }
  }

  return null; // 경로를 찾지 못한 경우 null 반환
};

// export const remainingPathFinder = async (
//   graph: number[][],
//   type: "hint" | "bot"
// ) => {
//   let copyGraph = [...graph];
//   if (type === "hint") {
//     copyGraph = JSON.parse(JSON.stringify(graph));
//   }
//   const maxX = copyGraph.length - 2;
//   const maxY = copyGraph[0].length - 2;
//   for (let x = 1; x < copyGraph.length - 1; x++) {
//     for (let y = 1; y < copyGraph[x].length - 1; y++) {
//       let currnetY = y + 1;
//       let currnetX = x;

//       if (copyGraph[x][y] === 0) continue; // 0이라면 다음
//       // || copyGraph[currnetX][currnetY] === 0
//       let done = false;
//       let limit = 1000;

//       while (!done && limit !== 0) {
//         --limit;

//         // 값이 같은 경우에 발동
//         if (copyGraph[x][y] === copyGraph[currnetX][currnetY]) {
//           const directions = getImportance([x, y], [currnetX, currnetY]);
//           const startValue = copyGraph[x][y];
//           const canFound = await dfs(
//             copyGraph,
//             [x, y],
//             [currnetX, currnetY],
//             [],
//             directions,
//             startValue
//           ); //
//           if (canFound) {
//             copyGraph[x][y] = 0;
//             copyGraph[currnetX][currnetY] = 0;
//             return type === "bot" ? copyGraph : canFound;
//           } else if (canFound == null) {
//             if (currnetX >= maxX && currnetY >= maxY) {
//               break;
//             }

//             // 현재 y값이 maxY값이라면 y를초기화하고, 다음행으로 이동후 다시반복
//             else if (currnetY >= maxY) {
//               currnetY = 1;
//               currnetX++;
//               continue;
//             } else {
//               currnetY++;
//               continue;
//             }
//           }
//         } else {
//           // x값이 최대행이고 y도 끝까지왔다면 다음 y로
//           if (currnetX >= maxX && currnetY >= maxY) {
//             break;
//           }

//           // 현재 y값이 maxY값이라면 y를초기화하고, 다음행으로 이동후 다시반복
//           else if (currnetY >= maxY) {
//             currnetY = 1;
//             currnetX++;
//             continue;
//           } else {
//             currnetY++;
//             continue;
//           }
//         }
//       }
//     }
//   }
// };

export const remainingPathFinder = async (
  graph: number[][],
  type: "hint" | "bot"
) => {
  const maxX = graph.length - 2;
  const maxY = graph[0].length - 2;
  for (let x = 1; x < graph.length - 1; x++) {
    for (let y = 1; y < graph[x].length - 1; y++) {
      let currnetY = y + 1;
      let currnetX = x;

      if (graph[x][y] === 0) continue; // 0이라면 다음
      // || graph[currnetX][currnetY] === 0
      let done = false;
      let limit = 1000;

      while (!done && limit !== 0) {
        --limit;

        if (graph[x][y] === graph[currnetX][currnetY]) {
          const directions = getImportance([x, y], [currnetX, currnetY]);
          const startValue = graph[x][y];
          const canFound = await dfs(
            graph,
            [x, y],
            [currnetX, currnetY],
            [],
            directions,
            startValue
          ); //
          if (canFound) {
            graph[x][y] = 0;
            graph[currnetX][currnetY] = 0;
            return type === "bot" ? graph : canFound;
          } else if (canFound == null) {
            if (currnetX >= maxX && currnetY >= maxY) {
              break;
            }

            // 현재 y값이 maxY값이라면 y를초기화하고, 다음행으로 이동후 다시반복
            else if (currnetY >= maxY) {
              currnetY = 1;
              currnetX++;
              continue;
            } else {
              currnetY++;
              continue;
            }
          }
        } else {
          // x값이 최대행이고 y도 끝까지왔다면 다음 y로
          if (currnetX >= maxX && currnetY >= maxY) {
            break;
          }

          // 현재 y값이 maxY값이라면 y를초기화하고, 다음행으로 이동후 다시반복
          else if (currnetY >= maxY) {
            currnetY = 1;
            currnetX++;
            continue;
          } else {
            currnetY++;
            continue;
          }
        }
      }
    }
  }
};

export const createRandomLevel = (levelHistory: string[]) => {
  const levelList = [
    "3,4",
    "3,6",
    "3,8",
    "4,4",
    "4,5",
    "4,6",
    "4,7",
    "4,8",
    "5,4",
    "5,6",
    "5,8",
    "6,6",
    "6,7",
    "6,8",
    "7,6",
    "7,8",
    "8,7",
    "8,8",
    "8,9",
  ];
  const randomIdx = Math.floor(Math.random() * levelList.length);
  while (true) {
    if (levelHistory.includes(levelList[randomIdx])) {
      const idx = levelHistory.indexOf(levelList[randomIdx]);
      levelHistory.splice(idx, 1);
      continue;
    }
    break;
  }
  return levelList[randomIdx];
};
