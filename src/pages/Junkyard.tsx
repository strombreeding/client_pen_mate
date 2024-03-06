import { useEffect, useRef, useState } from "react";
import { Container, EmptyBox } from "../styles";
import * as utils from "../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { type SachunsungGameSetting } from "../types";
import SelectLevel from "../components/games/junkyard/SelectLevel";
import WithAiBot from "../components/games/junkyard/SelectWithAi";
import SelectAiIntellect from "../components/games/junkyard/SelectAiIntellect";
import AiBoard from "../components/games/junkyard/AiBoard";
import UserBoard from "../components/games/junkyard/UserBoard";
import { Text } from "../assets/fontStyles";
import { useAuthVisitPage, usePageState } from "../hooks/getVisitedPage";
import { useNavigate } from "react-router-dom";
import { setBgImg, setLoading } from "../store/slices/appState";
import { gameImg } from "../assets/gameImg";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import { history } from "../configs/history";
import styled, { keyframes } from "styled-components";
import { View } from "../nativeView";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { getAiInt } from "../components/games/junkyard/useful";
import { createRandomLevel } from "../utils/saChunSungUtil";
import Cookies from "js-cookie";
import { GameStatus } from "../store/slices/gameState";
import { imgSrc } from "../assets/img";
// import { createBoard, findPathDFS } from "../utils";

type IGameLevel = [];
const initTitle = keyframes`
  from{
  position: absolute;
  top: 50%;
  left: 50%;
  right: 50%;
  width: ${SCREEN_WIDTH}px;
  text-align: center;
  transform: translate(-50%, -50%);
  }
  to{
  position: absolute;
  top: 10px;
  left: 10px;
  width: ${125}px;
  text-align: center;
  }
`;
const fadeOut = keyframes`
  from{
    background-color: #000000;
    /* z-index:1000; */
  }
  to{
    background-color: rgba(0,0,0,0);
    z-index:-1000;
  }
`;
const fadeInTitle = keyframes`
  from {
    top: 50%;
    left: 50%;
    right: 50%;
    width: ${130}px;
    text-align: center;
    transform: scaleY(0) translate(-50%, -50%);
  }
  to{
    top: 50%;
    left: 50%;
    right: 50%;
    width: ${130}px;
    text-align: center;
    transform: scaleY(1) translate(-50%, -50%);
  }
`;
interface AnimationState {
  step?: number;
}

const Title = styled(View)<AnimationState>`
  position: absolute;
  top: 10px;
  left: 10px;
  width: ${125}px;
  text-align: center;
  animation: ${(props) =>
      props.step === 0 ? fadeInTitle : props.step === 1 ? initTitle : {}}
    0.5s linear forwards;
`;
const BG = styled.div<AnimationState>`
  background-color: black;
  height: 100%;
  width: ${SCREEN_WIDTH}px;
  position: absolute;
  opacity: 1;
  animation: ${(props) => (props.step === 2 ? fadeOut : {})}
    ${(props) => (props.step === 0 ? "1.5s" : "0.5s")} linear forwards;
`;

