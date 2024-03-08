import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { Card, RowBoard } from "./styledComponents";
import * as utils from "../../../utils";
import { Text } from "../../../assets/fontStyles";
import { gameImg } from "../../../assets/gameImg";
import { url } from "inspector";
import { SCREEN_WIDTH } from "../../../configs/device";
import { View } from "../../../nativeView";

const UserBoard: FC<{
  board: number[][];
  setBoard: Dispatch<SetStateAction<number[][]>>;
  settingStep: number;
  complate: string;
  setClearList: Dispatch<SetStateAction<string[]>>;
  nowLevel: string;
}> = ({ board, setBoard, settingStep, complate, setClearList, nowLevel }) => {
  const [firstItem, setFirstItem] = useState([-1, -1]);
  const [secondItem, setSecondItem] = useState([-1, -1]);
  const [step, setStep] = useState<"first" | "second">("first");
  const [keyPath, setKeyPath] = useState([] as number[][]);
  const userClickCnt = useRef(0);
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

      if (board[firstItem[0]][firstItem[1]] !== board[i][a]) {
        setSecondItem([-1, -1]);
        setFirstItem([-1, -1]);
        setStep("first");

        return;
      } // 값이 다른경우 경로탐색 안해도됨

      setSecondItem([-1, -1]);
      setFirstItem([-1, -1]);
      console.log(userClickCnt.current);
      setStep("first");

      try {
        const isPair = await utils.saChunSung.findPathDFS(
          board,
          firstItem,
          [i, a],
          board[firstItem[0]][firstItem[1]]
        );
        if (isPair) {
          board[firstItem[0]][firstItem[1]] = 0;
          board[i][a] = 0;
          const copy = JSON.parse(JSON.stringify(board));
          setKeyPath(isPair);
          setBoard([...board]);
          setTimeout(() => setKeyPath([]), 200);
          const remainingPath = await utils.saChunSung.remainingPathFinder(
            copy,
            "hint"
          );
          if (
            (complate === JSON.stringify(board) && settingStep === 4) ||
            remainingPath == null
          ) {
            setClearList((prev) => [...prev, nowLevel]);
          }
        }
      } catch (err) {
        alert("앗 비정상적 동작!!");
      }

      return;
    }
  };
  return (
    <View style={{ position: "relative", zIndex: 1 }}>
      {board.map((item, i) => {
        // if (i === 0 || board.length - 1 === i) return;
        return (
          <RowBoard key={i}>
            {item.map((num, a) => {
              const sourceName = `junkyard_ico_${num}`;
              const clicked =
                (i === firstItem[0] && a === firstItem[1]) ||
                (i === secondItem[0] && a === secondItem[1])
                  ? true
                  : false;
              const id = [i, a];
              const process = keyPath.filter((path) => {
                if (path[0] === id[0] && path[1] === id[1]) return true;
              });
              const isProcessed = process.length > 0 ? true : false;
              //
              return (
                <Card
                  key={a}
                  clicked={clicked}
                  processed={isProcessed}
                  success={board[i][a] === 0 ? true : false}
                  onClick={() => {
                    clickCard(clicked, i, a);
                  }}
                >
                  {board[i][a] !== 0 && (
                    <img
                      style={{
                        width: SCREEN_WIDTH * 0.0733,
                        aspectRatio: "auto",
                      }}
                      src={
                        //@ts-ignore
                        gameImg[sourceName]
                      }
                    />
                  )}
                  {/* <Text.Spo_Light_16>{num}</Text.Spo_Light_16> */}
                </Card>
              );
            })}
          </RowBoard>
        );
      })}
    </View>
  );
};

export default UserBoard;
