import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { gameImg } from "../../../../assets/gameImg";
import { SCREEN_WIDTH } from "../../../../configs/device";
import { emptyVal, getPostionValue } from "../../../../utils/bang";
import { ICharProps } from "../../../../pages/Bang";

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
  let standImg = "";
  let actionImg = "";
  if (isLeftShot && obj.bounti) {
    standImg = gameImg.bounti_stand_left;
    actionImg = gameImg.bounti_atk_left_3x2;
  } else if (isLeftShot && !obj.bounti) {
    standImg = gameImg.cow_stand_left;
    actionImg = gameImg.cow_atk_left_1x3;
  } else if (!isLeftShot && obj.bounti) {
    standImg = gameImg.bounti_stand_right;
    actionImg = gameImg.bounti_atk_right_3x2;
  } else if (!isLeftShot && !obj.bounti) {
    standImg = gameImg.cow_stand_right;
    actionImg = gameImg.cow_atk_right_1x3;
  }
  const rows = obj.bounti ? 3 : 1;
  const cols = obj.bounti ? 2 : 3;
  const maxCurrent = obj.bounti ? 6 : 3;
  const frameTime = obj.bounti ? 45 : 90;
  setObj((prev) => ({
    ...prev,
    imgSrc: actionImg,
    rows,
    cols,
  }));
  const copyObj = {
    rows,
    cols,
    width: obj.width,
  };
  const animate = () => {
    const now = new Date().getTime();

    if (!charRef.current) return;
    // charRef.current.style.backgroundImage = gameImg.cow_attack_right_1x8;
    const currentCol = current % copyObj.cols;
    const currentRow = Math.floor(current / copyObj.cols);
    const bgPosition = `
      ${-copyObj.width * currentCol}px 
      ${-copyObj.width * 0.625 * currentRow}px
    `;

    timer++;

    if (timer - now <= 0) {
      timer = new Date().getTime() + frameTime;

      charRef.current.style.backgroundPosition = bgPosition;
      if (current >= maxCurrent) {
        // charRef.current.style.backgroundPosition = "0px 0px";
        // charRef.current.style.backgroundImage = isLeftShot
        //   ? gameImg.cow_stand_left
        //   : gameImg.cow_stand_right;
        setObj((prev) => ({
          ...prev,
          imgSrc: standImg,
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
