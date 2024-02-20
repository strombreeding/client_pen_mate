import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { Card, RowBoard } from "./styledComponents";
import * as utils from "../../../utils";
import { Text } from "../../../assets/fontStyles";

const UserBoard: FC<{
  board: number[][];
  setBoard: Dispatch<SetStateAction<number[][]>>;
  settingStep: number;
  complate: string;
}> = ({ board, setBoard, settingStep, complate }) => {
  const [firstItem, setFirstItem] = useState([-1, -1]);
  const [secondItem, setSecondItem] = useState([-1, -1]);
  const [step, setStep] = useState<"first" | "second">("first");
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

          setBoard([...board]);
          const remainingPath = await utils.saChunSung.remainingPathFinder(
            copy,
            "hint"
          );
          console.log(remainingPath);
          if (
            (complate === JSON.stringify(board) && settingStep === 4) ||
            remainingPath == null
          ) {
            alert(`
            YOU WIN!!
            ${userClickCnt.current / 2}번 클릭만에 클리어!`);
            window.location.reload();
          }
        }
      } catch (err) {
        alert("앗 비정상적 동작!!");
      }

      return;
    }
  };
  return (
    <div>
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
                  <Text.Esa_Light_16>{num}</Text.Esa_Light_16>
                </Card>
              );
            })}
          </RowBoard>
        );
      })}
    </div>
  );
};

export default UserBoard;
