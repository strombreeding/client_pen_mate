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

export const hit = (charRef: MutableRefObject<HTMLDivElement | null>) => {
  let current = 0;
  let timer = new Date().getTime();
  let animation = 0;

  const copyObj = {
    rows: 1,
    cols: 3,
    width: SCREEN_WIDTH * 0.2111,
  };

  const animate = () => {
    const now = new Date().getTime();

    if (!charRef.current) return;
    // charRef.current.style.backgroundImage = gameImg.cow_jump_right_1x8;
    const currentCol = current % copyObj.cols;
    const currentRow = Math.floor(current / copyObj.cols);
    const bgPosition = `
      ${-copyObj.width * currentCol}px 
      ${-copyObj.width * currentRow}px
    `;
    charRef.current.style.display = "flex";

    timer++;

    if (timer - now <= 0) {
      timer = new Date().getTime() + 40;

      charRef.current.style.backgroundPosition = bgPosition;
      if (current >= 3) {
        current = 0;
        animation = 0;
        charRef.current.style.display = "none";
        return;
      } else {
        current++;
      }
    }

    animation = requestAnimationFrame(animate);
  };

  animate();
};
