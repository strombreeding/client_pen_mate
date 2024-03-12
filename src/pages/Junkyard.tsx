import { useEffect, useRef, useState } from "react";
import { Container, EmptyBox } from "../styles";
import * as utils from "../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import type { JunkwardGameSetting } from "../types";
import UserBoard from "../components/games/junkyard/UserBoard";
import { Text } from "../assets/fontStyles";
import { useAuthVisitPage, usePageState } from "../hooks/getVisitedPage";
import { useNavigate } from "react-router-dom";
import { setBgImg, setBgm } from "../store/slices/appState";
import { gameImg } from "../assets/gameImg";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import { history } from "../configs/history";
import styled, { keyframes } from "styled-components";
import { Pressable, View } from "../nativeView";
import { SCREEN_WIDTH } from "../configs/device";
import { getAiInt } from "../components/games/junkyard/useful";
import { createRandomLevel } from "../utils/saChunSungUtil";
import Cookies from "js-cookie";
import { GameStatus } from "../store/slices/gameState";
import { imgSrc } from "../assets/img";
import { decrypt, encrypt } from "../utils/crypto";
import { getDecryptedCookie, setEncryptedCookie } from "../utils/cookies";
import { allBgm } from "../assets/sound";
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
    z-index:1000;
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
  z-index: 1000;
  animation: ${(props) => (props.step === 2 ? fadeOut : {})}
    ${(props) => (props.step === 0 ? "1.5s" : "0.5s")} linear forwards;
