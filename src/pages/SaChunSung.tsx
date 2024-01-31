import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Container, Text } from "../styles";
import styled from "styled-components";
import * as utils from "../utils/index";
import { MOBILE } from "../configs/device";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setOverFlow } from "../store/slices/appState";
import { asyncSleep } from "../utils/timer";
import { type SachunsungGameSetting, gamelevel } from "../types";
import SelectLevel from "../components/games/sachunsung/SelectLevel";
import WithAiBot from "../components/games/sachunsung/SelectWithAi";
import SelectAiIntellect from "../components/games/sachunsung/SelectAiIntellect";
import AiBoard from "../components/games/sachunsung/AiBoard";
import { RowBoard } from "../components/games/sachunsung/styledComponents";
import UserBoard from "../components/games/sachunsung/UserBoard";
// import { createBoard, findPathDFS } from "../utils";

type IGameLevel = [];

const SaChunSung = () => {
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

  useEffect(() => {
    dispatch(setOverFlow(true));

    return () => {
      dispatch(setOverFlow(false));
    };
  }, []);
  return (
    <Container>
      <Text.ChangwonDangamAsac
        onClick={() => {
          if (isStarting === "START") {
            const accept = window.confirm("exit?");
            if (accept) {
              window.location.reload();
            }
          }
        }}
      >
        사천성 게임!
      </Text.ChangwonDangamAsac>

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
      {/* <RowBoard
        ref={boardRef}
        // style={{ opacity: 0 }}
        onClick={() => create()}
      >
        <Text.Body>게임판 생성!</Text.Body>
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
          <Text.Headline>{isStarting}</Text.Headline>
        </div>
      )}
      <Text.ChangwonDangamAsac>
        {settingStep === 4 ? "YOU" : ""}
      </Text.ChangwonDangamAsac>
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
