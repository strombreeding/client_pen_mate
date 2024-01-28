import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Text } from "../styles";
import styled from "styled-components";
import * as utils from "../utils/index";
import { MOBILE } from "../configs/device";
import { asyncSleep, createBoard } from "../utils/saChunSungUtil";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setOverFlow } from "../store/slices/appState";
// import { createBoard, findPathDFS } from "../utils";

const Card = styled.div<{ clicked: boolean; success: boolean }>`
  width: 25px;
  height: 25px;
  margin: 0.5px;
  background-color: ${(props) => (props.clicked ? "#868181" : "#cecbcb")};
  text-align: center;
  display: flex;
  opacity: ${(props) => (props.success ? 0 : 1)};
  align-items: center;
  pointer-events: ${(props) => (props.success ? "none" : "auto")};
  justify-content: center;
  ${!MOBILE &&
  `&:hover {
        background-color: #868181;
        cursor: pointer;
      }`}
`;

const RowBoard = styled.div`
  display: flex;
  flex-direction: row;
`;

type IGameLevel = [];
enum gamelevel {
  BEGINNER = "3,4",
  FRESHMAN = "6,6",
  SOPHOMORE = "9,8",
  JUNIOR = "12,10",
  SENIOR = "15,12",
  HARD = "18,12",
}
const SaChunSung = () => {
  const [aiBoard, setAiBaord] = useState([] as number[][]);
  const [board, setBoard] = useState([] as number[][]);
  const [complate, setComplate] = useState("");
  const [aiComplate, setAiComplate] = useState("");
  const [firstItem, setFirstItem] = useState([-1, -1]);
  const [secondItem, setSecondItem] = useState([-1, -1]);
  const [step, setStep] = useState<"first" | "second">("first");
  const [settingStep, setSettingStep] = useState(0);
  const [gameSetting, setGameSetting] = useState<{
    matchAI: boolean;
    level: gamelevel;
    intAI: number;
  }>({
    matchAI: false,
    level: gamelevel.BEGINNER,
    intAI: 5,
  });
  const [zz, setzz] = useState("START");
  const boardRef = useRef<HTMLDivElement>(null);
  const createAIRef = useRef<HTMLDivElement>(null);
  const userClickCnt = useRef(0);

  const [aiStatus, setAiStatus] = useState(false);
  const clickCard = async (clicked: boolean, i: number, a: number) => {
    if (clicked) {
      console.log("1번분기");
      userClickCnt.current++;

      setFirstItem([-1, -1]);
      setSecondItem([-1, -1]);
      setStep("first");
      return;
    }
    if (step === "first") {
      userClickCnt.current++;
      setFirstItem([i, a]);
      setSecondItem([-1, -1]);
      setStep("second");
      return;
    }
    if (step === "second") {
      userClickCnt.current++;

      console.log(userClickCnt.current);
      setStep("first");
      setSecondItem([-1, -1]);
      setFirstItem([-1, -1]);
      const isPair = await utils.saChunSung.findPathDFS(
        board,
        firstItem,
        [i, a],
        board[firstItem[0]][firstItem[1]]
      );
      if (isPair) {
        const copy = [...board];
        copy[firstItem[0]][firstItem[1]] = 0;
        copy[i][a] = 0;
        if (complate === JSON.stringify(copy) && settingStep === 4) {
          alert(`
          YOU WIN!!
          ${userClickCnt.current / 2}번 클릭만에 클리어!`);
          window.location.reload();
        }

        setBoard([...copy]);
      }
      return;
    }
  };
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
      setAiBaord(JSON.parse(JSON.stringify(createdBoard)));
      setAiStatus(true);
    }
    setComplate(boardToString);
    setAiComplate(boardToString);
    setStep("first");
    setSecondItem([-1, -1]);
    setFirstItem([-1, -1]);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setOverFlow(true));

    return () => {
      dispatch(setOverFlow(false));
    };
  }, []);
  useEffect(() => {
    if (aiBoard.length > 0 && aiBoard != null && aiStatus) {
      console.log(JSON.stringify(aiBoard));
      console.log(aiBoard);
      setTimeout(async () => await playAI(), 0);
      // playAI(aiBoard);
    } else {
    }
    // playAI();
  }, [aiStatus]);
  let aiCnt = 0;

  const playAI = async (fisrtGraph?: number[][]) => {
    ++aiCnt;
    if (!aiStatus) return;

    if (aiBoard.length === 0 || aiBoard == null) return;
    const node = await utils.saChunSung.playerBot(aiBoard);
    if (aiComplate !== JSON.stringify(node)) {
      setAiBaord(node);
      await asyncSleep(500 * gameSetting.intAI);
      await playAI();
    } else {
      alert(`AI WIN ${aiCnt}번 클릭`);
      aiCnt = 0;
      window.location.reload();
    }
  };

  return (
    <Container>
      <Text.ChangwonDangamAsac
        onClick={() => {
          if (zz === "START") {
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
      <RowBoard
        ref={createAIRef}
        style={{ opacity: 0 }}
        onClick={() => playAI()}
      >
        <Text.Body>AI랑 뜨기!</Text.Body>
      </RowBoard>
      <br />
      {settingStep === 0 && (
        <>
          <div>난이도</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({
                  ...prev,
                  level: gamelevel.BEGINNER,
                }));
                setSettingStep(1);
              }}
            >
              BEGINNER{" "}
            </div>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({
                  ...prev,
                  level: gamelevel.FRESHMAN,
                }));
                setSettingStep(1);
              }}
            >
              {" "}
              FRESHMAN
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({
                  ...prev,
                  level: gamelevel.SOPHOMORE,
                }));
                setSettingStep(1);
              }}
            >
              SOPHOMORE{" "}
            </div>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({
                  ...prev,
                  level: gamelevel.JUNIOR,
                }));
                setSettingStep(1);
              }}
            >
              {" "}
              JUNIOR
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({
                  ...prev,
                  level: gamelevel.SENIOR,
                }));
                setSettingStep(1);
              }}
            >
              SENIOR{" "}
            </div>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({ ...prev, level: gamelevel.HARD }));
                setSettingStep(1);
              }}
            >
              {" "}
              HARD
            </div>
          </div>
        </>
      )}
      {settingStep === 1 && (
        <>
          <div>YOU vs AI</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({
                  ...prev,
                  matchAI: true,
                }));
                setSettingStep(2);
              }}
            >
              Do Fight!{" "}
            </div>
            <div
              style={{ margin: 20 }}
              onClick={(e) => {
                setGameSetting((prev) => ({
                  ...prev,
                  matchAI: false,
                }));
                setSettingStep(3);
              }}
            >
              {" "}
              Im Chicken
            </div>
          </div>
        </>
      )}
      {settingStep === 2 && (
        <>
          <div>AI Intellect </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                margin: 20,
              }}
              onClick={() => {
                setGameSetting((prev) => ({ ...prev, intAI: 5 }));
                setSettingStep(3);
              }}
            >
              <Text.Headline>FOOL</Text.Headline>
            </div>
            <div
              style={{
                margin: 20,
              }}
              onClick={() => {
                setGameSetting((prev) => ({ ...prev, intAI: 3 }));
                setSettingStep(3);
              }}
            >
              <Text.Headline>COLLEGE</Text.Headline>
            </div>
            <div
              style={{
                margin: 20,
              }}
              onClick={() => {
                setGameSetting((prev) => ({ ...prev, intAI: 1 }));
                setSettingStep(3);
              }}
            >
              <Text.Headline>GENIUS</Text.Headline>
            </div>
            <div
              style={{
                margin: 20,
              }}
              onClick={() => {
                setGameSetting((prev) => ({ ...prev, intAI: 0 }));
                setSettingStep(3);
              }}
            >
              <Text.Headline>GOD</Text.Headline>
            </div>
          </div>
        </>
      )}
      {settingStep === 3 && (
        <div
          onClick={() => {
            setTimeout(() => setzz("3"), 600);
            setTimeout(() => setzz("2"), 1600);
            setTimeout(() => setzz("1"), 2600);
            setTimeout(() => setzz("GO!"), 3600);
            setTimeout(() => {
              setzz("START");
              setSettingStep(4);
              create();
            }, 4600);
          }}
        >
          <Text.Headline>{zz}</Text.Headline>
        </div>
      )}
      <div>
        <Text.ChangwonDangamAsac>
          {settingStep === 4 ? "YOU" : ""}
        </Text.ChangwonDangamAsac>
        {board.map((item, i) => {
          // if (i === 0 || board.length - 1 === i) return;
          return (
            <RowBoard key={i}>
              {item.map((num, a) => {
                //   if (a === 0 || item.length - 1 === a) return;
                const clicked =
                  (i === firstItem[0] && a === firstItem[1]) ||
                  (i === secondItem[0] && a === secondItem[1])
                    ? true
                    : false;
                return (
                  <Card
                    key={a}
                    clicked={clicked}
                    success={board[i][a] === 0 ? true : false}
                    onClick={() => {
                      clickCard(clicked, i, a);
                    }}
                  >
                    <Text.Caption1>{num}</Text.Caption1>
                  </Card>
                );
              })}
            </RowBoard>
          );
        })}
        <div style={{ opacity: aiStatus ? 1 : 0 }}>
          <div>
            {settingStep === 4 ? "===============================" : ""}
          </div>

          <Text.ChangwonDangamAsac>
            {settingStep === 4 ? "AI" : ""}
          </Text.ChangwonDangamAsac>

          {aiBoard.map((items, i) => {
            return (
              <RowBoard key={i + "2p"}>
                {items.map((num, a) => {
                  return (
                    <Card
                      key={a + "2p"}
                      clicked={false}
                      success={aiBoard[i][a] === 0 ? true : false}
                    >
                      <Text.Caption1>{num}</Text.Caption1>
                    </Card>
                  );
                })}
              </RowBoard>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default SaChunSung;