`;

function BgView({
  loading,
  isContinue,
}: {
  loading: boolean;
  isContinue: boolean;
}) {
  const [step, setStep] = useState(-1);
  // 0 = 글자나타남  1= 글자위로 2 = 배경 투명
  useEffect(() => {
    if (isContinue) {
      setStep(2);
    }
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

interface InGameState extends GameStatus {
  id: string;
  isStarting: boolean;
  startTime: number;
  clearList: string[];
  board: number[][];
  aiBoard: number[][];
  level: string;
  isContinue: boolean;
}
// type InGameState extend= GameStatus;
let startY = 0;
let endY = 0;
function Junkyard() {
  const pageState = usePageState(false);
  const navigation = useNavigate();
  const loading = useSelector((state: RootState) => state.appState.loading);
  const validateAuth = useAuthVisitPage();
  const continueRef = useRef(false);
  const [aiBoard, setAiBoard] = useState([] as number[][]);
  const [reward, setReward] = useState(0);
  const [board, setBoard] = useState([] as number[][]);
  const [complate, setComplate] = useState("");
  const [aiComplate, setAiComplate] = useState("");
  const [settingStep, setSettingStep] = useState(0);
  const [aiStatus, setAiStatus] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [tictoc, setTictoc] = useState(0);
  const [navVisble, setNavVisble] = useState(false);
  const [gameSetting, setGameSetting] = useState<JunkwardGameSetting>({
    id: "",
    matchAI: false,
    level: "0,0",
    // level: "3,4",
    intAI: 5,
  });
  const [clearList, setClearList] = useState([] as string[]);
  const [isStarting, setIsStarting] = useState(false);
  const [startBtnText, setStartBtnText] = useState("시작");
  const dispatch = useDispatch<AppDispatch>();

  const create = () => {
    console.log(gameSetting.level);
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

  const gameInit = () => {
    const cookie = getDecryptedCookie("ingame");
    if (cookie == null) {
      history.push("/games");
    } else {
      const gameInfo: InGameState = cookie;
      const nowTime = Math.floor(new Date().getTime() / 1000);
      setGameSetting((prev) => ({
        ...prev,
        id: gameInfo.id,
        intAI: getAiInt(gameInfo.aiOption),
        level: gameInfo.level == undefined ? "3,4" : gameInfo.level,
        matchAI: gameInfo.player !== "AI" ? false : true,
      }));
      setIsStarting(gameInfo.isStarting || false);
      setStartTime(gameInfo.startTime || 0);
      setTictoc(gameInfo.startTime - nowTime);
      setClearList(gameInfo.clearList || []);
      setBoard(gameInfo.board || []);
      setAiBoard(gameInfo.aiBoard || []);
      if (gameInfo.isContinue) {
        continueRef.current = true;
      }
    }
  };

  // init 이펙트
  useEffect(() => {
    setTimeout(() => {
      setNavVisble(true);
    }, 3000);
    // console.log(gameState);
    gameInit();
    console.log(board.length);
    console.log("십쉐야");
    dispatch(setBgm(allBgm.junkyard));
    dispatch(setBgImg(gameImg.junkward_bg));

    return () => {
      dispatch(setBgImg(undefined));
      dispatch(setBgm(allBgm.home));
      Cookies.remove("ingame");
    };
  }, []);

  // 문제 풀때마다 쿠키에 게임상태를 저장하는 이펙트
  // + 뒤로가기, 새로고침 등의 페이지전환 처리
  useEffect(() => {
    const getCookie = getDecryptedCookie("ingame");
    const saveObj: InGameState = {
      ...getCookie,
      ...gameSetting,
      board,
      aiBoard,
      clearList,
      isStarting,
      startTime,
      isContinue: true,
    };
    setEncryptedCookie("ingame", saveObj);
    console.log("쿠키업뎃!", saveObj);
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        const confirm = window.confirm(
          "포인트를 잃어버립니다. 나가시겠습니까?"
        );
        if (confirm) {
          Cookies.remove("ingame");
          Cookies.remove("mute");
          history.push("/games");
          navigation("/games", { replace: true });
          // navigation("/games", { replace: true });
        } else {
          window.history.forward();
        }
      }
    });
    const refreshAction = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      Cookies.remove("mute");
    };
    window.addEventListener("pagehide", refreshAction);
    window.addEventListener("beforeunload", refreshAction);
    return () => {
      unlistenHistoryEvent();
      window.addEventListener("pagehide", refreshAction);
      window.removeEventListener("beforeunload", refreshAction);
      Cookies.remove("mute");
    };
  }, [board]);

  // 바텀 네비 제어
  useEffect(() => {
    let slideDown: string | number | NodeJS.Timeout | undefined = undefined;
    if (navVisble) {
      slideDown = setTimeout(() => {
        setNavVisble(false);
      }, 7000);
    }
    return () => {
      clearTimeout(slideDown);
    };
  }, [navVisble]);

  // 클리어시 다음 board 생성까지의 이펙트
  useEffect(() => {
    if (!isStarting) return;
    if (continueRef.current) {
      continueRef.current = false;
    } else {
      const newLevel = createRandomLevel(clearList);
      setGameSetting((prev) => ({ ...prev, level: newLevel }));
      create();
    }

    //
  }, [clearList]);

  // 시작 버튼 이후 게임판 생성까지의 이펙트
  useEffect(() => {
    if (Number(startBtnText) <= 3) {
      setTimeout(() => {
        if (startBtnText === "시작") {
          setStartBtnText("3");
        } else if (startBtnText === "3") {
          setStartBtnText("2");
        } else if (startBtnText === "2") {
          setStartBtnText("1");
        } else if (startBtnText === "1") {
          const nowTime = Math.floor(new Date().getTime() / 1000);
          const clearTime = Math.floor((new Date().getTime() + 60000) / 1000);
          create();
          setTictoc(clearTime - nowTime);
          setStartTime(clearTime);
          setIsStarting(true);
        }
      }, 1000);
      return;
    }
  }, [startBtnText]);

  // 타이머 제어 및 타임아웃 이후 이펙트
  useEffect(() => {
    if (!isStarting) return;
    // if (tictoc > 0) {
    if (tictoc <= 0) {
      alert("리저트 페이지로 이동");
      console.log(getDecryptedCookie("ingame"));
      navigation("/games/reward", {
        replace: true,
        state: { data: getDecryptedCookie("ingame") },
      });
    }
    const timer = setTimeout(() => {
      setTictoc(tictoc - 1);
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  }, [isStarting, tictoc]);

  if (loading) return <></>;
  return (
    <Container style={{ flex: 1, justifyContent: "space-between" }}>
      <Title>
        <Text.SemiBold_24>우주 고철장</Text.SemiBold_24>
      </Title>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          alignItems: "end",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <img src={imgSrc.timer} style={{ width: 20, aspectRatio: 1 }} />
          <EmptyBox width={3} />
          <Text.SemiBold_20>
            {isNaN(tictoc) || tictoc < 0 ? "" : tictoc}
          </Text.SemiBold_20>
        </View>
        <EmptyBox height={15} />
        <View style={{ flexDirection: "row" }}>
          <img
            src={imgSrc.atata_un}
            style={{ width: 20, height: 20, marginTop: -3.5 }}
          />
          <Text.Light_16>{50}+</Text.Light_16>
        </View>
      </View>
      <BgView loading={loading} isContinue={isStarting} />
      <EmptyBox height={60} />
      {board.length > 0 ? (
        <UserBoard
          board={board}
          setBoard={setBoard}
          settingStep={settingStep}
          complate={complate}
          nowLevel={gameSetting.level}
          setClearList={setClearList}
        />
      ) : (
        <StartBtn
          onClick={() => {
            setStartBtnText("3");
            setNavVisble(false);
          }}
        >
          <Text.Light_24>{startBtnText}</Text.Light_24>
        </StartBtn>
      )}
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
const StartBtn = styled(Pressable)`
  /* padding: "20px 40px 20px 40px"; */
  position: absolute;
  z-index: 1;
  top: 45%;
  width: 130px;
  padding: 15px;
  background-color: rgba(49, 80, 254, 0.3);
  backdrop-filter: blur(4px) contrast(90%);
  -webkit-backdrop-filter: blur(4px) contrast(90%);
  display: flex;
  text-align: center;
  border-radius: 30px;
`;
export default Junkyard;
