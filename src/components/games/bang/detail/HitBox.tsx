import styled from "styled-components";
import { SCREEN_WIDTH } from "../../../../configs/device";
import { gameImg } from "../../../../assets/gameImg";
import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { hit } from "../animations/hit";
import { setAHit, setBHit } from "../../../../store/slices/bangState";

const Hit = styled.div<{ src: string }>`
  position: absolute;
  left: 7px;
  width: ${SCREEN_WIDTH * 0.2111}px;
  height: ${SCREEN_WIDTH * 0.2111}px;
  background-size: ${SCREEN_WIDTH * 0.2111 * 3}px ${SCREEN_WIDTH * 0.2111 * 1}px;
  background-position: 0px 0px;
  background-image: url(${(props) => props.src});
  display: none;
`;

function HitBox({ who }: { who: "A" | "B" }) {
  const aHit = useSelector((state: RootState) => state.bangState.aHit);
  const bHit = useSelector((state: RootState) => state.bangState.bHit);
  const dispatch = useDispatch<AppDispatch>();
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    console.log(`
        im ${who} 
        ahit = ${aHit} 
        bhit = ${bHit}
    `);
    if (aHit && who === "A") {
      hit(imgRef);
      setTimeout(() => {
        dispatch(setAHit(false));
      }, 1000);
      return;
    }
    if (bHit && who === "B") {
      hit(imgRef);
      setTimeout(() => {
        dispatch(setBHit(false));
      }, 1000);
      return;
    }
  }, [aHit, bHit]);

  return <Hit ref={imgRef} src={gameImg.hit_1x3} />;
}

export default memo(HitBox);
