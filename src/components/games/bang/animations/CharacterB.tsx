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
import { attack } from "./attack";
import HitBox from "../detail/HitBox";
import ChatBox from "../detail/Chat";
import { ICharProps } from "../../../../pages/Bang";
import { View } from "../../../../nativeView";

// 스프라이트 이미지 구성품, 및 크기

const Char = styled.div<{ data: ICharProps; player: "A" | "B" }>`
  position: absolute;
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-image: url(${(props) => props.data.imgSrc});
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Indicator = styled(View)<{ src: string; width: number }>`
  background-image: url(${(prev) => prev.src});
  background-size: cover;
  background-position: 0px 0px;
  width: ${(props) => props.width / 1.5}px;
  height: ${(props) => props.width / 2.8}px;
  position: absolute;
  opacity: 0.7;
  bottom: -${(props) => props.width / 14}px;
`;
interface CharacterProps {
  charObj: ICharProps;
  setCharObj: Dispatch<SetStateAction<ICharProps>>;
  type: "A" | "B";
  player: "A" | "B";
  bChat: string[];
}
function CharacterB({
  charObj,
  setCharObj,
  type,
  player,
  bChat,
}: CharacterProps) {
  const charRef = useRef<HTMLDivElement | null>(null);

  //  emptyVal(width) + -emptyVal(width) / 3 + width * 0.75 * y;
  //  emptyVal(width) + -emptyVal(width) / 3 + width * 0.75 * 0;
  const [position, setPosition] = useState({
    left:
      emptyVal(charObj.width) + // 최소한의 캐릭터 히트박스
      -emptyVal(charObj.width) / 3 + // 처음 여유값
      charObj.width * 0.75 * 5, // 이동하려는 값 0 === y 축
    top: charObj.width * 0.625 * 1,
  });
  const round = useSelector((state: RootState) => state.bangState.round);
  // charRef.current.style.top = charObj.width * 0.625 * 1;
  const nowAction = useSelector(
    (state: RootState) => state.bangState.nowAction
  );
  const targetAvoidPath = useSelector(
    (state: RootState) => state.bangState.targetAvoidPath
  );
  const targetAtkPath = useSelector(
    (state: RootState) => state.bangState.targetAtkPath
  );
  const bAction = useSelector((state: RootState) => state.bangState.bAction);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (bAction === "jump") {
      const jumpIdx = nowAction.findIndex((obj) => obj.action === "회피");

      jump(
        charRef,
        charObj,
        setCharObj,
        position,
        setPosition,
        player === type ? nowAction[jumpIdx].path : targetAvoidPath
      );
      return;
    } else if (bAction === "atk") {
      const atkIdx = nowAction.findIndex((obj) => obj.action === "공격");

      attack(
        charRef,
        charObj,
        setCharObj,
        position,
        player === type ? nowAction[atkIdx].path : targetAtkPath
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
        top: position.top,
        left: position.left,
      }}
      data={charObj}
      player={type}
    >
      <ChatBox chat={bChat} />
      <HitBox who="B" charRef={charRef} />
      {player === type && (
        <Indicator
          src={gameImg.char_indicator}
          width={charObj.width}
        ></Indicator>
      )}
    </Char>
  );
}

export default memo(CharacterB);
