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

export const attack = (
  charRef: MutableRefObject<HTMLDivElement | null>,
  obj: ICharProps,
  setObj: React.Dispatch<React.SetStateAction<ICharProps>>,
  postion: { top: number; left: number },
  nextPath: number[]
) => {
  // const getPostion = getPostionValue([0, 1], obj.width, postion, round);
  const getPostion = getPostionValue(nextPath, obj.width);
  // const getPostion = getPostionValue([0, 1], obj.width, postion);
  const isLeftShot = postion.left < getPostion[1] ? false : true;
  let current = 0;
  let timer = new Date().getTime();
  let animation = 0;

  setObj((prev) => ({
    ...prev,
    imgSrc: isLeftShot ? gameImg.cow_atk_left_1x3 : gameImg.cow_atk_right_1x3,
    rows: 1,
    cols: 3,
  }));

  const copyObj = {
    rows: 1,
    cols: 8,
    width: obj.width,
  };
  const animate = () => {
    const now = new Date().getTime();

    if (!charRef.current) return;
    // charRef.current.style.backgroundImage = gameImg.cow_jump_right_1x8;
    const currentCol = current % copyObj.cols;
    const currentRow = Math.floor(current / copyObj.cols);
    const bgPosition = `
      ${-copyObj.width * currentCol}px 
      ${-copyObj.width * 0.625 * currentRow}px
    `;

    timer++;

    if (timer - now <= 0) {
      timer = new Date().getTime() + 90;

      charRef.current.style.backgroundPosition = bgPosition;
      if (current >= 3) {
        // charRef.current.style.backgroundPosition = "0px 0px";
        // charRef.current.style.backgroundImage = isLeftShot
        //   ? gameImg.cow_stand_left
        //   : gameImg.cow_stand_right;
        setObj((prev) => ({
          ...prev,
          imgSrc: isLeftShot ? gameImg.cow_stand_left : gameImg.cow_stand_right,
          width: SCREEN_WIDTH * 0.2222,
          height: 0,
          cols: 1,
          rows: 1,
        }));

        // setPostion({ top: getPostion[0], left: getPostion[1] });
        current = 0;
        animation = 0;

        return;
      } else {
        current++;
      }
    }

    animation = requestAnimationFrame(animate);
  };

  animate();
};
