import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card, RowBoard } from "./styledComponents";
import * as utils from "../../../utils";
import { Text } from "../../../assets/fontStyles";
import { gameImg } from "../../../assets/gameImg";
import { url } from "inspector";
import { SCREEN_WIDTH } from "../../../configs/device";
import { View } from "../../../nativeView";
import { useAudio } from "../../../hooks/useAudio";
import { allSfx } from "../../../assets/sound";
import { shuffleBoard } from "../../../utils/saChunSungUtil";
import { imgSrc } from "../../../assets/img";
import { EmptyBox } from "../../../styles";
import { getDecryptedCookie, setEncryptedCookie } from "../../../utils/cookies";
import { getAntiMatter, getEnergy } from "./useful";
import { useNavigate } from "react-router-dom";
import { history } from "../../../configs/history";
import Cookies from "js-cookie";

interface IUserBoardProps {
  board: number[][];
  setBoard: Dispatch<SetStateAction<number[][]>>;
  tictoc: number;
  complate: string;
  setClearList: Dispatch<SetStateAction<string[]>>;
  nowLevel: string;
  rewards: any[];
  setRewards: Dispatch<SetStateAction<any[]>>;
  setTictoc: Dispatch<SetStateAction<number>>;
}

function UserBoard({
  board,
  setBoard,
  complate,
  setClearList,
  nowLevel,
  tictoc,
  rewards,
  setRewards,
  setTictoc,
}: IUserBoardProps) {
  const [firstItem, setFirstItem] = useState([-1, -1]);
  const [secondItem, setSecondItem] = useState([-1, -1]);
  const [step, setStep] = useState<"first" | "second">("first");
  const [needSuffle, setNeedSuffle] = useState(false);
  const [keyPath, setKeyPath] = useState([] as number[][]);
  const navigation = useNavigate();
  const pairAudio = useAudio(allSfx.slide);
  const clickAudio = useAudio(allSfx.click);
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
      // console.log(userClickCnt.current);
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
          setTimeout(() => setKeyPath([]), 150);
          const remainingPath = await utils.saChunSung.remainingPathFinder(
            copy,
            "hint"
          );

          pairAudio.play();
          if (complate === JSON.stringify(board)) {
            getSpecialItems(Number(nowLevel.split(",")[0]));
            addTime();
            setClearList((prev) => [...prev, nowLevel]);
          } else {
            getSpecialItems();
          }
          if (remainingPath == null) {
            console.log(remainingPath, "셔플하자");
            setNeedSuffle(true);
          }
        }
      } catch (err) {
        alert("Detected Hack");
        setTimeout(() => {
          Cookies.remove("ingame");
          // Cookies.remove("mute");
          history.push("/games");
          navigation("/games", { replace: true });
        }, 300);
        // navigation("/games", { replace: true });
      }

      return;
    }
  };

  useEffect(() => {
    if (!needSuffle) return;
    let findPath = false;
    console.log("경로없음 다시 만듬");
    while (!findPath) {
      let copy = JSON.parse(JSON.stringify(board));
      copy = shuffleBoard(copy);
      const remainingPath = utils.saChunSung.remainingPathFinder(copy, "hint");
      if (remainingPath != null) findPath = true;
    }
    setBoard(shuffleBoard(board));
    setNeedSuffle(false);
  }, [needSuffle]);

  const pushToRewardList = (
    gameData: any,
    isGetAntimatter: boolean,
    isGetEnergy: boolean
  ) => {
    const wasGetStone = gameData.rewards.filter(
      (item: any) => item.itemName === "atata_stone"
    );
    const wasGetEnergy = gameData.rewards.filter(
      (item: any) => item.itemName === "energy"
    );
    const wasGetAntimatter = gameData.rewards.filter(
      (item: any) => item.itemName === "energy"
    );

    // 리워드 배열에 없을 경우 배열에 넣음
    if (wasGetStone.length <= 0) {
      gameData.rewards.push({ itemName: "atata_stone", cnt: 0 });
    }
    if (wasGetAntimatter.length <= 0 && isGetAntimatter) {
      gameData.rewards.push({ itemName: "antimatter", cnt: 0 });
    }
    if (wasGetEnergy.length <= 0 && isGetEnergy) {
      gameData.rewards.push({ itemName: "energy", cnt: 0 });
    }
    return gameData;
  };
  const getSpecialItems = (stage?: number) => {
    const gameData = getDecryptedCookie("ingame");
    const isGetAntimatter = getAntiMatter();
    const isGetEnergy = getEnergy();
    console.log(gameData.rewards, "바뀌기전");
    pushToRewardList(gameData, isGetAntimatter, isGetEnergy);
    console.log(gameData.rewards, "바뀌고 난 후");
    // 리워드 배열 변경
    gameData.rewards = gameData.rewards.map((item: any, i: number) => {
      if (item.itemName === "atata_stone" && stage != null) {
        item.cnt = item.cnt + stage;
      }
      if (item.itemName === "energy" && isGetEnergy) {
        item.cnt = item.cnt + 1;
      }
      if (item.itemName === "antimatter" && isGetAntimatter) {
        item.cnt = item.cnt + 1;
      }
      if (item.itemName === "atata_stone" && stage != null) {
        item.cnt = item.cnt + stage;
        return item;
      }
      if (item.itemName === "atata_stone") {
        item.cnt = item.cnt + 1;
      }
      return item;
    });

    setRewards((prev) => [...gameData.rewards]);
    setEncryptedCookie("ingame", gameData);
    return;
  };
  const addTime = () => {
    const addNumber = Math.ceil(
      Number(nowLevel.split(",")[0]) + Number(nowLevel.split(",")[1]) * 2
    );
    console.log(Number(nowLevel.split(",")[0]));
    setTictoc(Number(tictoc + addNumber));
  };
  return (
    <View
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: -100,
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-start",
            marginTop: 2,
          }}
        >
          <Text.Light_20>{nowLevel.split(",")[0]}</Text.Light_20>
        </View>
        <View style={{ flexDirection: "row" }}>
          <img src={imgSrc.timer} style={{ width: 20, aspectRatio: 1 }} />
          <EmptyBox width={3} />
          <Text.SemiBold_24>
            {isNaN(tictoc) || tictoc < 0 ? "" : tictoc}
          </Text.SemiBold_24>
        </View>
        <View style={{ alignItems: "flex-end", flex: 1 }}>
          {rewards.map((item, i) => {
            return (
              <View
                key={i}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <img
                  src={
                    //@ts-ignore
                    imgSrc[item.itemName]
                  }
                  style={{ width: 23, height: 23, marginTop: -3.5 }}
                />
                <Text.Light_12>x {item.cnt}</Text.Light_12>
              </View>
            );
          })}
        </View>
      </View>
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
                    clickAudio.play();
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
}

export default UserBoard;
