export const findPathDFS = (
  graph: number[][],
  start: number[],
  end: number[],
  value: number
) => {
  console.log(start);
  // const visitPath: boolean[][] = graph.map((row) => row.map((_) => false));
  // const directions = [
  //   [-1, 0], // 상
  //   [1, 0], // 하
  //   [0, -1], // 좌
  //   [0, 1], // 우
  // ];
  const directions = getImportance(start, end);
  const startTime = Date.now();
  let nodes = 1;
  const timer = setTimeout(() => {
    return null;
  }, 3000);
  if (start[0] === end[0] && start[1] === end[1]) return null;
  let bend = 0;
  const history: number[][] = [];

  const dfs = (
    graph: number[][],
    start: number[],
    end: number[],
    path: number[][]
  ): null | number[][] => {
    const [x, y] = start;
    path.push(start);
    // visitPath[x][y] = true;
    const isUnder3Band = calculTransXY(path, 3);
    if (!isUnder3Band) {
      console.log("꺾임이 3회이므로, 이번 노드는 조기 종료합니다.");
      return null;
    }
    // console.log("History: ", path, "End", end);
    // console.log(directions);
    // 도착점에 도달했을 때 경로 반환
    if (x === end[0] && y === end[1] && graph[x][y] === value) {
      return path;
    }

    //   각 방향을 한번씩 조회하여 목적지가 있다면 해당 목적지로 이동해야한다.
    //   두개의 for반복문을 이용하여 처음 반복문에서 위 기능 실행
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX === end[0] && newY === end[1]) {
        // 시작점 방문 표시
        const foundPath = dfs(graph, [newX, newY], end, path.slice());
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
      console.log(dx, dy, " 좌표로 이동");
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
        console.log(newX, newY, " 이동");
        const foundPath = dfs(graph, [newX, newY], end, path.slice());

        if (foundPath) {
          return foundPath;
          // const success = calculTransXY(foundPath, 3);
          // return success ? foundPath : null;
        }
      }
    }

    return null; // 경로를 찾지 못한 경우 null 반환
  };
  const path = dfs(graph, start, end, history);

  clearTimeout(timer);
  const jobTime = Date.now();
  const doneTime = jobTime - startTime;
  console.log(`작업 수행시간`, doneTime, "ms");
  return path;
};

/**
 * 우선순위 direction을 반환하여 성능 상승
 */
const getImportance = (start: number[], end: number[]) => {
  const [sx, sy] = start;
  const [ex, ey] = end;
  let directions = [] as number[][];

  /*
    sx가 ex보다 클 경우 => 상 
    sy가 ey보다 클 경우 => 좌 
    둘다큼 => 좌 상 우 하  ex 5,4 => 3,2 
    둘다작음 => 우 하 좌 상  ex 3,2 => 5,4
    x는 같고 y 큼 => 좌 상 우 하
    x는 같고 y 작음 => 우 상 좌 하
    y는 같고 x 큼 => 좌 하 우 상
    y는 같고 x 작음 => 좌 상 우 하
  
  */
  //   let directions = [
  //   [-1, 0], // 상
  //   [1, 0],  // 하
  //   [0, -1], // 좌
  //   [0, 1],  // 우
  // ];
  /* 
    sx가 크고 sy가 클경우 좌상우
    sx가 크고 sy가 작을경우 우상좌

    sx가 크고 sy가 같을경우 상좌우
    sx가 작고 sy가 클경우 좌하상

    sx가 작고 sy가 작을 경우 우하상
    sx가 작고 sy가 같을경우 하좌우

    sx가 같고 sy가 클 경우 좌상하
    sx가 같고 sy가 작을경우 우상하

    
  */
  if (sx > ex && sy > ey) {
    // 30,15 15,13
    //
    directions = [
      [0, -1], // 좌
      [-1, 0], // 상
      [0, 1], // 우
      [1, 0], // 하
    ];
    console.log("좌상우");
  } else if (sx > ex && sy < ey) {
    directions = [
      [0, 1], // 우
      [-1, 0], // 상
      [0, -1], // 좌
      [1, 0], // 하
    ];
    console.log("우상좌");
  } else if (sx > ex && sy === ey) {
    directions = [
      [-1, 0], // 상
      [0, -1], // 좌
      [0, 1], // 우
      [1, 0], // 하
    ];
    console.log("상좌우");
  } else if (sx < ex && sy > ey) {
    directions = [
      [0, -1], // 좌
      [1, 0], // 하
      [-1, 0], // 상
      [0, 1], // 우
    ];
    console.log("좌하상");
  } else if (sx < ex && sy < ey) {
    directions = [
      [0, 1], // 우
      [1, 0], // 하
      [-1, 0], // 상
      [0, -1], // 좌
    ];
    console.log("우하상");
  } else if (sx < ex && sy === ey) {
    directions = [
      [1, 0], // 하
      [0, -1], // 좌
      [0, 1], // 우
      [-1, 0], // 상
    ];
    console.log("하좌우");
  } else if (sx === ex && sy > ey) {
    directions = [
      [0, -1], // 좌
      [-1, 0], // 상
      [1, 0], // 하
      [0, 1], // 우
    ];
    console.log("좌상하");
  } else if (sx === ex && sy < ey) {
    directions = [
      [0, 1], // 우
      [-1, 0], // 상
      [1, 0], // 하
      [0, -1], // 좌
    ];
    console.log("우상하");
  } else {
    directions = [
      [-1, 0], // 상
      [1, 0], // 하
      [0, -1], // 좌
      [0, 1], // 우
    ];
    console.log("상하좌우");
  }
  return directions;
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

  // const graph1 = [
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 1, 2, 1, 2, 0],
  //   [0, 4, 3, 2, 1, 0],
  //   [0, 1, 4, 4, 4, 0],
  //   [0, 1, 2, 3, 3, 0],
  //   [0, 1, 2, 1, 2, 0],
  //   [0, 0, 0, 0, 0, 0],
  // ];
  // return graph1;
  // const graph2 = [
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 1, 2, 1, 2, 0],
  //   [0, 4, 3, 2, 1, 0],
  //   [0, 1, 4, 4, 4, 0],
  //   [0, 0, 2, 3, 3, 0],
  //   [0, 0, 2, 1, 2, 0],
  //   [0, 0, 0, 0, 0, 0],
  // ];
  // return graph2;
};

// 경로를 넣으면 꺾임의 횟수를 판단하여
const calculTransXY = (pathArr: number[][], underBand: number) => {
  let bend = 0;
  const arrXY = [];

  console.log(pathArr);
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
