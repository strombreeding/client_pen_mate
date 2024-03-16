import { MutableRefObject } from "react";
import { gameImg } from "../../../../assets/gameImg";
import { SCREEN_WIDTH } from "../../../../configs/device";

interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}

/* 
    1초에 8번 , 위치값 전달해주면 위치값/60 만큼 ref를 ++해줘서 이동 시킴. 
*/
export const jump = (
  charRef: MutableRefObject<HTMLDivElement | null>,
  xRef: MutableRefObject<number>,
  yRef: MutableRefObject<number>,
  currentRef: MutableRefObject<number>,
  timerRef: MutableRefObject<number>,
  animationRef: MutableRefObject<number>,
  obj: ICharProps,
  setObj: React.Dispatch<React.SetStateAction<ICharProps>>
  //   board: BoardType,
  //   gameImg: GameImgType,
) => {
  const now = new Date().getTime();

  //   const locations = getLocationValue([0, 5], obj.width, board);
  if (!charRef.current) return;

  xRef.current = xRef.current + 1;
  if (charRef.current) {
    console.log(charRef.current.style.left, "로 움직여야하는데 ...");
    // charRef.current.style.right = xRef.current + "px";
    xRef.current = xRef.current + 2;
    charRef.current.style.left = xRef.current + 10 + "px";
  }

  const currentCol = currentRef.current % obj.cols;
  const currentRow = Math.floor(currentRef.current / obj.cols);
  const bgPosition = `${-obj.width * currentCol}px ${
    -obj.height * currentRow
  }px`;
  timerRef.current++;

  if (timerRef.current - now <= 0) {
    console.log(currentRef.current, "커런트");
    //   console.log("움직임");
    timerRef.current = new Date().getTime() + 60;
    if (charRef.current) charRef.current.style.backgroundPosition = bgPosition;
    if (currentRef.current >= 8) {
      // charRef.current.style.backgroundImage = `url(${gameImg.right_cowboy})`;
      setObj((prev) => ({
        imgSrc: gameImg.cow_stand_right,
        width: SCREEN_WIDTH * 0.2222,
        height: 0,
        cols: 1,
        rows: 1,
      }));
      currentRef.current = 0;
      animationRef.current = 0;
      return;
    } else {
      currentRef.current++;
    }
  } else {
  }
  animationRef.current = requestAnimationFrame(() =>
    jump(charRef, xRef, yRef, currentRef, timerRef, animationRef, obj, setObj)
  );
};
