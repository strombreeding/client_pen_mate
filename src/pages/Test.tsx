import styled from "styled-components";
import { Pressable, View } from "../nativeView";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { gameImg } from "../assets/gameImg";
import { Text } from "../assets/fontStyles";
// import { Socket, io } from "socket.io-client";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setCanPopstateEvent, setCanScroll } from "../store/slices/appState";
import ControllBoard from "../components/games/bang/ControllBoard";
import { Container, EmptyBox } from "../styles";
import CharBoard, {
  getLocationValue,
} from "../components/games/bang/CharBoard";
import { colors } from "../assets/colors";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import BottomModal from "../components/games/BottomModal";
import { time } from "console";
import { SOCKET_URI, iceServers } from "../configs/server";
import ActionBtn from "../components/games/bang/detail/ActionBtn";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket, io } from "socket.io-client";
import MatchingModal from "../components/games/bang/detail/MatchingModal";
import { imgSrc } from "../assets/img";

interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}
interface IMessageProps {
  type: "first" | "second" | "회피" | "지연율" | "지연율리턴" | "";
  data: any;
}

export interface IWillAction {
  action: "공격" | "회피" | "";
  path: number[];
}

const DEFAULT_IMAGE_SIZE = {};
export const emptyVal = (width: number) => -((width - width * 0.625) / 2);

const Char = styled.div<{ data: ICharProps }>`
  position: fixed;
  top: 200px;
  left: ${(prop) => emptyVal(prop.data.width)}px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  background-color: red;
`;
const RightChar = styled.div<{ data: ICharProps }>`
  position: absolute;
  /* top: 300px; */
  bottom: 10px;
  right: ${(prop) =>
    emptyVal(prop.data.width) + -emptyVal(prop.data.width) / 3}px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  background-color: red;
`;

