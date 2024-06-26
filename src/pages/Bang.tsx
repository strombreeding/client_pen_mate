import { SetStateAction, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { SERVER_URI, SOCKET_URI, iceServers } from "../configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  resetState,
  setAAction,
  setAHit,
  setActionModal,
  setActionWait,
  setBAction,
  setBHit,
  setMatchId,
  setNowAction,
  setReady,
  setReset,
  setRound,
  setStep,
  setTargetAtkPath,
  setTargetAvoidPath,
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
import { setBgImg, setBgm, setModal, setPopup } from "../store/slices/appState";
import { allBgm, allSfx } from "../assets/sound";
import SoundPressable from "../components/designs/SoundPressable";
import Inventory, { IInvetoryProps } from "../components/games/bang/Inventory";
import PlayerInterface from "../components/games/bang/PlayerStatus";
import { colors } from "../assets/colors";
import { read } from "fs";
import { getRandomTime } from "../utils/randomCnt";
import { useAudio } from "../hooks/useAudio";
import ActionState from "../components/games/bang/detail/ActionState";
import {
  calculateDamage,
  copyBoard,
  getChangeBoard,
  getTargetPath,
  isSpreadHit,
  isValidIndex,
} from "../utils/bang";
import Cookies from "js-cookie";
import { getDecryptedCookie, setEncryptedCookie } from "../utils/cookies";
import { startAfterMsTime } from "../utils/date";
import { IRewardProps } from "./Reward";
import axios from "axios";
import axiosInstance from "../apis/axiosInstance";
import { jwtApiRequest } from "../apis/jwtApiService";
import { updateCostState } from "../utils/localStorage";
import { setInfomation } from "../store/slices/userState";
import WinnerPopup, {
  IBangPopupProps,
} from "../components/games/bang/detail/WinnerPopup";

export interface IMessageProps {
  type:
    | "giveup"
    | "shot"
    | "atk"
    | "avoid"
    | "상대능력"
    | "chat"
    | "readyForCnt"
    | "getTargetAction"
    | "countDown"
    | "firstActionDone"
    | "areYouDone"
    | "done"
    | "secondAction"
    | "secondActionDone"
    | "winnerGameDone"
    | "skulCnt"
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
  type?: string;
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
  | "done"
  | "gameSet"
  | "";
export interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
  bounti: boolean;
}

const Out = styled.img`
  position: absolute;
  top: 2px;
  left: 0px;
  width: ${25}px;
  height: 25px;
  text-align: start;
`;
// const peerConnection = new RTCPeerConnection({
//   iceServers: iceServers,
// });
function Bang() {
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [prevFirstAction, setPrevFirstAction] = useState<"공격" | "회피" | "">(
    ""
  );
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [popupState, setPopupState] = useState({
    description: "",
    leftAction: () => {},
    rightAction: () => {},
    show: false,
    title: "",
  } as IBangPopupProps);
  const playerRef = useRef<"A" | "B">("A");
  const [text, setText] = useState("");
  const [aChat, setAChat] = useState([] as string[]);
  const [bChat, setBChat] = useState([] as string[]);
  const nowAction = useSelector(
    (state: RootState) => state.bangState.nowAction
  );
  const round = useSelector((state: RootState) => state.bangState.round);
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
    bounti: false,
  });
  const [bObj, setBObj] = useState<ICharProps>({
    imgSrc: gameImg.cow_stand_left,
    width: SCREEN_WIDTH * 0.2222,
    height: 0,
    cols: 1,
    rows: 1,
    bounti: false,
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
  const [bag, setBag] = useState<IInvetoryProps[]>([
    {},
    {},
    {},
  ] as IInvetoryProps[]);
  const [terminel, setTerminel] = useState<TerminelProps>({
    me: "init",
    you: "init",
  });
  const [actionClicked, setActionClicked] = useState(true);
  const [playShot, setPlayShot] = useState(false);
  const [gameSet, setGameSet] = useState(false);
  const [gameDatas, setGameDatas] = useState<IRewardProps>({
    _id: "",
    cost_obj: [
      { type: "atata_stone", cost: 300 },
      { type: "energy", cost: 1 },
    ],
    game_result: "패배..",
    game_special_option: "무자비",
    game_title: "결투!",
    play_at: new Date(),
    play_time: (new Date().getTime() - startTime) / 1000,
    player_id: "",
    rewards: [],
    skul: 0,
  });
  const winnerGameDone = async (mercy: boolean) => {
    const imBounti = cookies.meBounti;
    let bonusCnt = 0;
    console.log(
      playerRef.current,
      obj.bounti,
      bObj.bounti,
      targetSkulRef.current
    );
    if (playerRef.current === "A" && bObj.bounti && !obj.bounti) {
      bonusCnt = targetSkulRef.current * 300;
    }
    if (playerRef.current === "B" && obj.bounti && !bObj.bounti) {
      bonusCnt = targetSkulRef.current * 300;
    }
    // 승자의 left 또는 rightaction 누를때 반응하는 것
    const rewards = mercy
      ? [
          { item_name: "atata_stone", cnt: 600 + bonusCnt },
          { item_name: "atata_point", cnt: 2 },
        ]
      : [
          { item_name: "atata_stone", cnt: 600 + bonusCnt },
          { item_name: "skul", cnt: 1 },
        ];
    console.log(gameDatas);
    const recordData = { ...gameDatas };
    recordData.game_special_option = mercy ? "자비" : "무자비";
    recordData.play_time = (new Date().getTime() - startTime) / 1000;
    recordData.rewards = [...rewards];
    recordData.game_result = "승리!";
    recordData.player_id = infomation.id;
    console.log(recordData);
    reqRecordGame(recordData);
    sendData({ type: "winnerGameDone", data: mercy })();
    dispatch(setReset(resetState));
  };
  const loserGameDone = async (mercy: boolean, cookies: any) => {
    // 승자의 left 또는 rightaction 누를때 반응하는 것
    const rewards = mercy
      ? [
          { item_name: "atata_stone", cnt: 100 },
          { item_name: "atata_point", cnt: 1 },
        ]
      : [];
    const recordData = { ...gameDatas };
    recordData.game_special_option = mercy ? "자비" : "무자비";
    recordData.play_time = (new Date().getTime() - startTime) / 1000;
    recordData.rewards = [...recordData.rewards, ...rewards];
    recordData._id = cookies._id;
    recordData.player_id = infomation.id;
    dispatch(setReset(resetState));
    console.log(cookies);
    reqRecordGame(recordData);
  };
  const reqRecordGame = async (gameData: any) => {
    dispatch(
      setModal({
        show: false,
        btnText: "",
        description: "",
        title: "",
      })
    );
    // 게임데이타를 백엔드에 보내면 게임 ID 별로 맞는 점수환산 가져올거임. 그걸 SetState해야함
    console.log(gameData, "보내는 겜데이타");
    const res = await jwtApiRequest(
      SERVER_URI + "game/record",
      "PUT",
      gameData
    );
    if (cookies.meBounti) {
      gameData.bounti = true;
    }
    console.log(res);
    updateCostState(res);
    dispatch(setInfomation(res));
    navigation("/games/reward", { replace: true, state: { data: gameData } });
  };

  // const nowAction = useSelector(())
  const actionModal = useSelector(
    (state: RootState) => state.bangState.actionModal
  );

  // const actionWait = useSelector(
  //   (state: RootState) => state.bangState.actionWait
  // );
  const cookies = getDecryptedCookie("bang");

  const gunFireAudio = useAudio(allSfx.gun_fire);
  const step = useSelector((state: RootState) => state.bangState.step);
  const matchId = useSelector((state: RootState) => state.bangState.matchId);
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const dataChannel = useRef<RTCDataChannel>();
  const startAudio = useAudio(allSfx.match);
  const wasJump = useRef<"stand" | "avoid" | "mistake">("stand");
  const actionWait = useRef(0);

  const sendData = (data: IMessageProps) => () => {
    if (dataChannel.current) {
      if (dataChannel.current.readyState !== "open") return;
      const source = JSON.stringify(data);
      dataChannel.current.send(source);
    }
  };

  const readyToDie = () => {
    setTimeout(() => {
      startAudio.play();
    }, 200);

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

    if (playerRef.current === "A") {
      dispatch(setBHit(true));
    } else {
      dispatch(setAHit(true));
    }
    if (ability.skil.includes("흡혈")) {
    }
    setStatus((prev) => ({
      ...prev,
      you: {
        ...prev.you,
        subHealth: resultSubHealth,
        health: resultHealth,
      },
      me: {
        ...prev.me,
        health: ability.skil.includes("흡혈")
          ? prev.me.health + 1
          : prev.me.health,
      },
    }));
    sendData({ type: "atk", data: { resultHealth, resultSubHealth } })();
  };

  const action = (actionStep: number) => {
    const actionPath = nowAction[actionStep].path;
    const action = nowAction[actionStep].action;
    const x = actionPath[0];
    const y = actionPath[1];
    setActionClicked(true);
    if (actionStep === 0) {
      setTerminel((prev) => ({ ...prev, me: "firstActionDone" }));
    } else if (actionStep === 1) {
      setTerminel((prev) => ({ ...prev, me: "secondActionDone" }));
      wasJump.current = "avoid";
    }

    isValidIndex(x, y, targetBoard);
    // 액션 수행
    if (action === "공격") {
      const symbol = playerRef.current === "A" ? 3 : 2;
      const prevStay = targetBoard[x][y] === 1;
      const willStay = targetBoard[x][y] === symbol;
      const spreadHit = isSpreadHit(x, y, targetBoard);
      setTimeout(() => gunFireAudio.play(), 200);
      if (playerRef.current === "A") {
        dispatch(setAAction("atk"));
      } else {
        dispatch(setBAction("atk"));
      }

      sendData({
        type: "shot",
        data: {
          actionStep,
          player: playerRef.current,
          startTime: secondActionTimer.current,
        },
      })();
      if (actionStep === 1 && willStay) {
        hitPoint(ability.atk, status.you.subHealth, status.you.health);
        return;
      }
      // 카운트 이전에 쏜 경우
      if (cnt !== 0) {
        if (playerRef.current === "A") {
          setAChat(["Already Shot!"]);
        } else {
          setBChat(["Already Shot!"]);
        }
        return;
      }

      // 상대가 점프를 너무 일찍한 경우
      if (wasJump.current === "mistake") {
        hitPoint(ability.atk, status.you.subHealth, status.you.health);
      }

      // 총구가 상대 기존자리이고, 상대방이 아직 점프를 안한 경우
      if (prevStay && wasJump.current === "stand") {
        hitPoint(ability.atk, status.you.subHealth, status.you.health);
      }

      // 총구가 상대의 이동하려는 자리이고, 상대방이 점프한 경우
      if (willStay && wasJump.current === "avoid") {
        hitPoint(ability.atk, status.you.subHealth, status.you.health);
      }

      if (ability.skil.includes("확산") && spreadHit) {
        hitPoint(1, status.you.subHealth, status.you.health);
      }
    }
    if (action === "회피") {
      if (cnt !== 0) {
        sendData({
          type: "avoid",
          data: {
            player: playerRef.current,
            actionStep,
            state: "mistake",
            startTime: secondActionTimer.current,
          },
        })();
      } else {
        sendData({
          type: "avoid",
          data: {
            player: playerRef.current,
            actionStep,
            state: "avoid",
            startTime: secondActionTimer.current,
          },
        })();
      }
      if (playerRef.current === "A") {
        dispatch(setAAction("jump"));
      } else {
        dispatch(setBAction("jump"));
      }
    }
  };

  const reset = () => {
    dispatch(setStep(0));
    dispatch(setActionModal(true));
    dispatch(setReady(false));
    dispatch(setAAction("stand"));
    dispatch(setBAction("stand"));
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
  const targetSkulRef = useRef(0);
  useEffect(() => {
    setPeerConnection(
      new RTCPeerConnection({
        iceServers: iceServers,
      })
    );
    dispatch(setReset(resetState));
    console.log(nowAction);

    return () => {
      Cookies.remove("bang");
    };
  }, []);
  // rtc 연결
  useEffect(() => {
    // dataChannel.current = undefined;
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

      if (recieve.type === "skulCnt") {
        console.log("스컬카운트", recieve.data);
        targetSkulRef.current = recieve.data;
      }

      if (recieve.type === "giveup") {
        setStatus((prev) => ({
          ...prev,
          you: {
            ...prev.you,
            health: 0,
          },
        }));
      }

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
        setTimeout(() => {
          setTerminel((prev) => ({
            ...prev,
            you: "readyForCnt",
          }));
          actionWait.current = recieve.data.time;
          const targetAvoidPath = getTargetPath(
            recieve.data.board,
            playerRef.current
          );
          const targetAtkPath = recieve.data.atkPath;
          console.log(
            recieve.data.board,
            targetAvoidPath,
            "상대방의 보드와 행동 경로"
          );
          dispatch(setTargetAtkPath(targetAtkPath));
          dispatch(setTargetAvoidPath(targetAvoidPath));
          setTargetBoard(JSON.parse(JSON.stringify(recieve.data.board)));
        }, 200);
      }

      if (recieve.type === "getTargetAction") {
        setTargetAction((prev) => ({ ...prev, ...recieve.data.action }));
      }

      if (recieve.type === "shot") {
        console.log(recieve.data.actionStep);
        secondActionTimer.current = recieve.data.startTime;
        setTimeout(() => {
          setTerminel((prev) => ({
            ...prev,
            you:
              recieve.data.actionStep === 0
                ? "firstActionDone"
                : "secondActionDone",
          }));
          setPlayShot(true);
          if (recieve.data.player === "A") {
            // A가 쐈다는 뜻
            dispatch(setAAction("atk"));
          } else {
            dispatch(setBAction("atk"));
          }
        }, 100);
        // 타겟 애니메이션
      }

      if (recieve.type === "avoid") {
        wasJump.current = recieve.data.state;
        secondActionTimer.current = recieve.data.startTime;
        setTimeout(() => {
          setTerminel((prev) => ({
            ...prev,
            you:
              recieve.data.actionStep === 0
                ? "firstActionDone"
                : "secondActionDone",
          }));
          if (recieve.data.player === "A") {
            dispatch(setAAction("jump"));
          } else {
            dispatch(setBAction("jump"));
          }
        }, 100);
      }

      if (recieve.type === "atk") {
        //이미 받은 판정이니까 그대로 status변경하면 됨
        setTimeout(() => {
          if (playerRef.current === "A") {
            dispatch(setAHit(true));
          } else {
            dispatch(setBHit(true));
          }
          setStatus((prev) => ({
            ...prev,
            me: {
              ...prev.me,
              health: recieve.data.resultHealth,
              subHealth: recieve.data.resultSubHealth,
            },
          }));
        }, 100);
      }

      // if (recieve.type === "secondAction") {
      //   setTerminel((prev) => ({ ...prev, you: "secondAction" }));
      // }
      if (recieve.type === "winnerGameDone") {
        setTimeout(() => {
          loserGameDone(recieve.data, cookies);
        }, 100);
      }
    };

    /* 수락을 먼저 누른 브라우저가 후클릭한 브라우저에 오퍼를 보냄
          동시에 RTC 데이터채널을 개설하여 상대방과 연결시 해당 채널로 데이터 교환
      */
    const welcomeAndDataChannel = async () => {
      playerRef.current = "A";
      console.log("playerA");
      const meBounti = cookies.meBounti;
      const bounti = cookies.bounti;
      setPrevFirstAction("공격");
      setObj((prev) => ({
        ...prev,
        bounti: meBounti,
        imgSrc: meBounti ? gameImg.bounti_stand_right : gameImg.cow_stand_right,
      }));
      setBObj((prev) => ({
        ...prev,
        bounti,
        imgSrc: bounti ? gameImg.bounti_stand_left : gameImg.cow_stand_left,
      }));
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
      console.log("playerB");
      playerRef.current = "B";
      setPrevFirstAction("회피");
      const meBounti = cookies.meBounti;
      const bounti = cookies.bounti;
      setBObj((prev) => ({
        ...prev,
        bounti: meBounti,
        imgSrc: meBounti ? gameImg.bounti_stand_left : gameImg.cow_stand_left,
      }));
      setObj((prev) => ({
        ...prev,
        bounti,
        imgSrc: bounti ? gameImg.bounti_stand_right : gameImg.cow_stand_right,
      }));

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
          플레이어 선정 : ${playerRef.current}
        `);
      // setTimeout(() => socket.disconnect(), 2000);
    };

    socket.emit("moveToBangDone", matchId);

    socket.on("welcome", welcomeAndDataChannel);

    socket.on("offer", offerAndDataChannel);

    socket.on("answer", answer);

    socket.on("ice", ice);

    peerConnection.addEventListener("icecandidate", handleIce);

    if (!cookies) {
      navigation("/games", { replace: true });
    }
    setGameDatas((prev) => ({
      ...prev,
      _id: cookies._id,
      player_id: cookies._id,
    }));
    const giveUp = () => {
      const gameData = { ...gameDatas };
      gameData._id = cookies._id;
      gameData.player_id = infomation.id;
      reqRecordGame(gameData);
      Cookies.remove("bang");
      sendData({ type: "giveup", data: "" })();
    };
    window.addEventListener("beforeunload", giveUp);
    window.addEventListener("pagehide", giveUp);

    return () => {
      socket.emit("cancelMatch", matchId);
      sendData({ type: "giveup", data: "" })();
      socket.removeAllListeners();
      socket.disconnect();
      peerConnection.removeEventListener("icecandidate", handleIce);
      peerConnection.close();
      window.removeEventListener("beforeunload", giveUp);
      window.removeEventListener("pagehide", giveUp);
    };
  }, [peerConnection]);

  // 승패

  // 총 효과음
  useEffect(() => {
    if (playShot) {
      setTimeout(() => gunFireAudio.play(), 200);
      setPlayShot(false);
    }
  }, [playShot]);
  // --

  // INIT
  useEffect(() => {
    setStartTime(new Date().getTime());
    dispatch(setBgm(allBgm.bang));
    return () => {
      dispatch(setBgm(allBgm.home));
      dispatch(setReset(resetState));
    };
  }, []);
  // --

  // 카운트 관리 -= 추후 특정 시간대에 시작으로 바꿔야할듯?
  const secondActionTimer = useRef(0);
  secondActionTimer.current = new Date().getTime() + 1000;
  useEffect(() => {
    console.log(terminel, cnt);
    if (
      terminel.me === "countDown" &&
      // terminel.you === "countDown" &&
      cnt !== 0
    ) {
      console.log((actionWait.current - Date.now()) / 1000, "초 후에 시작");
      // console.log(startAfterMsTime(actionWait.current - Date.now()));
      const timer = setInterval(() => {
        setCnt((prevCount) => {
          if (prevCount === 1) {
            setTimeout(() => {
              setCnt((prev) => prev - 1);
            }, actionWait.current - Date.now());
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
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [cnt, actionClicked]);

  // 게임 진행순서 관리
  useEffect(() => {
    const me = terminel.me;
    const you = terminel.you;
    console.log(me, you);
    // 장비 다 골랐을때
    if (me === "initDone" && you === "initDone") {
      dispatch(setActionModal(true));
    }
    if (me === "readyForCnt" && you === "readyForCnt") {
      readyToDie();
    }
    if (me === "firstActionDone" && you === "firstActionDone") {
      // if (me === "firstActionDone") {
      const dateNow = Date.now();
      console.log((secondActionTimer.current - dateNow) / 1000, "초 후 시작");
      wasJump.current = "stand";
      setTimeout(() => {
        console.log("2번째액션 시작!", new Date());
        action(1);
      }, secondActionTimer.current - dateNow + 1000);
    }
    // console.log(me, you);
    if (me === "secondActionDone" && you === "secondActionDone") {
      const newBoard = copyBoard(board, targetBoard, playerRef.current);
      wasJump.current = "stand";
      // const timer = setTimeout(() => {
      setTimeout(() => {
        reset();
        setTerminel((prev) => ({ ...prev, me: "initDone", you: "initDone" }));
        setBoard(newBoard);
        dispatch(setRound(round + 1));
      }, 2000);
      // }, 2000);
      // return () => clearTimeout(timer);
    }
  }, [terminel]);
  // --

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
    if (status.me.health > 0 && status.you.health > 0) return;
    setGameSet(true);
    const cookies = getDecryptedCookie("bang");
    const imBounti = cookies.meBounti;
    const win = status.me.health <= 0 ? false : true;
    if (!win) {
      dispatch(
        setModal({
          show: true,
          btnText: "기도",
          description:
            "당신은 패자입니다. 상대가 자비를 베풀기를 기도하십시오.",
          title: "패배",
        })
      );
    } else {
      if (imBounti) {
      }
      setPopupState({
        show: true,
        description: imBounti
          ? "당신은 또 승리했습니다. 자비는 없습니다."
          : "승리했습니다! 자비를 베푸시겠습니까?\n자비를 베풀면 랭킹에 관여하는 AP를 획득합니다. \n\n자비가 없는 사람에게는 현상금이 걸릴 수 있습니다.",
        rightAction: () => {
          if (imBounti) {
            winnerGameDone(false);
          } else {
            winnerGameDone(true);
          }
        },
        leftAction: () => {
          winnerGameDone(false);
        },
        title: "승리!",
        setPopupState,
        imBounti,
      });
    }
    // navigation("reward", { replace: true, state: { data: gameDatas } });
  }, [status]);

  if (gameSet) {
    return (
      <Container style={{ flex: 1, position: "relative" }}>
        <WinnerPopup
          show={popupState.show}
          title={popupState.title}
          description={popupState.description}
          rightAction={popupState.rightAction}
          leftAction={popupState.leftAction}
          setPopupState={setPopupState}
          imBounti={popupState.imBounti}
        />
      </Container>
    );
  }

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
            player={playerRef.current}
            status={status}
            ability={ability}
            tartgetAbility={tartgetAbility}
            type={"A"}
          />

          {/* B플레이어 */}
          <PlayerInterface
            player={playerRef.current}
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
          targetBoard={targetBoard}
          aChat={aChat}
          bChat={bChat}
          player={playerRef.current}
          setObj={setObj}
          setBObj={setBObj}
        />
        {terminel.me === "initDone" && !actionModal && (
          <ControllBoard
            obj={obj}
            board={board}
            setBoard={setBoard}
            player={playerRef.current}
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
                  if (playerRef.current === "A") {
                    const newChat = [...aChat];
                    if (newChat.length >= 2) {
                      newChat.shift();
                    }
                    newChat.push(text);
                    sendData({
                      type: "chat",
                      data: playerRef.current + "·" + text,
                    })();
                    setText("");
                    setAChat(newChat);
                  } else if (playerRef.current === "B") {
                    const newChat = [...bChat];
                    if (newChat.length >= 2) {
                      newChat.shift();
                    }
                    newChat.push(text);
                    sendData({
                      type: "chat",
                      data: playerRef.current + "·" + text,
                    })();
                    setText("");
                    setBChat(newChat);
                  }
                }
              }}
            />
            <PrevBtn
              onClick={() => {
                if (playerRef.current === "A") {
                  const newChat = [...aChat];
                  if (newChat.length >= 2) {
                    newChat.shift();
                  }
                  newChat.push(text);
                  sendData({
                    type: "chat",
                    data: playerRef.current + "·" + text,
                  })();
                  setText("");
                  setAChat(newChat);
                } else if (playerRef.current === "B") {
                  const newChat = [...bChat];
                  if (newChat.length >= 2) {
                    newChat.shift();
                  }
                  newChat.push(text);
                  sendData({
                    type: "chat",
                    data: playerRef.current + "·" + text,
                  })();
                  setText("");
                  setBChat(newChat);
                }
              }}
              style={{ padding: 5, minHeight: 30 }}
            >
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
                {playerRef.current === "A" && terminel.me === "readyForCnt"
                  ? "Ready!"
                  : playerRef.current === "B" && terminel.you === "readyForCnt"
                  ? "Ready!"
                  : ""}
              </Text.SemiBold_24>
              {/* <ActionState
                nowAction={nowAction}
                targetAction={targetAction}
                player={playerRef.current === "A" ? "A" : "B"}
              /> */}
            </View>
            {/* B */}
            <View>
              <Text.SemiBold_24 color={colors.Accent}>
                {playerRef.current === "B" && terminel.me === "readyForCnt"
                  ? "Ready!"
                  : playerRef.current === "A" && terminel.you === "readyForCnt"
                  ? "Ready!"
                  : ""}
              </Text.SemiBold_24>
              {/* <ActionState
                nowAction={nowAction}
                targetAction={targetAction}
                player={playerRef.current === "A" ? "B" : "A"}
              /> */}
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

      {terminel.me === "initDone" && !gameSet && (
        <ActionModal prevFirstAction={prevFirstAction} />
      )}
      {terminel.me === "init" && !gameSet && (
        <Inventory
          bag={bag}
          ability={ability}
          setBag={setBag}
          setAbility={setAbility}
          setStatus={setStatus}
          setTerminel={setTerminel}
          sendData={sendData}
          setGameDatas={setGameDatas}
        />
      )}
      <BottomPrevNext
        rightBtnColor="rgba(145, 255, 0, 0.797)"
        visible={
          terminel.me === "initDone" && !actionModal && step === 2 && !gameSet
        }
        prevAction={reset}
        prevText={"초기화"}
        nextAction={() => {
          if (
            (terminel.me === "initDone" && !actionModal && step === 2) === false
          )
            return;
          const random = getRandomTime(); // ms로
          const jumpIdx = nowAction.findIndex((obj) => obj.action === "회피");
          const atkIdx = nowAction.findIndex((obj) => obj.action === "공격");
          const [newBoard, exchangeBoard] = getChangeBoard(
            board,
            playerRef.current,
            nowAction[jumpIdx].path
          );
          actionWait.current = 2000 + random + Date.now();
          sendData({
            type: "readyForCnt",
            data: {
              time: actionWait.current,
              board: exchangeBoard,
              atkPath: nowAction[atkIdx].path,
            },
          })();
          console.log(actionWait.current);
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
