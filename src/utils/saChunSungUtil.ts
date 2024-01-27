export const findPathDFS = (
  graph: number[][],
  start: number[],
  end: number[],
  value: number
) => {
  if (start[0] === end[0] && start[1] === end[1]) return null;
  let bend = 0;
  const history: number[][] = [];
  const dfs = (
    graph: number[][],
    start: number[],
    end: number[],
    path: number[][],
    prevZ: undefined | string
  ): null | number[][] => {
    const [x, y] = start;
    console.log("현재 ", x, y);
    console.log(`꺾임 : ${bend}`);

    if (bend > 2) {
      console.log("꺾임 최대치, 이 경로는 불가능합니다.");
      bend = 0;
      return null;
    }
    //   // 시작점 방문 표시
    path.push(start);
    console.log("History: ", path);

    // 도착점에 도달했을 때 경로 반환
    if (x === end[0] && y === end[1] && graph[x][y] === value) {
      return path;
    }

    // 상하좌우 이동 방향
    // 꺾임을 감지해야하기 떄문에 row, col 요소 추가
    const directions: [number, number, string][] = [
      [-1, 0, "row"],
      [1, 0, "row"],
      [0, -1, "col"],
      [0, 1, "col"],
    ];

    //   각 방향을 한번씩 조회하여 목적지가 있다면 해당 목적지로 이동해야한다.
    //   두개의 for반복문을 이용하여 처음 반복문에서 위 기능 실행
    for (const [dx, dy, dz] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const currentZ = dz;
      if (newX === end[0] && newY === end[1]) {
        if (prevZ !== undefined && prevZ !== currentZ) {
          bend++;
        }
        console.log(newX, newY, "이동 함", prevZ, currentZ);

        // 시작점 방문 표시
        const foundPath = dfs(graph, [newX, newY], end, path.slice(), currentZ);
        if (foundPath) {
          return foundPath;
        } else {
          // console.log("초기화 진행");
          return null;
        }
      }
    }

    //   목적지가 없으니 다시 탐색
    for (const [dx, dy, dz] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const currentZ = dz;
      const exists = path.some(([x, y]) => x === newX && y === newY); // 기존 경로에 이미 있따면 false
      if (
        newX >= 0 &&
        newX < graph.length &&
        newY >= 0 &&
        newY < graph[0].length &&
        !exists &&
        graph[newX][newY] === 0
      ) {
        if (prevZ !== undefined && prevZ !== currentZ) {
          bend++;
        }
        console.log(newX, newY, "이동 함", prevZ, currentZ);
        const foundPath = dfs(graph, [newX, newY], end, path.slice(), currentZ);

        if (foundPath) return foundPath;
      }
    }

    return null; // 경로를 찾지 못한 경우 null 반환
  };
  const path = dfs(graph, start, end, history, undefined);
  return path;
};

export const createBoard = (
  rows: number,
  cols: number,
  itemLength?: number
) => {
  itemLength = itemLength == undefined ? 2 : itemLength;
  rows = rows + 2;
  cols = cols + 2;
  // 0으로 초기화된 rows x cols 크기의 2차원 배열 생성
  const board = Array.from({ length: rows }, () => Array(cols).fill(0));

  const maxItem = (rows - 2) * (cols - 2);
  if (maxItem % 2 !== 0) return [[]];
  const randomArr: number[] = [];
  const prevNum: number[] = [];

  for (let i = 0; i < board.length; i++) {
    if (i === 0 || i === board.length - 1) continue;

    for (let r = 1; r < cols - 1; r++) {
      let randomNumber = Math.floor(Math.random() * itemLength + 1);
      // 겹친 숫자가 또 나오면 랜덤 다시굴림
      // console.log("초기 랜덤넘버", randomNumber);
      let max = 0;
      while (prevNum.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * itemLength + 1);
        // console.log("으악 걸렸다! 바꾼 넘버", randomNumber);
        max++;
        if (max > 8) {
          prevNum.splice(Math.floor(Math.random() * prevNum.length + 1), 1);
          max = 0;
        }
      }
      // 겹친순간 prev로 빼서 앞으로는 겹치지 않게
      if (randomArr.includes(randomNumber)) {
        // console.log("겹쳤다!");
        const index = randomArr.indexOf(randomNumber);
        randomArr.splice(index, 1);
        prevNum.push(randomNumber);
      }

      board[i][r] = randomNumber; // 이게 바꿔야할것
      randomArr.push(randomNumber);
    }
  }

  return board;
};
