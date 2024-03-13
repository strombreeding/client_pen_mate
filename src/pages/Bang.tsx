import { SetStateAction, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { SOCKET_URI, iceServers } from "../configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  setActionModal,
  setActionWait,
  setNowAction,
  setReady,
  setStep,
  setTargetReady,
} from "../store/slices/bangState";
import { Container, EmptyBox } from "../styles";
import { Pressable, ScrollView, View } from "../nativeView";
import { Text } from "../assets/fontStyles";
import CharBoard from "../components/games/bang/CharBoard";
import ControllBoard from "../components/games/bang/ControllBoard";
import { IWillAction } from "./Test";
import { gameImg } from "../assets/gameImg";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import ActionModal from "../components/games/bang/ActionModal";
import styled from "styled-components";
import { imgSrc } from "../assets/img";
import BottomPrevNext, {
  PrevBtn,
} from "../components/navigations/BottomPrevNext";
import { setBgImg, setBgm } from "../store/slices/appState";
import { allBgm, allSfx } from "../assets/sound";
import SoundPressable from "../components/designs/SoundPressable";
import Inventory from "../components/games/bang/Inventory";
import PlayerInterface from "../components/games/bang/PlayerStatus";
import { colors } from "../assets/colors";
import { read } from "fs";
import { getRandomTime } from "../utils/randomCnt";
import { useAudio } from "../hooks/useAudio";
import ActionState from "../components/games/bang/detail/ActionState";
import { calculateDamage, copyBoard, getChangeBoard } from "../utils/bang";
import Cookies from "js-cookie";
import { getDecryptedCookie, setEncryptedCookie } from "../utils/cookies";

export interface IMessageProps {
  type:
    | "shot"
    | "atk"
    | "avoid"
    | "상대능력"
    | "chat"
    | "readyForCnt"
    | "getTargetAction"
    | "countDown"
    | "firstActionDone"
    | "secondAction"
    | "secondActionDone"
    | "";
  data: any;
}
export type Ablilty = {
  atk: number;
  health: number;
  skil: string[];
  subHealth: number;
};
export interface IStatusProps {
  me: IStatusDetail;
  you: IStatusDetail;
}
export interface IStatusDetail {
  health: number;
  nickname: string;
  subHealth: number;
}
export interface ItemProps {
  itemImg?: string;
  description?: string;
  type?: "atk" | "util";
  cnt?: number;
  cost?: number;
  skil?: string | null;
}
export interface TerminelProps {
  me: TerminelValues;
  you: TerminelValues;
}
// 인벤토리 > 인벤토리 고름 > 액션행동 고르고 준비 > 카운트  > 두번째 액션 > 다시 이닛던+ 액션초기화
export type TerminelValues =
  | "init"
  | "initDone"
  | "readyForCnt"
  | "action"
  | "secondAction"
  | "firstActionDone"
  | "secondActionDone"
  | "countDown"
  | "";
interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}

const Out = styled.img`
  position: absolute;
  top: 2px;
  left: 0px;
  width: ${25}px;
  height: 25px;
  text-align: start;
`;

const peerConnection = new RTCPeerConnection({
  iceServers: iceServers,
});

