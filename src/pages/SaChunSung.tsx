import { useEffect, useState } from "react";
import { Container, Text } from "../styles";
import styled from "styled-components";
import * as utils from "../utils/index";
import { MOBILE } from "../configs/device";
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
const SaChunSung = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [board, setBoard] = useState([[]] as number[][]);
  const [firstItem, setFirstItem] = useState([-1, -1]);
  const [secondItem, setSecondItem] = useState([-1, -1]);
  const [step, setStep] = useState<"first" | "second">("first");
  const create = () => {
    const board = utils.saChunSung.createBoard(rows, cols, 4);
    setBoard(board);
    setStep("first");
    setSecondItem([-1, -1]);
    setFirstItem([-1, -1]);
  };

  return (
    <Container>
      <Text.ChangwonDangamAsac>사천성 게임!</Text.ChangwonDangamAsac>
      <div>
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
      </div>
      <RowBoard onClick={() => create()}>
        <Text.Body>게임판 생성!</Text.Body>
      </RowBoard>

      {board.map((item, i) => {
        // if (i === 0 || board.length - 1 === i) return;
        return (
          <RowBoard>
            {item.map((num, a) => {
              //   if (a === 0 || item.length - 1 === a) return;
              const clicked =
                (i === firstItem[0] && a === firstItem[1]) ||
                (i === secondItem[0] && a === secondItem[1])
                  ? true
                  : false;
              return (
                <Card
                  clicked={clicked}
                  success={board[i][a] === 0 ? true : false}
                  onClick={() => {
                    if (clicked) {
                      console.log("1번분기");

                      setFirstItem([-1, -1]);
                      setSecondItem([-1, -1]);
                      setStep("first");
                      return;
                    }
                    if (step === "first") {
                      console.log("2번분기");
                      setFirstItem([i, a]);
                      setSecondItem([-1, -1]);
                      setStep("second");
                      return;
                    }
                    if (step === "second") {
                      console.log("3번분기");
                      setStep("first");
                      setSecondItem([-1, -1]);
                      setFirstItem([-1, -1]);
                      const isPair = utils.saChunSung.findPathDFS(
                        board,
                        firstItem,
                        [i, a],
                        board[firstItem[0]][firstItem[1]]
                      );
                      console.log(isPair);
                      if (isPair) {
                        const copy = [...board];
                        copy[firstItem[0]][firstItem[1]] = 0;
                        copy[i][a] = 0;
                        setBoard([...copy]);
                      }
                      return;
                    }
                  }}
                >
                  <Text.Caption1>{num}</Text.Caption1>
                </Card>
              );
            })}
          </RowBoard>
        );
      })}
    </Container>
  );
};

export default SaChunSung;