function Test() {
  // 리덕스 써야하는 것들 모음
  const [match, setMatch] = useState(false);
  const [targetReady, setTargetReady] = useState("notYet");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // 리덕스 써야하는것들 모음 끝
  const [nowAction, setNowAction] = useState<IWillAction[]>([
    { action: "", path: [] },
    { action: "", path: [] },
    { action: "", path: [] },
  ]);
  const [player] = useState("B");
  // const [player] = useState("B");
  const [ready, setReady] = useState(false);
  const [createdMatch, setCreatedMatch] = useState(false);
  const [step, setStep] = useState<number>(0);
  // a는 b를 건드리면 안대고 반대도 마찬가지. RTC 통신으로 effect로 받아온 대치값 ref
  const bRef = useRef(null);
  const [aWillAction, setAWillAction] = useState([] as number[]);
  const [bWillAction, setBWillAction] = useState([] as number[]);
  const [execAction, setExecAction] = useState(false);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0],
  ]);
  const [obj, setObj] = useState<ICharProps>({
    imgSrc: gameImg.cow_stand_right,
    width: SCREEN_WIDTH * 0.2222,
    height: 0,
    cols: 1,
    rows: 1,
  });

  const [current, setCurrent] = useState(0);
  const [action, setAction] = useState<
    "jump" | "atk" | "stand" | "walk" | null[]
  >([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cnt, setCnt] = useState(3);
  const [matchId, setMatchId] = useState("");
  // const matchId = useRef("");
  const timerRef = useRef(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef(-1);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCanScroll(false));

    return () => {
      dispatch(setCanScroll(true));
      // connection.removeEventListener("icecandidate", co);
    };
  }, []);
  const myDataChannel = useRef<RTCDataChannel>();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  // const [myDataChannel.current, setMyDataChannel.current] = useState<RTCDataChannel>();
  const targetActionRef = useRef("");
  useEffect(() => {
    console.log("소켓변경감지");
    setPeerConnection(
      new RTCPeerConnection({
        iceServers: iceServers,
      })
    );
    if (!peerConnection) return;
    if (socket == null) return;

    // 함수 정의 목록

    /* ice이벤트 발생시 핸들러 */
    const handleIce = (data: RTCPeerConnectionIceEvent) => {
      socket.emit("ice", data.candidate, matchId);
    };

    const handleData = (event: MessageEvent<string>) => {
      // 선준비 여부 , 상대방의 액션 목록, 상대방의 보드
      const recieve: IMessageProps = JSON.parse(event.data);

      if (recieve.type === "first") {
        cntRef.current = recieve.data;
        setTargetReady("already");
        return;
      }

      // 내가 후순위 준비하는 경우
      if (recieve.type === "second") {
        setTargetReady("done");
        cntRef.current = recieve.data;
        return;
      }

      // 회피자의 회피액션 수신하여 REF로 반영
      if (recieve.type === "회피") {
        targetActionRef.current = "회피";
      }
    };

    /* 소켓에서 매칭 되었을때 타이머와 모달을 생성 */
    const matchFound = (id: string) => {
      setMatch(true);
      setMatchId(id);
      const timeoutId = setTimeout(() => {
        alert("타임아웃");
        setMatch(false);
        socket.emit("cancelMatch", matchId);
        socket.disconnect();
      }, 5000);
      setTimer(timeoutId);
    };

    /* 상대방에 의해 매칭이 취소된 경우에 새롭게 큐를 잡아줌 */
    const cancelMatch = () => {
      setMatch(false);
      setMatchId("");
      setTimeout(() => socket.emit("joinQueue"), 1000);
      clearTimeout(timer!);
      setTimer(null);
    };

    const closeRoom = () => {
      setMatch(false);
    };

    /* 수락을 먼저 누른 브라우저가 후클릭한 브라우저에 오퍼를 보냄
        동시에 RTC 데이터채널을 개설하여 상대방과 연결시 해당 채널로 데이터 교환 
    */
    const welcomeAndDataChannel = async () => {
      myDataChannel.current = peerConnection.createDataChannel("chat");
      console.log(myDataChannel.current.readyState);

      // 상대방의 데이터를 수신하여 다른 기능을 하는 함수
      myDataChannel.current.addEventListener("message", handleData);

      // 오퍼 생성후 후클릭 브라우저에 전달
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      socket.emit("offer", offer, matchId);
    };

    /* 후클릭 브라우저가 받는 오퍼와 데이터채널 교환 */
    const offerAndDataChannel = async (offer: any) => {
      peerConnection.addEventListener("datachannel", (event) => {
        myDataChannel.current = event.channel;
        myDataChannel.current.addEventListener("message", handleData);
      });

      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, matchId);
    };

    const answer = (answer: any) => {
      peerConnection.setRemoteDescription(answer);
      socket.emit("modalClose", matchId);
    };

    const ice = (ice: any) => {
      peerConnection.addIceCandidate(ice);
      console.log(`
        브라우저간 연결 상태...
        시그널 상태 : ${peerConnection.signalingState}
        커넥션 상태 : ${peerConnection.connectionState}
        아이스 상태 : ${peerConnection.iceConnectionState}
      `);
      setCreatedMatch(true);
    };

    socket.emit("joinQueue");

    socket.on("matchFound", matchFound);

    socket.on("cancelMatch", cancelMatch);

    socket.on("closeRoom", closeRoom);

    socket.on("welcome", welcomeAndDataChannel);

    socket.on("offer", offerAndDataChannel);

    socket.on("answer", answer);

    socket.on("ice", ice);

    peerConnection.addEventListener("icecandidate", handleIce);

    return () => {
      socket.emit("cancelMatch", matchId);
      socket.disconnect();
      socket.removeAllListeners();
      peerConnection.removeEventListener("icecandidate", handleIce);
    };
  }, [socket]);

  const cntRef = useRef(0);
  const countDownAction = () => {
    if (ready && targetReady === "done") {
      setTimeout(() => {
        setCnt(2);
      }, 1000);
      setTimeout(() => setCnt(1), 2000);
      console.log("이만큼 대기", cntRef.current * 1000);
      setTimeout(() => setCnt(0), 3000 + cntRef.current * 1000);
    }
  };

  useEffect(() => {
    const random = Math.random() * (7 - 0.3) + 0.3;
    const obj: IMessageProps = {
      type: "",
      data: random,
    };
    if (ready && targetReady === "notYet") {
      obj.type = "first";
      sendData(obj)();
    } else if (ready && targetReady === "already") {
      obj.type = "second";
      cntRef.current = random;
      sendData(obj)();
      setTargetReady("done");
    }
    if (ready && targetReady === "done") {
      countDownAction();
    }

    return () => {};
  }, [ready, targetReady, socket]);

  const sendData = (data: any) => () => {
    if (myDataChannel.current) {
      console.log(myDataChannel.current.readyState);
      if (!myDataChannel.current.readyState) return;
      const source = JSON.stringify(data);
      myDataChannel.current.send(source);
    }
  };

  // useEffect(() => {
  //   if (step === 2) {
  //     setReady(true);
  //     sendData("ready");
  //   }
  // }, [step]);

  const xRef = useRef(emptyVal(obj.width));
  const yRef = useRef(10);
  const yLimitRef = useRef(0);

  const jump = () => {
    const now = new Date().getTime();
    const locations = getLocationValue([0, 5], obj.width, board);
    console.log(locations);
    // if (!divRef.current) return;
    // if (action === "jump") {
    //   if (current > 4) {
    //     yRef.current = yRef.current - 4;
    //   } else {
    //     yRef.current = yRef.current + 4;
    //   }
    //   console.log(xRef.current);
    //   xRef.current = xRef.current + 1;
    //   divRef.current.style.right = xRef.current + "px";
    //   // divRef.current.style.left = xRef.current + "px";
    //   divRef.current.style.bottom = yRef.current + "px";
    // }

    // const currentCol = current % obj.cols;
    // const currentRow = Math.floor(current / obj.cols);
    // const bgPosition = `${-obj.width * currentCol}px ${
    //   -obj.height * currentRow
    // }px`;
    // timerRef.current++;

    // if (timerRef.current - now <= 0) {
    //   console.log(bgPosition);
    //   //   console.log("움직임");
    //   timerRef.current = new Date().getTime() + 60;
    //   //   timerRef.current = new Date().getTime() + 80;
    //   divRef.current.style.backgroundPosition = bgPosition;
    //   if (current >= 8) {
    //     // divRef.current.style.backgroundImage = `url(${gameImg.right_cowboy})`;
    //     setObj((prev) => ({
    //       ...prev,
    //       width: 256,
    //       cols: 1,
    //       rows: 1,
    //       imgSrc: gameImg.cow_stand_right,
    //     }));
    //     setAction("stand");
    //     setCurrent(0);
    //   } else {
    //     setCurrent(current + 1);
    //   }
    // } else {
    // }
    // animationRef.current = requestAnimationFrame(jump);
  };

  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(board));
    const movePath = nowAction.filter(
      (action) => action.action === "회피" && action.path.length > 0
    );
    if (movePath.length === 1) {
      const id = player === "A" ? 2 : 3;

      for (let x = 0; x < copy.length; x++) {
        for (let y = 0; y < copy[x].length; y++) {
          if (copy[x][y] === id) copy[x][y] = 0;
        }
      }
      copy[movePath[0].path[0]][movePath[0].path[1]] = id;
      console.log(copy);
    }
    // setBoard()
  }, [nowAction]);

  useEffect(() => {
    if (action === "jump") {
      setObj((prev) => ({
        ...prev,
        cols: 8,
        rows: 1,
        imgSrc: gameImg.cow_jump_right_1x8,
      }));
      animationRef.current = requestAnimationFrame(jump);
    } else if (action === "atk") {
      setObj((prev) => ({
        ...prev,
        cols: 2,
        rows: 3,
        imgSrc: gameImg.bounti_atk_left_3x2,
      }));
      animationRef.current = requestAnimationFrame(jump);
    } else if (action === "walk") {
      setObj((prev) => ({
        ...prev,
        cols: 4,
        rows: 1,
        imgSrc: gameImg.bounti_walk_right_1x4,
      }));
      animationRef.current = requestAnimationFrame(jump);
    }
    return () => {
      if (animationRef.current) {
        // console.log("언마운트");
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [current, action]);

  return (
    <Container style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <Text.Light_12>ㅎㅇ</Text.Light_12>
      </View>
      <Pressable
        onClick={() => {
          setSocket(
            io(`${SOCKET_URI}`, {
              transports: ["websocket"],
            })
          );
        }}
        style={{ position: "relative", width: "100%" }}
      >
        <Text.Regular_32
          style={{
            position: "absolute",
            top: SCREEN_WIDTH / 2.2,
            right: SCREEN_WIDTH / 2.8,
          }}
        >
          Queue
        </Text.Regular_32>
        <img src={gameImg.action_btn} />
      </Pressable>
      <Pressable
        style={{ padding: 30, backgroundColor: "red" }}
        onClick={() => {
          socket?.emit("acceptMatch", matchId);
        }}
      >
        <Text.Light_12>ㅎㅇ</Text.Light_12>
      </Pressable>
      {/* {match && (
        <MatchingModal
          visible={match}
          matchId={matchId}
          socket={socket}
          timer={timer}
          setMatch={setMatch}
          setTimer={setTimer}
          setSocket={setSocket}
        />
      )} */}
    </Container>
  );
}

export default Test;
