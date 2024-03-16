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

export const jump = (
  charRef: MutableRefObject<HTMLDivElement | null>,
  obj: ICharProps,
  setObj: React.Dispatch<React.SetStateAction<ICharProps>>,
  postion: { top: number; left: number },
  setPostion: Dispatch<SetStateAction<{ top: number; left: number }>>,
  nextPath: number[] // 이게 상대일수도 있고 나일 수도 있음
) => {
  // const getPostion = getPostionValue([0, 1], obj.width, postion, round);
  const getPostion = getPostionValue(nextPath, obj.width);
  const isLeftMove = postion.left < getPostion[1] ? false : true;
  const isTopMove = postion.top < getPostion[0] ? false : true;
  const xLength = (obj.width * 0.625) / 8;
  let yLength = (getPostion[1] + -postion.left) / 8; // 기존 y값을 더해줘야 함.
  if (yLength < 0) {
    yLength = yLength * -1;
  }

  const maxX = obj.width * 0.625 * 2;
  let x = postion.top;
  let y = postion.left;
  let current = 0;
  let timer = new Date().getTime();
  let animation = 0;

  setObj((prev) => ({
    ...prev,
    imgSrc: isLeftMove ? gameImg.cow_jump_left_1x8 : gameImg.cow_jump_right_1x8,
    rows: 1,
    cols: 8,
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
      timer = new Date().getTime() + 60;

      charRef.current.style.backgroundPosition = bgPosition;
      if (current >= 8) {
        charRef.current.style.backgroundPosition = "0px 0px";
        charRef.current.style.backgroundImage = isLeftMove
          ? gameImg.cow_stand_left
          : gameImg.cow_stand_right;
        setObj((prev) => ({
          ...prev,
          imgSrc: isLeftMove ? gameImg.cow_stand_left : gameImg.cow_stand_right,
          width: SCREEN_WIDTH * 0.2222,
          height: 0,
          cols: 1,
          rows: 1,
        }));

        setPostion({ top: getPostion[0], left: getPostion[1] });
        current = 0;
        animation = 0;

        return;
      } else {
        if (x < 0) {
          x = 0;
        } else if (isTopMove) {
          x = x - xLength;
        } else if (!isTopMove) {
          x = x + xLength;
        }
        if (isLeftMove) {
          y = y - yLength;
        } else {
          y = y + yLength;
        }
        if (x >= maxX) {
          x = maxX;
        }
        charRef.current.style.top = x + "px";
        charRef.current.style.left = y + "px";
        current++;
      }
    }

    animation = requestAnimationFrame(animate);
  };

  animate();
};
