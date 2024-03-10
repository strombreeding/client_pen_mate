import styled from "styled-components";
import { Pressable, View } from "../nativeView";
import { useEffect, useRef, useState } from "react";
import { gameImg } from "../assets/gameImg";
import { Text } from "../assets/fontStyles";
import { Socket, io } from "socket.io-client";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setCanPopstateEvent, setCanScroll } from "../store/slices/appState";
import ControllBoard from "../components/games/bang/ControllBoard";
import { EmptyBox } from "../styles";
import CharBoard, {
  getLocationValue,
} from "../components/games/bang/CharBoard";
import { colors } from "../assets/colors";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import BottomModal from "../components/games/BottomModal";
import { time } from "console";
import { SOCKET_URI } from "../configs/server";

interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
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

let peerConnection = new RTCPeerConnection();
let myDataChannel: RTCDataChannel;
function Test() {
  const [nowAction, setNowAction] = useState<IWillAction[]>([
    { action: "", path: [] },
    { action: "", path: [] },
    { action: "", path: [] },
  ]);
  const [match, setMatch] = useState(false);
  const [player] = useState("B");
  // const [player] = useState("B");
  const [ready, setReady] = useState(false);
  const [targetReady, setTargetReady] = useState("notYet");
  const [step, setStep] = useState<number>(0);
  // a는 b를 건드리면 안대고 반대도 마찬가지. RTC 통신으로 effect로 받아온 대치값 ref
  const bRef = useRef(null);
  const [aWillAction, setAWillAction] = useState([] as number[]);
  const [bWillAction, setBWillAction] = useState([] as number[]);
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
  const matchId = useRef("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const timerRef = useRef(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef(-1);

  const [channel, setChannel] = useState<RTCDataChannel>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    peerConnection.addEventListener("icecandidate", (e) => {
      console.log("아이스브레이킹!!", e);
    });
    dispatch(setCanScroll(false));
    return () => {
      dispatch(setCanScroll(true));
      // connection.removeEventListener("icecandidate", co);
    };
  }, []);
  const targetActionRef = useRef("");
  useEffect(() => {
    console.log("소켓변경감지");

    if (socket == null) return;
    const handleIce = (data: RTCPeerConnectionIceEvent) => {
      socket.emit("ice", data.candidate, matchId.current);
    };
    peerConnection = new RTCPeerConnection();

    socket.emit("joinQueue");

    socket.on("matchFound", (id) => {
      console.log("매칭을 찾았어!");
      setMatch(true);
      matchId.current = id;
      const timeoutId = setTimeout(() => {
        alert("타임아웃");
        setMatch(false);
        socket.emit("cancelMatch", matchId.current);
        socket.disconnect();
      }, 5000);
      setTimer(timeoutId);
      // initiateRTCConnection();
    });

    socket.on("closeRoom", () => {
      setMatch(false);
    });

    // 먼저 수락을 누른 브라우저가 오퍼를 만들어서 후클릭 브라우저에 전달함
    socket.on("welcome", async () => {
      myDataChannel = peerConnection.createDataChannel("chat");
      myDataChannel.addEventListener("message", (event) => {
        console.log("A", event.data);
        // if (event.data === "준비완료") {
        //   setTargetReady(true);
        // }

        if (event.data.includes("first")) {
          console.log("상대가 먼저 준비했다", event.data.split("/")[1]);
          cntRef.current = event.data.split("/")[1];
          setTargetReady("already");
          return;
        }
        if (event.data.includes("second")) {
          setTargetReady("done");
          console.log("내가 두번째다~");
          return;
        }
        if (event.data === "회피") {
          targetActionRef.current = "회피";
        }
      });
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      console.log("크롬이 오퍼 보냄");
      socket.emit("offer", offer, matchId.current);
    });

    // 먼저 누른 브라우저의 오퍼를 받음
    socket.on("offer", async (offer) => {
      peerConnection.addEventListener("datachannel", (event) => {
        myDataChannel = event.channel;
        myDataChannel.addEventListener("message", (event) => {
          console.log("B", event.data);
          // if (event.data === "준비완료") {
          //   setTargetReady(true);
          // }

          if (event.data.includes("first")) {
            console.log("상대가 먼저 준비했다", event.data.split("/")[1]);
            cntRef.current = event.data.split("/")[1];
            setTargetReady("already");
            return;
          }

          if (event.data.includes("second")) {
            setTargetReady("done");
            cntRef.current = event.data.split("/")[1];

            console.log("내가 두번째다~");
            return;
          }
          if (event.data === "회피") {
            targetActionRef.current = "회피";
          }
        });
      });
      console.log("리시브 오퍼");
      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, matchId.current);
    });

    socket.on("answer", (answer) => {
      console.log("앤서 받았다");
      peerConnection.setRemoteDescription(answer);
      socket.emit("modalClose", matchId.current);
    });

    socket.on("ice", (ice) => {
      peerConnection.addIceCandidate(ice);
    });

    socket.on("cancelMatch", (arg) => {
      console.log(arg);
      setMatch(false);
      matchId.current = "";
      setTimeout(() => socket.emit("joinQueue"), 1000);
      clearTimeout(timer!);
      setTimer(null);
    });

    // if (!channel) return;
    // channel.onopen = () => {
    //   console.log("채널열림");
    // };

    peerConnection.addEventListener("icecandidate", handleIce);

    return () => {
      socket.emit("cancelMatch", matchId.current);
      socket.disconnect();
      socket.removeAllListeners();
      peerConnection.removeEventListener("icecandidate", handleIce);
    };
  }, [socket]);
  const cntRef = useRef(0);
  const zz = () => {
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
    if (ready && targetReady === "notYet") {
      sendData(`first/${random}`)();
    } else if (ready && targetReady === "already") {
      console.log("늦은놈이 보내는 거");
      sendData(`second/${random}`)();
      setTargetReady("done");
      cntRef.current = random;
    }
    if (ready && targetReady === "done") {
      zz();
    }

    return () => {};
  }, [ready, targetReady, socket]);

  const sendData = (data: any) => () => {
    if (!myDataChannel) return;
    myDataChannel.send(data);
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
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: "relative",
      }}
    >
      <EmptyBox height={20} />
      <Text.Light_32>{cnt}</Text.Light_32>
      <RightChar ref={divRef} data={obj}></RightChar>
      <CharBoard board={board} obj={obj} />

      <ControllBoard
        setReady={setReady}
        nowAction={nowAction}
        setNowAction={setNowAction}
        step={step}
        setStep={setStep}
        board={board}
        obj={obj}
        setBoard={setBoard}
        player={player}
      />

      <Pressable
        onClick={() => {
          if (cnt !== 0) {
            alert("너무 빨리쏨");
          } else if (targetActionRef.current === "회피") {
            alert("상대가 피함");
          } else {
            alert("맞춤!");
          }
        }}
      >
        <Text.Regular_36>공격</Text.Regular_36>
      </Pressable>
      <Pressable onClick={sendData("회피")}>
        <Text.Regular_36>회피</Text.Regular_36>
      </Pressable>

      <Pressable
        onClick={() => {
          //   socket;
          setSocket(
            io(`${SOCKET_URI}`, {
              transports: ["websocket"],
            })
          );
        }}
      >
        <Text.Regular_20>소켓룸 입장</Text.Regular_20>
      </Pressable>

      {match && (
        <View
          style={{
            position: "absolute",
            top: 300,
            left: 30,
            right: 30,
            bottom: 150,
            backgroundColor: "green",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Pressable
            onClick={() => {
              setMatch(false);
              socket?.emit("cancelMatch", matchId.current);
              socket?.disconnect();
              clearTimeout(timer!);
              setTimer(null);
              setSocket(null);
            }}
          >
            <Text.Light_32>거절</Text.Light_32>
          </Pressable>
          <Pressable
            onClick={() => {
              clearTimeout(timer!);
              setTimer(null);
              socket?.emit("acceptMatch", matchId.current);
            }}
          >
            <Text.Light_32>수락</Text.Light_32>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default Test;