function Bang() {
  // const [peerConnection] = useState<RTCPeerConnection>(
  //   new RTCPeerConnection({
  //     iceServers: iceServers,
  //   })
  // );
  const [prevFirstAction, setPrevFirstAction] = useState<"공격" | "회피" | "">(
    ""
  );
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [resultModal, setResultModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [player, setPlayer] = useState<"A" | "B">("A");
  const [text, setText] = useState("");
  const [aChat, setAChat] = useState([] as string[]);
  const [bChat, setBChat] = useState([] as string[]);
  const nowAction = useSelector(
    (state: RootState) => state.bangState.nowAction
  );
  const [targetAction, setTargetAction] = useState<IWillAction[]>([
    { action: "", path: [] },
    { action: "", path: [] },
    { action: "", path: [] },
  ]);
  const [obj, setObj] = useState<ICharProps>({
    imgSrc: gameImg.cow_stand_right,
    width: SCREEN_WIDTH * 0.2222,
    height: 0,
    cols: 1,
    rows: 1,
  });
  const [bObj, setBObj] = useState<ICharProps>({
    imgSrc: gameImg.cow_stand_left,
    width: SCREEN_WIDTH * 0.2222,
    height: 0,
    cols: 1,
    rows: 1,
  });
  const [ability, setAbility] = useState<Ablilty>({
    atk: 1,
    health: 5,
    subHealth: 0,
    skil: [],
  });
  const [tartgetAbility, setTargetAbility] = useState<Ablilty>({
    atk: 1,
    health: 5,
    subHealth: 0,
    skil: [],
  });
  const [status, setStatus] = useState<IStatusProps>({
    me: { health: ability.health, nickname: "나", subHealth: 0 },
    you: { health: tartgetAbility.health, nickname: "상대", subHealth: 0 },
  });
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0],
  ]);

  const [targetBoard, setTargetBoard] = useState([
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0],
  ]);
  const [cnt, setCnt] = useState(0);
  const [bag, setBag] = useState<ItemProps[]>([{}, {}, {}] as ItemProps[]);
  const [terminel, setTerminel] = useState<TerminelProps>({
    me: "init",
    you: "init",
  });
  const [actionClicked, setActionClicked] = useState(true);
  const [round, setRound] = useState(1);
  const [playShot, setPlayShot] = useState(false);
  // const nowAction = useSelector(())
  const actionModal = useSelector(
    (state: RootState) => state.bangState.actionModal
  );

  // const actionWait = useSelector(
  //   (state: RootState) => state.bangState.actionWait
  // );
  const gunFireAudio = useAudio(allSfx.gun_fire);

  const step = useSelector((state: RootState) => state.bangState.step);
  const matchId = useSelector((state: RootState) => state.bangState.matchId);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const dataChannel = useRef<RTCDataChannel>();
  const startAudio = useAudio(allSfx.match);
  const wasJump = useRef(false);
  const sendData = (data: IMessageProps) => () => {
    if (dataChannel.current) {
      if (dataChannel.current.readyState !== "open") return;
      const source = JSON.stringify(data);
      dataChannel.current.send(source);
    }
  };
  const actionWait = useRef(0);
  // rtc 연결
  useEffect(() => {
    const socket = io(`${SOCKET_URI}`, {
      transports: ["websocket"],
    });
    if (!socket) {
      alert("매칭이 실패했습니다");
      navigation("/games", { replace: true });
    }

    if (!peerConnection) return;
    /* ice이벤트 발생시 핸들러 */
    const handleIce = (data: RTCPeerConnectionIceEvent) => {
      socket.emit("ice", data.candidate, matchId);
    };

    const handleData = (event: MessageEvent<string>) => {
      // 선준비 여부 , 상대방의 액션 목록, 상대방의 보드
      const recieve: IMessageProps = JSON.parse(event.data);
      console.log(recieve);

      if (recieve.type === "상대능력") {
        setTargetAbility(recieve.data);
        setTerminel((prev) => ({ ...prev, you: "initDone" }));
        setStatus((prev) => ({
          ...prev,
          you: {
            ...prev.you,
            health: recieve.data.health,
            subHealth: recieve.data.subHealth,
          },
        }));
      }

      if (recieve.type === "chat") {
        const targetPlayer = recieve.data.split("·")[0];
        const text = recieve.data.split("·")[1];
        if (targetPlayer === "B") {
          // 내가 A고 상대한테 왔을때 상대는 B니까 B를 바꿔야함
          const newChat = [...bChat];
          if (newChat.length >= 1) newChat.shift();
          newChat.push(text);
          setBChat(newChat);
        } else if (targetPlayer === "A") {
          // 내가 B인데 상대한테 채팅이 왔으면 A임
          const newChat = [...aChat];
          if (newChat.length >= 1) newChat.shift();
          newChat.push(text);
          setAChat(newChat);
        }
      }

      if (recieve.type === "readyForCnt") {
        setTerminel((prev) => ({
          ...prev,
          you: "readyForCnt",
        }));
        actionWait.current = recieve.data.time;
        setTargetBoard(JSON.parse(JSON.stringify(recieve.data.board)));
      }

      if (recieve.type === "getTargetAction") {
        setTargetAction((prev) => ({ ...prev, ...recieve.data.action }));
      }

      if (recieve.type === "shot") {
        setPlayShot(true);

        setTerminel((prev) => ({
          ...prev,
          you: recieve.data === 0 ? "firstActionDone" : "secondActionDone",
        }));
        // 타겟 애니메이션
      }

      if (recieve.type === "avoid") {
        wasJump.current = true;
        setTerminel((prev) => ({
          ...prev,
          you: recieve.data === 0 ? "firstActionDone" : "secondActionDone",
        }));
      }

      if (recieve.type === "atk") {
        //이미 받은 판정이니까 그대로 status변경하면 됨
        setStatus((prev) => ({
          ...prev,
          me: {
            ...prev.me,
            health: recieve.data.resultHealth,
            subHealth: recieve.data.resultSubHealth,
          },
        }));
      }

      if (recieve.type === "secondAction") {
        setTerminel((prev) => ({ ...prev, you: "secondAction" }));
      }
    };

    /* 수락을 먼저 누른 브라우저가 후클릭한 브라우저에 오퍼를 보냄
          동시에 RTC 데이터채널을 개설하여 상대방과 연결시 해당 채널로 데이터 교환
      */
    const welcomeAndDataChannel = async () => {
      setPlayer("A");
      dataChannel.current = peerConnection.createDataChannel("chat");

      // 상대방의 데이터를 수신하여 다른 기능을 하는 함수
      dataChannel.current.addEventListener("message", handleData);

      // 오퍼 생성후 후클릭 브라우저에 전달
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      socket.emit("offer", offer, matchId);
    };

    /* 후클릭 브라우저가 받는 오퍼와 데이터채널 교환 */
    const offerAndDataChannel = async (offer: any) => {
      setPlayer("B");
      peerConnection.addEventListener("datachannel", (event) => {
        dataChannel.current = event.channel;
        dataChannel.current.addEventListener("message", handleData);
      });

      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, matchId);
    };

    const answer = (answer: any) => {
      peerConnection.setRemoteDescription(answer);
    };

    // 이때 사용자 데이터 받아와야함.
    const ice = (ice: any) => {
      peerConnection.addIceCandidate(ice);
      console.log(`
          브라우저간 연결 상태...
          시그널 상태 : ${peerConnection.signalingState}
          커넥션 상태 : ${peerConnection.connectionState}
          아이스 상태 : ${peerConnection.iceConnectionState}
          플레이어 선정 : ${player}
        `);
      socket.disconnect();
    };

    socket.emit("moveToBangDone", matchId);

    socket.on("welcome", welcomeAndDataChannel);

    socket.on("offer", offerAndDataChannel);

    socket.on("answer", answer);

    socket.on("ice", ice);

    peerConnection.addEventListener("icecandidate", handleIce);

    window.addEventListener("beforeunload", (e) => {
      e.returnValue = "";
    });

    return () => {
      socket.emit("cancelMatch", matchId);
      socket.disconnect();
      socket.removeAllListeners();
      peerConnection.removeEventListener("icecandidate", handleIce);
      peerConnection.close();
    };
  }, []);
  useEffect(() => {
    if (playShot) {
      gunFireAudio.play();
    }
  }, [playShot]);
  useEffect(() => {
    setStartTime(new Date().getTime());
    dispatch(setBgm(allBgm.bang));
    return () => {
      dispatch(setBgm(allBgm.home));
    };
  }, []);
  // --

  const readyToDie = () => {
    startAudio.play();

    sendData({
      type: "getTargetAction",
      data: { action: nowAction, board },
    })();
    setTerminel((prev) => ({ ...prev, me: "countDown", you: "countDown" }));
    dispatch(setStep(0));
    setCnt(3);
    setActionClicked(false);
  };

  const hitPoint = (atk: number, subHealth: number, health: number) => {
    const [resultHealth, resultSubHealth] = calculateDamage(
      atk,
      subHealth,
      health
    );
    setStatus((prev) => ({
      ...prev,
      you: {
        ...prev.you,
        subHealth: resultSubHealth,
        health: resultHealth,
      },
    }));
    sendData({ type: "atk", data: { resultHealth, resultSubHealth } })();
  };

  const action = (actionStep: number) => {
    const actionPath = nowAction[actionStep].path;
    const action = nowAction[actionStep].action;
    const x = actionPath[0];
    const y = actionPath[1];

    if (actionStep === 0) {
      setActionClicked(true);
      setTerminel((prev) => ({ ...prev, me: "firstActionDone" }));
    } else if (actionStep === 1) {
      setTerminel((prev) => ({ ...prev, me: "secondActionDone" }));
      wasJump.current = true;
    }

    // 액션 수행
    if (action === "공격") {
      const symbol = player === "A" ? 3 : 2;
      const prevStay = targetBoard[x][y] === 1;
      const willStay = targetBoard[x][y] === symbol;
      gunFireAudio.play();
      sendData({ type: "shot", data: actionStep })();

      // 카운트 이전에 쏜 경우
      if (cnt !== 0) {
        if (player === "A") {
          setAChat(["Already Shot!"]);
        } else {
          setBChat(["Already Shot!"]);
        }
        return;
      }
      // 총구가 상대 기존자리이고, 상대방이 아직 점프를 안한 경우
      if (prevStay && wasJump.current === false) {
        hitPoint(ability.atk, status.you.subHealth, status.you.health);
        return;
      }
      // 총구가 상대의 이동하려는 자리이고, 상대방이 점프한 경우
      if (willStay && wasJump.current === true) {
        hitPoint(ability.atk, status.you.subHealth, status.you.health);
        return;
      }
      if (player === "A") {
        setAChat(["Miss"]);
      } else {
        setBChat(["Miss"]);
      }
    }
    if (action === "회피") {
      sendData({ type: "avoid", data: actionStep })();
    }
  };

  useEffect(() => {
    if (
      terminel.me === "countDown" &&
      terminel.you === "countDown" &&
      cnt !== 0
    ) {
      const timer = setInterval(() => {
        setCnt((prevCount) => {
          if (prevCount === 1) {
            setTimeout(() => setCnt((prev) => prev - 1), actionWait.current);
            clearInterval(timer);
            return prevCount;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    if (cnt === 0 && !actionClicked) {
      const timer = setTimeout(() => {
        action(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [cnt, actionClicked]);
  // 게임 진행순서 관리
  useEffect(() => {
    const me = terminel.me;
    const you = terminel.you;

    // 장비 다 골랐을때
    if (me === "initDone" && you === "initDone") {
      dispatch(setActionModal(true));
    }
    if (me === "readyForCnt" && you === "readyForCnt") {
      readyToDie();
    }
    if (me === "firstActionDone" && you === "firstActionDone") {
      wasJump.current = false;
      console.log("이건 잘 찍혀 ?");
      sendData({ type: "secondAction", data: "" })();
      setTerminel((prev) => ({ ...prev, me: "secondAction" }));
    }
    if (me === "secondAction" && you === "secondAction") {
      console.log("2번째 액션 시작");
      const timer = setTimeout(() => {
        action(1);
        console.log("액션수행!");
      }, 3000);
      return () => clearTimeout(timer);
    }
    console.log(me, you);
    if (me === "secondActionDone" && you === "secondActionDone") {
      const timer = setTimeout(() => {
        wasJump.current = false;
        reset();
        setTerminel((prev) => ({ ...prev, me: "initDone", you: "initDone" }));
        setRound(round + 1);
        const newBoard = copyBoard(board, targetBoard, player);
        setBoard(newBoard);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [terminel]);
  // --
  const reset = () => {
    dispatch(setStep(0));
    dispatch(setActionModal(true));
    dispatch(setReady(false));
    dispatch(
      setNowAction([
        {
          action: "",
          path: [],
        },
        {
          action: "",
          path: [],
        },
        {
          action: "",
          path: [],
        },
      ])
    );
  };
  // 채팅 hooks
  useEffect(() => {
    if (aChat.length >= 1) {
      const timer = setTimeout(() => {
        const newChat = [...aChat];
        newChat.shift();
        setAChat(newChat);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [aChat]);
  useEffect(() => {
    if (bChat.length >= 1) {
      const timer = setTimeout(() => {
        const newChat = [...bChat];
        newChat.shift();
        setBChat(newChat);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [bChat]);
  // --

  useEffect(() => {
    const result = {
      targetId: "id",
      targetNickname: status.you.nickname,
      reward: 300,
      cost: 300,
      win: false,
      mercy: false,
      consum: [{}],
      round,
      useTime: 0,
    };
    if (status.me.health === 0) {
      result.useTime = (new Date().getTime() - startTime) / 1000;
      setEncryptedCookie("gameResult", result);
      setResultModal(true);
    } else if (status.you.health === 0) {
      result.reward = 300;
      result.win = true;
      result.useTime = (new Date().getTime() - startTime) / 1000;

      setEncryptedCookie("gameResult", result);
      setResultModal(true);
    }
  }, [status]);
  return (
    <Container style={{ flex: 1, position: "relative" }}>
      <View
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <Out src={imgSrc.out} />
        {/* <Title>
          <Text.SemiBold_24>결투!</Text.SemiBold_24>
        </Title> */}
        <BottomInterfaceBox>
          {/* A플레이어 */}
          <PlayerInterface
            player={player}
            status={status}
            ability={ability}
            tartgetAbility={tartgetAbility}
            type={"A"}
          />

          {/* B플레이어 */}
          <PlayerInterface
            player={player}
            status={status}
            ability={ability}
            tartgetAbility={tartgetAbility}
            type={"B"}
          />
        </BottomInterfaceBox>
      </View>

      <img
        src={gameImg.sun2}
        width={200}
        style={{ position: "absolute", top: 90, right: 20, zIndex: 0 }}
      />
      <img src={gameImg.bg_bang} width={SCREEN_WIDTH} style={{ zIndex: 1 }} />
      <View
        style={{
          width: SCREEN_WIDTH,
          position: "relative",
        }}
      >
        <CharBoard
          obj={obj}
          bObj={bObj}
          board={board}
          aChat={aChat}
          bChat={bChat}
          player={player}
        />
        {terminel.me === "initDone" && !actionModal && (
          <ControllBoard
            obj={obj}
            board={board}
            setBoard={setBoard}
            player={player}
          />
        )}
      </View>

      <BottomInterface>
        <EmptyBox height={5} />
        {terminel.me === "countDown" && (
          <Text.Regular_36 style={{ position: "absolute", top: 5 }}>
            {cnt}
          </Text.Regular_36>
        )}
        {(terminel.me === "readyForCnt" || terminel.me === "initDone") && (
          <form style={{ display: "flex", flexDirection: "row" }}>
            <ChatInput
              type="text"
              placeholder="Chat..."
              maxLength={30}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Enter 키의 기본 동작 방지
                  if (player === "A") {
                    const newChat = [...aChat];
                    if (newChat.length >= 2) {
                      newChat.shift();
                    }
                    newChat.push(text);
                    sendData({
                      type: "chat",
                      data: player + "·" + text,
                    })();
                    setText("");
                    setAChat(newChat);
                  } else if (player === "B") {
                    const newChat = [...bChat];
                    if (newChat.length >= 2) {
                      newChat.shift();
                    }
                    newChat.push(text);
                    sendData({
                      type: "chat",
                      data: player + "·" + text,
                    })();
                    setText("");
                    setBChat(newChat);
                  }
                }
              }}
            />
            <PrevBtn style={{ padding: 5, minHeight: 30 }}>
              <Text.Spo_Light_12>Send</Text.Spo_Light_12>
            </PrevBtn>
          </form>
        )}
        <EmptyBox height={15} />

        <View
          style={{
            width: "100%",
            padding: "0px 10px 0px 10px",
          }}
        >
          {/* 액션 준비 상태 */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* A */}
            <View>
              <Text.SemiBold_24 color={colors.Accent}>
                {player === "A" && terminel.me === "readyForCnt"
                  ? "Ready!"
                  : player === "B" && terminel.you === "readyForCnt"
                  ? "Ready!"
                  : ""}
              </Text.SemiBold_24>
              <ActionState
                nowAction={nowAction}
                targetAction={targetAction}
                player={player === "A" ? "A" : "B"}
              />
            </View>
            {/* B */}
            <View>
              <Text.SemiBold_24 color={colors.Accent}>
                {player === "B" && terminel.me === "readyForCnt"
                  ? "Ready!"
                  : player === "A" && terminel.you === "readyForCnt"
                  ? "Ready!"
                  : ""}
              </Text.SemiBold_24>
              <ActionState
                nowAction={nowAction}
                targetAction={targetAction}
                player={player === "A" ? "B" : "A"}
              />
            </View>
          </View>
        </View>

        {!actionClicked && (
          <SoundPressable
            onClick={() => action(0)}
            scaleBtn
            style={{
              position: "absolute",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: 60,
            }}
          >
            <img src={imgSrc.btn_hexagon_blue} width={SCREEN_WIDTH * 0.45} />

            <img
              src={
                nowAction[step].action === "공격"
                  ? gameImg.target
                  : gameImg.action_jump
              }
              style={{
                width: SCREEN_WIDTH * 0.2,
                height: SCREEN_WIDTH * 0.2,
                position: "absolute",
              }}
            />
          </SoundPressable>
        )}
      </BottomInterface>

      {terminel.me === "initDone" && (
        <ActionModal prevFirstAction={prevFirstAction} />
      )}
      {terminel.me === "init" && (
        <Inventory
          bag={bag}
          ability={ability}
          setBag={setBag}
          setAbility={setAbility}
          setStatus={setStatus}
          setTerminel={setTerminel}
          sendData={sendData}
        />
      )}
      <BottomPrevNext
        rightBtnColor="rgba(145, 255, 0, 0.797)"
        visible={terminel.me === "initDone" && !actionModal && step === 2}
        prevAction={reset}
        prevText={"초기화"}
        nextAction={() => {
          const random = getRandomTime();
          const jumpIdx = nowAction.findIndex((obj) => obj.action === "회피");
          const [newBoard, exchangeBoard] = getChangeBoard(
            board,
            player,
            nowAction[jumpIdx].path
          );
          sendData({
            type: "readyForCnt",
            data: { time: random, board: exchangeBoard },
          })();
          actionWait.current = random;
          setTerminel((prev) => ({
            ...prev,
            me: "readyForCnt",
          }));
          setBoard(newBoard);
          setPrevFirstAction(jumpIdx === 0 ? "회피" : "공격");
          dispatch(setReady(true));
        }}
        nextText={"준비완료"}
      />
      {resultModal && (
        <View
          style={{
            position: "absolute",
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: "#000000",
            zIndex: 1000000,
          }}
        >
          <View>
            <Text.Light_20>
              {getDecryptedCookie("gameResult").targetNickname}
            </Text.Light_20>
            <Text.Light_20>
              {getDecryptedCookie("gameResult").win === false
                ? "패배"
                : "승리!"}
            </Text.Light_20>
            <Text.Light_20>
              {getDecryptedCookie("gameResult").cost}
            </Text.Light_20>
            <Text.Light_20>
              {getDecryptedCookie("gameResult").reward}
            </Text.Light_20>
            <Text.Light_20>
              {getDecryptedCookie("gameResult").useTime}
            </Text.Light_20>
            <EmptyBox height={100} />
            <PrevBtn onClick={() => navigation("/games", { replace: true })}>
              <Text.Light_24>나가기</Text.Light_24>
            </PrevBtn>
          </View>
        </View>
      )}
    </Container>
  );
}
const ChatInput = styled.input`
  padding: 0px;
  background-color: transparent;
  border-color: transparent;
  border-bottom-color: ${colors.White};
  text-align: start;
  outline: none;
  caret-color: white;
  color: white;
  font-family: "esamanruLight";
`;
const BottomInterface = styled(View)`
  background-color: #9b5127;
  width: 100%;
  flex: 1;
  align-items: center;
  ::placeholder {
    color: white;
  }
`;
const BottomInterfaceBox = styled(View)`
  width: 95%;
  background-color: "grey";
  height: 80px;
  padding: 10px;
  border: 1px solid black;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 10px;
`;
export default Bang;
