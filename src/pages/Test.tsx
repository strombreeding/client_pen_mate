import styled from "styled-components";
import { View } from "../nativeView";
import { useEffect, useRef, useState } from "react";
import { gameImg } from "../assets/gameImg";
import { Text } from "../assets/fontStyles";
// import { Socket, io } from "socket.io-client";
import { SCREEN_WIDTH } from "../configs/device";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setCanScroll } from "../store/slices/appState";
import { Container } from "../styles";
import CharBoard from "../components/games/bang/CharBoard";
import { Socket } from "socket.io-client";
import { emptyVal } from "../utils/bang";
import { setAAction } from "../store/slices/bangState";

interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}
interface IMessageProps {
  type: "first" | "second" | "회피" | "지연율" | "지연율리턴" | "";
  data: any;
}

export interface IWillAction {
  action: "공격" | "회피" | "";
  path: number[];
}

const DEFAULT_IMAGE_SIZE = {};

const Char = styled.div<{ data: ICharProps }>`
  position: fixed;
  top: 200px;
  left: ${(prop) => emptyVal(prop.data.width)}px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  background-color: red;
`;
const RightChar = styled.div<{ data: ICharProps }>`
  position: absolute;
  /* top: 300px; */
  bottom: 10px;
  right: ${(prop) =>
    emptyVal(prop.data.width) + -emptyVal(prop.data.width) / 3}px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  background-color: red;
`;

function Test() {
  // 리덕스 써야하는 것들 모음
  const [match, setMatch] = useState(false);
  const [targetReady, setTargetReady] = useState("notYet");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // 리덕스 써야하는것들 모음 끝
  const [nowAction, setNowAction] = useState<IWillAction[]>([
    { action: "", path: [] },
    { action: "", path: [] },
    { action: "", path: [] },
  ]);
  const [player] = useState<"A" | "B">("A");
  // const [player] = useState("B");
  const [ready, setReady] = useState(false);
  const [createdMatch, setCreatedMatch] = useState(false);
  const [step, setStep] = useState<number>(0);
  // a는 b를 건드리면 안대고 반대도 마찬가지. RTC 통신으로 effect로 받아온 대치값 ref
  const bRef = useRef(null);
  const [aWillAction, setAWillAction] = useState([] as number[]);
  const [bWillAction, setBWillAction] = useState([] as number[]);
  const [execAction, setExecAction] = useState(false);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0],
  ]);
  const [obj, setObj] = useState<ICharProps>({
    imgSrc: gameImg.cow_stand_right,
    width: SCREEN_WIDTH * 0.2222,
    height: 0,
    cols: 1,
    rows: 1,
  });
  const [bObj, setBObj] = useState<ICharProps>({
    imgSrc: gameImg.cow_stand_left,
    width: SCREEN_WIDTH * 0.2222,
    height: 0,
    cols: 1,
    rows: 1,
  });

  const [current, setCurrent] = useState(0);
  const [action, setAction] = useState<
    "jump" | "atk" | "stand" | "walk" | null[]
  >([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cnt, setCnt] = useState(3);
  const [matchId, setMatchId] = useState("");
  // const matchId = useRef("");
  const timerRef = useRef(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef(-1);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCanScroll(false));

    return () => {
      dispatch(setCanScroll(true));
      // connection.removeEventListener("icecandidate", co);
    };
  }, []);

  // useEffect(() => {
  //   if (step === 2) {
  //     setReady(true);
  //     sendData("ready");
  //   }
  // }, [step]);

  const xRef = useRef(emptyVal(obj.width));
  const yRef = useRef(10);
  const yLimitRef = useRef(0);

  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(board));
    const movePath = nowAction.filter(
      (action) => action.action === "회피" && action.path.length > 0
    );
    if (movePath.length === 1) {
      const id = player === "A" ? 2 : 3;

      for (let x = 0; x < copy.length; x++) {
        for (let y = 0; y < copy[x].length; y++) {
          if (copy[x][y] === id) copy[x][y] = 0;
        }
      }
      copy[movePath[0].path[0]][movePath[0].path[1]] = id;
      console.log(copy);
    }
    // setBoard()
  }, [nowAction]);

  const aChat: string[] = [];
  const bChat: string[] = [];
  return (
    <Container style={{ flex: 1, justifyContent: "space-between" }}>
      {/* <CharBoard
        obj={obj}
        bObj={bObj}
        setBObj={setBObj}
        board={board}
        aChat={aChat}
        bChat={bChat}
        setObj={setObj}
        player="A"
        action={action}
      /> */}
      <View
        onClick={() => {
          setObj((prev) => ({
            ...prev,
            cols: 8,
            rows: 1,
            imgSrc: gameImg.cow_jump_right_1x8,
          }));
          dispatch(setAAction("jump"));
        }}
        style={{ position: "relative", flex: 1 }}
      >
        <Text.Light_32>점프</Text.Light_32>
      </View>
    </Container>
  );
}

export default Test;
