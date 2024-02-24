import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import * as utils from "../../../utils";
import { asyncSleep } from "../../../utils/timer";

import { Card, RowBoard } from "./styledComponents";
import { Text } from "../../../assets/fontStyles";

const AiBoard: FC<{
  intAI: number;
  settingStep: number;
  aiComplate: string;
  aiStatus: boolean;
  aiBoard: number[][];
  setAiBoard: Dispatch<SetStateAction<number[][]>>;
}> = ({ intAI, settingStep, aiComplate, aiStatus, aiBoard, setAiBoard }) => {
  let aiCnt = 0;

  const playAI = async () => {
    ++aiCnt;
    ++aiCnt;
    if (!aiStatus) return;

    if (aiBoard.length === 0 || aiBoard == null) return;

    try {
      const node = await utils.saChunSung.playerBot(aiBoard);
      if (JSON.stringify(node) === JSON.stringify(aiBoard)) {
      }

      if (aiComplate !== JSON.stringify(node)) {
        setAiBoard(node);
        await asyncSleep(500 * intAI);
        await playAI();
      } else {
        alert(`AI WIN ${aiCnt}번 클릭`);
        aiCnt = 0;
        window.location.reload();
      }
    } catch (err: any) {
      if (Number(err.message) === 404) {
        alert(`AI WIN ${aiCnt}번 클릭`);
        aiCnt = 0;
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (aiBoard.length > 0 && aiBoard != null && aiStatus) {
      setTimeout(async () => await playAI(), 300);
      // playAI(aiBoard);
    } else {
    }
    // playAI();
  }, [aiStatus]);

  return (
    <div style={{ opacity: aiStatus ? 1 : 0 }}>
      <div>{settingStep === 4 ? "===============================" : ""}</div>

      <Text.SemiBold_24>{settingStep === 4 ? "AI" : ""}</Text.SemiBold_24>

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
                  <Text.Spo_Light_16>{num}</Text.Spo_Light_16>
                </Card>
              );
            })}
          </RowBoard>
        );
      })}
    </div>
  );
};

export default AiBoard;
