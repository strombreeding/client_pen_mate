import { SetStateAction, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { SOCKET_URI, iceServers } from "../configs/server";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setActionWait, setTargetReady } from "../store/slices/bangState";
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
import { PrevBtn } from "../components/navigations/BottomPrevNext";
import { setBgImg, setBgm } from "../store/slices/appState";
import { allBgm } from "../assets/sound";
import SoundPressable from "../components/designs/SoundPressable";
import Inventory from "../components/games/bang/Inventory";
import PlayerInterface from "../components/games/bang/PlayerStatus";
import { colors } from "../assets/colors";

export interface IMessageProps {
  type: "first" | "second" | "회피" | "상대능력" | "chat" | "";
  data: any;
}
export type Ablilty = {
  atk: number;
  health: number;
  skil: string[];
  subHealth: number;
};
type StepProps = "action" | "first" | "second" | "final" | "ready" | "init";
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
  me: string;
  you: string;
}
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
  const [modal, setModal] = useState(false);
  const [player, setPlayer] = useState<"A" | "B">("A");
  const [text, setText] = useState("");
  const [aChat, setAChat] = useState([] as string[]);
  const [bChat, setBChat] = useState([] as string[]);

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
    me: { health: ability.health, nickname: "easynee_", subHealth: 0 },
    you: { health: tartgetAbility.health, nickname: "bounti", subHealth: 0 },
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

  const [bag, setBag] = useState<ItemProps[]>([{}, {}, {}] as ItemProps[]);
  const [terminel, setTerminel] = useState<TerminelProps>({
    me: "init",
    you: "init",
  });

  // const nowAction = useSelector(())
  const [step, setStep] = useState<StepProps>("init");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const dataChannel = useRef<RTCDataChannel>();
  const matchId = useSelector((state: RootState) => state.bangState.matchId);

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
      console.log("아이스브레이킹");
      socket.emit("ice", data.candidate, matchId);
    };

    const handleData = (event: MessageEvent<string>) => {
      // 선준비 여부 , 상대방의 액션 목록, 상대방의 보드
      const recieve: IMessageProps = JSON.parse(event.data);
      console.log(recieve);
      if (recieve.type === "first") {
        dispatch(setActionWait(recieve.data));
        dispatch(setTargetReady("already"));
        return;
      }

      // 내가 후순위 준비하는 경우
      if (recieve.type === "second") {
        dispatch(setTargetReady("done"));
        dispatch(setActionWait(recieve.data));
        return;
      }

      if (recieve.type === "상대능력") {
        setTargetAbility(recieve.data);
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
        if (player === "A") {
          const newChat = [...aChat];
          if (newChat.length >= 1) newChat.shift();
          newChat.push(recieve.data);
          setAChat(newChat);
        } else {
          const newChat = [...bChat];
          if (newChat.length >= 1) newChat.shift();
          newChat.push(recieve.data);
          setBChat(newChat);
        }
      }
      // 회피자의 회피액션 수신하여 REF로 반영
      //   if (recieve.type === "회피") {
      //     targetActionRef.current = "회피";
      //   }
    };

    /* 수락을 먼저 누른 브라우저가 후클릭한 브라우저에 오퍼를 보냄
          동시에 RTC 데이터채널을 개설하여 상대방과 연결시 해당 채널로 데이터 교환
      */
    const welcomeAndDataChannel = async () => {
      console.log("니가 오퍼 보내");
      setPlayer("A");
      dataChannel.current = peerConnection.createDataChannel("chat");
      console.log(dataChannel.current.readyState);

      // 상대방의 데이터를 수신하여 다른 기능을 하는 함수
      dataChannel.current.addEventListener("message", handleData);

      // 오퍼 생성후 후클릭 브라우저에 전달
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      socket.emit("offer", offer, matchId);
    };

    /* 후클릭 브라우저가 받는 오퍼와 데이터채널 교환 */
    const offerAndDataChannel = async (offer: any) => {
      console.log("오퍼 받고 엔서 보내");
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
      console.log("답장받았고 ");
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
        `);
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
    dispatch(setBgm(allBgm.bang));
    return () => {
      dispatch(setBgm(allBgm.home));
    };
  }, []);

  const sendData = (data: any) => () => {
    if (dataChannel.current) {
      console.log(dataChannel.current.readyState);
      if (dataChannel.current.readyState !== "open") return;
      const source = JSON.stringify(data);
      dataChannel.current.send(source);
    }
  };

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

          {/* 배팅금액 */}
          {/* <View>
            <Text.Light_32>500</Text.Light_32>
          </View> */}

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
        {(step === "final" || step === "second" || step === "first") && (
          <ControllBoard
            obj={obj}
            board={board}
            setBoard={setBoard}
            player={player}
          />
        )}
      </View>

      <BottomInterface>
        <EmptyBox height={10} />
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
                    data: text,
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
                    data: text,
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
        <EmptyBox height={30} />
      </BottomInterface>

      {modal && (step === "final" || step === "second" || step === "first") && (
        <ActionModal setModal={setModal} />
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
