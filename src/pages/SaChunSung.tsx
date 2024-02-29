import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Container } from "../styles";
import styled from "styled-components";
import * as utils from "../utils/index";
import { MOBILE } from "../configs/device";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { asyncSleep } from "../utils/timer";
import { type SachunsungGameSetting, gamelevel } from "../types";
import SelectLevel from "../components/games/sachunsung/SelectLevel";
import WithAiBot from "../components/games/sachunsung/SelectWithAi";
import SelectAiIntellect from "../components/games/sachunsung/SelectAiIntellect";
import AiBoard from "../components/games/sachunsung/AiBoard";
import { RowBoard } from "../components/games/sachunsung/styledComponents";
import UserBoard from "../components/games/sachunsung/UserBoard";
import { Text } from "../assets/fontStyles";
import GameBg from "../components/designs/GameBG";
import { View } from "../nativeView";
import { useAuthVisitPage, usePageState } from "../hooks/getVisitedPage";
import { useNavigate } from "react-router-dom";
// import { createBoard, findPathDFS } from "../utils";

type IGameLevel = [];

const SaChunSung = () => {
  const pageState = usePageState(false);
  const validateAuth = useAuthVisitPage();
  const navigation = useNavigate();
  const gameState = useSelector((state: RootState) => state.gameState.status);
  console.log(gameState);
  const [aiBoard, setAiBoard] = useState([] as number[][]);
  const [board, setBoard] = useState([] as number[][]);
  const [complate, setComplate] = useState("");
  const [aiComplate, setAiComplate] = useState("");
  const [settingStep, setSettingStep] = useState(0);
  const [aiStatus, setAiStatus] = useState(false);

  const [gameSetting, setGameSetting] = useState<SachunsungGameSetting>({
    matchAI: false,
    level: gamelevel.BEGINNER,
    intAI: 5,
  });
  const [isStarting, setIsStarting] = useState("START");

  const dispatch = useDispatch<AppDispatch>();

  const create = () => {
    const [row, col] = gameSetting.level.split(",");
    const createdBoard = utils.saChunSung.createBoard(Number(row), Number(col));
    const boardToString = JSON.stringify(
      Array.from({ length: Number(row) + 2 }, () =>
        Array(Number(col) + 2).fill(0)
      )
    );
    console.log(JSON.parse(JSON.stringify(createdBoard)));
    setBoard(JSON.parse(JSON.stringify(createdBoard)));
    if (gameSetting.matchAI) {
      setAiBoard(JSON.parse(JSON.stringify(createdBoard)));
      setAiStatus(true);
      setAiComplate(boardToString);
    }
    setComplate(boardToString);
  };

  return (
    <Container style={{ zIndex: 2 }}>
      <Text.SemiBold_32
        onClick={() => {
          if (isStarting === "START") {
            const accept = window.confirm("exit?");
            if (accept) {
              window.location.reload();
            }
          }
        }}
      >
        우주 고철장!
      </Text.SemiBold_32>

      {/* <div>
        <input
          type="tel"
          value={rows}
          onChange={(e) => setRows(Number(e.currentTarget.value))}
        />
        x
        <input
          type="tel"
          value={cols}
          onChange={(e) => setCols(Number(e.currentTarget.value))}
        />
      </div> */}
      {/* <RowBoard onClick={() => create()}>
        <Text.Light_20>게임판 생성!</Text.Light_20>
      </RowBoard> */}

      {/* <RowBoard
        ref={createAIRef}
        style={{ opacity: 0 }}
        onClick={() => playAI()}
      >
        <Text.Body>AI랑 뜨기!</Text.Body>
      </RowBoard> */}
      <br />
      {settingStep === 0 && (
        <SelectLevel
          setGameSetting={setGameSetting}
          setSettingStep={setSettingStep}
        />
      )}
      {settingStep === 1 && (
        <WithAiBot
          setGameSetting={setGameSetting}
          setSettingStep={setSettingStep}
        />
      )}
      {settingStep === 2 && (
        <SelectAiIntellect
          setGameSetting={setGameSetting}
          setSettingStep={setSettingStep}
        />
      )}
      {settingStep === 3 && (
        <div
          onClick={() => {
            setTimeout(() => setIsStarting("3"), 600);
            setTimeout(() => setIsStarting("2"), 1600);
            setTimeout(() => setIsStarting("1"), 2600);
            setTimeout(() => setIsStarting("GO!"), 3600);
            setTimeout(() => {
              setIsStarting("START");
              setSettingStep(4);
              create();
            }, 4600);
          }}
        >
          <Text.Spo_Medium_20>{isStarting}</Text.Spo_Medium_20>
        </div>
      )}
      <Text.Spo_Medium_20>{settingStep === 4 ? "YOU" : ""}</Text.Spo_Medium_20>
      <UserBoard
        board={board}
        setBoard={setBoard}
        settingStep={settingStep}
        complate={complate}
      />
      <AiBoard
        intAI={gameSetting.intAI}
        settingStep={settingStep}
        aiComplate={aiComplate}
        aiStatus={aiStatus}
        aiBoard={aiBoard}
        setAiBoard={setAiBoard}
      />
    </Container>
  );
};

export default SaChunSung;
