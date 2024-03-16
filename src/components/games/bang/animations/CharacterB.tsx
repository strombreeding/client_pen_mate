/* 액션 컴포넌트는 주어진 액션을 받으면 해당 액션을 수행해야함
    그렇기 때문에 파라미터로 state로 관리되고 있는 action 값만 받으면 됨
    03.14기준 점프, 스탠드, 공격 액션만 필요하지만 필요에 따라서 확장성 있게 개발해야함
    주어진 action 값에 따라서 다른 animations function 을 실행시키면 될듯함
    애니메이션 펑션이 받을 값들은 state 또는 ref로 컴포넌트 자체에서 관리 해야하나 ?
    펑션이 ref를 가질 수 있나 ?
*/

import styled from "styled-components";
import { SCREEN_WIDTH } from "../../../../configs/device";
import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { jump } from "./jump";
import { emptyVal } from "../../../../utils/bang";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { gameImg } from "../../../../assets/gameImg";
import { setAAction } from "../../../../store/slices/bangState";

// 스프라이트 이미지 구성품, 및 크기
interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}

const Char = styled.div<{ data: ICharProps; player: "A" | "B" }>`
  position: absolute;
  top: ${(props) => props.data.width * 0.625}px;
  left: ${(props) =>
    emptyVal(props.data.width) +
    -emptyVal(props.data.width) / 3 +
    props.data.width * 0.75 * (props.player === "A" ? 0 : 5)}px;
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-image: url(${(props) => props.data.imgSrc});
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  display: flex;
  align-items: center;
`;

interface CharacterProps {
  charObj: ICharProps;
  setCharObj: Dispatch<SetStateAction<ICharProps>>;
  type: "A" | "B";
  player: "A" | "B";
}
function CharacterB({ charObj, setCharObj, type, player }: CharacterProps) {
  const charRef = useRef<HTMLDivElement | null>(null);

  //  emptyVal(width) + -emptyVal(width) / 3 + width * 0.75 * y;
  //  emptyVal(width) + -emptyVal(width) / 3 + width * 0.75 * 0;
  const [position, setPosition] = useState({
    left:
      emptyVal(charObj.width) + // 최소한의 캐릭터 히트박스
      -emptyVal(charObj.width) / 3 + // 처음 여유값
      charObj.width * 0.75 * (type === "A" ? 0 : 5), // 이동하려는 값 0 === y 축
    top: charObj.width * 0.625 * 1,
  });
  const round = useSelector((state: RootState) => state.bangState.round);
  // charRef.current.style.top = charObj.width * 0.625 * 1;
  const step = useSelector((state: RootState) => state.bangState.step);
  const nowAction = useSelector(
    (state: RootState) => state.bangState.nowAction
  );
  const targetAction = useSelector(
    (state: RootState) => state.bangState.targetAvoidPath
  );
  const bAction = useSelector((state: RootState) => state.bangState.bAction);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (bAction === "jump") {
      console.log(
        "B의 개쩌는 움직임 보시겠습니다.",
        player,
        type,
        nowAction[step].path,
        targetAction,
        step
      );
      setCharObj((prev) => ({
        ...prev,
        imgSrc: gameImg.cow_jump_right_1x8,
        rows: 1,
        cols: 8,
      }));
      jump(
        charRef,
        charObj,
        setCharObj,
        position,
        setPosition,

        player === type ? nowAction[step].path : targetAction,
        round
      );
      return;
    }
  }, [bAction]);

  // useEffect(() => {
  //   dispatch(setAAction("stand"));
  // }, [position]);
  return (
    <Char
      ref={charRef}
      style={{
        backgroundImage: gameImg.cow_jump_right_1x8,
      }}
      data={charObj}
      player={type}
    ></Char>
  );
}

export default memo(CharacterB);
