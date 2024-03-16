import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { gameImg } from "../../../../assets/gameImg";
import { SCREEN_WIDTH } from "../../../../configs/device";
import { emptyVal, getPostionValue } from "../../../../utils/bang";

interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}

// /*
//     1초에 8번 , 위치값 전달해주면 위치값/60 만큼 ref를 ++해줘서 이동 시킴.
// */
// export const jump = (
//   charRef: MutableRefObject<HTMLDivElement | null>,
//   xRef: MutableRefObject<number>,
//   yRef: MutableRefObject<number>,
//   currentRef: MutableRefObject<number>,
//   timerRef: MutableRefObject<number>,
//   animationRef: MutableRefObject<number>,
//   obj: ICharProps,
//   setObj: React.Dispatch<React.SetStateAction<ICharProps>>
//   //   board: BoardType,
//   //   gameImg: GameImgType,
// ) => {
//   const now = new Date().getTime();

//   //   const locations = getLocationValue([0, 5], obj.width, board);
//   if (!charRef.current) return;

//   xRef.current = xRef.current + 1;
//   if (charRef.current) {
//     console.log(charRef.current.style.left, "로 움직여야하는데 ...");
//     // charRef.current.style.right = xRef.current + "px";
//     xRef.current = xRef.current + 2;
//     charRef.current.style.left = xRef.current + 10 + "px";
//   }

//   const currentCol = currentRef.current % obj.cols;
//   const currentRow = Math.floor(currentRef.current / obj.cols);
//   const bgPosition = `${-obj.width * currentCol}px ${
//     -obj.height * currentRow
//   }px`;
//   timerRef.current++;

//   if (timerRef.current - now <= 0) {
//     console.log(currentRef.current, "커런트");
//     //   console.log("움직임");
//     timerRef.current = new Date().getTime() + 60;
//     if (charRef.current) charRef.current.style.backgroundPosition = bgPosition;
//     if (currentRef.current >= 8) {
//       // charRef.current.style.backgroundImage = `url(${gameImg.right_cowboy})`;
//       setObj((prev) => ({
//         imgSrc: gameImg.cow_stand_right,
//         width: SCREEN_WIDTH * 0.2222,
//         height: 0,
//         cols: 1,
//         rows: 1,
//       }));
//       currentRef.current = 0;
//       animationRef.current = 0;
//       return;
//     } else {
//       currentRef.current++;
//     }
//   } else {
//   }
//   animationRef.current = requestAnimationFrame(() =>
//     jump(charRef, xRef, yRef, currentRef, timerRef, animationRef, obj, setObj)
//   );
// };

export const jump = (
  charRef: MutableRefObject<HTMLDivElement | null>,
  obj: ICharProps,
  setObj: React.Dispatch<React.SetStateAction<ICharProps>>,
  postion: { top: number; left: number },
  setPostion: Dispatch<SetStateAction<{ top: number; left: number }>>,
  nextPath: number[],
  round: number
) => {
  // const getPostion = getPostionValue([0, 1], obj.width, postion, round);
  const getPostion = getPostionValue(nextPath, obj.width, postion, round);
  console.log("점프에서 받은 내용", postion);
  console.log("이동 좌표", getPostion);
  // const getPostion = getPostionValue([0, 1], obj.width, postion);
  const isLeftMove = postion.left < getPostion[1] ? false : true;
  const isTopMove = nextPath[0] <= 0 ? true : false;
  const xLength = (obj.width * 0.625) / 8;
  let yLength = (getPostion[1] + -postion.left) / 8; // 기존 y값을 더해줘야 함.
  if (yLength < 0) {
    yLength = yLength * -1;
  }
  console.log(yLength);
  const maxX = obj.width * 0.625 * 2;
  let x = postion.top;
  let y = postion.left;
  setObj((prev) => ({
    ...prev,
    imgSrc: gameImg.cow_jump_right_1x8,
    rows: 1,
    cols: 8,
  }));

  let current = 0;
  let timer = new Date().getTime();
  let animation = 0;

  const animate = () => {
    const now = new Date().getTime();

    if (!charRef.current) return;
    // charRef.current.style.backgroundImage = gameImg.cow_jump_right_1x8;
    const currentCol = current % obj.cols;
    const currentRow = Math.floor(current / obj.cols);
    const bgPosition = `${-obj.width * currentCol}px ${
      -obj.height * currentRow
    }px`;

    timer++;

    if (timer - now <= 0) {
      timer = new Date().getTime() + 60;

      charRef.current.style.backgroundPosition = bgPosition;
      if (current >= 8) {
        setObj((prev) => ({
          imgSrc: isLeftMove ? gameImg.cow_stand_left : gameImg.cow_stand_right,
          width: SCREEN_WIDTH * 0.2222,
          height: 0,
          cols: 1,
          rows: 1,
        }));
        charRef.current.style.backgroundPosition = "0px 0px";
        setPostion({ top: getPostion[0], left: getPostion[1] });
        current = 0;
        animation = 0;

        return;
      } else {
        if (x < 0) {
          x = 0;
        } else if (isTopMove) {
          x = x - xLength;
        } else if (!isTopMove && x <= maxX) {
          x = x + xLength;
        } else {
          x = maxX;
        }
        if (isLeftMove) {
          y = y - yLength;
        } else {
          y = y + yLength;
          console.log("오른쪽으로!");
        }
        console.log(x, y);
        charRef.current.style.top = x + "px";
        charRef.current.style.left = y + "px";
        current++;
      }
    }

    animation = requestAnimationFrame(animate);
  };

  animate();
};