function BgView({ loading }: { loading: boolean }) {
  const [step, setStep] = useState(-1);
  // 0 = 글자나타남  1= 글자위로 2 = 배경 투명
  useEffect(() => {
    if (loading === false) {
      if (step === 2) {
        return;
      } else if (step === -1) {
        setStep(step + 1);
      } else {
        setTimeout(() => {
          setStep(step + 1);
        }, 1500);
      }
    }
  }, [step]);
  return (
    <BG step={step}>
      <Title step={step}>
        <Text.SemiBold_24>우주 고철장</Text.SemiBold_24>
      </Title>
    </BG>
  );
}
function Junkyard() {
  const pageState = usePageState(false);
  const loading = useSelector((state: RootState) => state.appState.loading);
  const validateAuth = useAuthVisitPage();
  const navigation = useNavigate();
  const [aiBoard, setAiBoard] = useState([] as number[][]);
  const [board, setBoard] = useState([] as number[][]);
  const [complate, setComplate] = useState("");
  const [aiComplate, setAiComplate] = useState("");
  const [settingStep, setSettingStep] = useState(0);
  const [aiStatus, setAiStatus] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [onTimer, setOnTimer] = useState(false);
  const [navVisble, setNavVisble] = useState(false);
  const [gameSetting, setGameSetting] = useState<SachunsungGameSetting>({
    matchAI: false,
    level: "8,9",
    // level: "3,4",
    intAI: 5,
  });
  const [clearList, setClearList] = useState([]);
  const [isStarting, setIsStarting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const create = () => {
    const [row, col] = gameSetting.level.split(",");
    const createdBoard = utils.saChunSung.createBoard(Number(row), Number(col));
    const boardToString = JSON.stringify(
      Array.from({ length: Number(row) + 2 }, () =>
        Array(Number(col) + 2).fill(0)
      )
    );
    setBoard(JSON.parse(JSON.stringify(createdBoard)));
    if (gameSetting.matchAI) {
      setAiBoard(JSON.parse(JSON.stringify(createdBoard)));
      setAiStatus(true);
      setAiComplate(boardToString);
    }
    setComplate(boardToString);
  };

  const refreshAction = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const gameInit = () => {
    const cookie = Cookies.get("ingame");
    if (cookie == null) {
      console.log("어디서 막혀?1");
      history.push("games");
      console.log("어디서 막혀?2");
    } else {
      console.log("어디서 막혀?3", cookie);
      const gameInfo: GameStatus = JSON.parse(cookie);
      setGameSetting((prev) => ({
        ...prev,
        intAI: getAiInt(gameInfo.aiOption),
        level: "3,4",
        matchAI: gameInfo.player !== "AI" ? false : true,
      }));
      console.log("어디서 막혀?4");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setNavVisble(true);
    }, 3000);
    console.log(gameSetting);
    // console.log(gameState);
    gameInit();
    console.log("시발");
    dispatch(setBgImg(gameImg.junkward_bg));
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        const confirm = window.confirm(
          "포인트를 잃어버립니다. 나가시겠습니까?"
        );
        if (confirm) {
          history.push("/games");
          Cookies.remove("ingame");
          // navigation("/games", { replace: true });
        } else {
          window.history.forward();
        }
      }
    });
    window.addEventListener("beforeunload", refreshAction);

    return () => {
      dispatch(setBgImg(undefined));
      unlistenHistoryEvent();
      window.removeEventListener("beforeunload", refreshAction);
    };
  }, []);

  useEffect(() => {
    const newLevel = createRandomLevel(clearList);
    setGameSetting((prev) => ({ ...prev, level: newLevel }));
    create();

    //
  }, [clearList]);
  let startY = 0;
  let endY = 0;
  if (loading) return <></>;
  return (
    <Container style={{ flex: 1, justifyContent: "space-between" }}>
      <Title>
        <Text.SemiBold_24 onClick={() => {}}>우주 고철장</Text.SemiBold_24>
      </Title>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Text.SemiBold_20>시발</Text.SemiBold_20>
      </View>
      <BgView loading={false} />
      <EmptyBox height={60} />
      <BgView loading={loading} />

      <UserBoard
        board={board}
        setBoard={setBoard}
        settingStep={settingStep}
        complate={complate}
      />
      {/* <AiBoard
        intAI={gameSetting.intAI}
        settingStep={settingStep}
        aiComplate={aiComplate}
        aiStatus={aiStatus}
        aiBoard={aiBoard}
        setAiBoard={setAiBoard}
      /> */}
      <EmptyBox height={60} />
      <BottomPrevNext style={{ zIndex: 1 }} visible={navVisble} />
      <View
        onTouchStart={(e) => {
          startY = e.nativeEvent.changedTouches[0].clientY;
        }}
        onTouchEnd={(e) => {
          endY = e.nativeEvent.changedTouches[0].clientY;
          if (endY > startY) {
            console.log("내려감");
            setNavVisble(false);
          } else {
            console.log("올라옴");
            setNavVisble(true);
          }
        }}
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 0,
          height: 130,
          width: SCREEN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={imgSrc.slide_up}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </View>
    </Container>
  );
}

export default Junkyard;
