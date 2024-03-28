import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
  Dispatch,
  DispatchWithoutAction,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import MatchBtn from "./MatchBtn";
import { Pressable, View } from "../../../../nativeView";
import styled from "styled-components";
import { Text } from "../../../../assets/fontStyles";
import { useAudio } from "../../../../hooks/useAudio";
import { allSfx } from "../../../../assets/sound";
import { PrevBtn } from "../../../navigations/BottomPrevNext";
import { EmptyBox } from "../../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  setActionWait,
  setMatchFound,
  setMatchId,
  setMatchStart,
  setMatchTimer,
  setTargetReady,
} from "../../../../store/slices/bangState";
import { SOCKET_URI, iceServers } from "../../../../configs/server";
import { useNavigate } from "react-router-dom";
import { setEncryptedCookie } from "../../../../utils/cookies";
import { colors } from "../../../../assets/colors";
import { recordGame } from "../../../../apis/recordGame";
import { updateCostState } from "../../../../utils/localStorage";
import { setInfomation } from "../../../../store/slices/userState";

const ModalContainer = styled(View)<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  position: absolute;
  top: 300px;
  left: 30px;
  right: 30px;
  border-radius: 50px 50px 50px 50px;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px) contrast(60%);
  -webkit-backdrop-filter: blur(10px) contrast(60%);
  justify-content: center;
  padding: 30px;
  align-items: center;
`;
interface IMessageProps {
  type: "first" | "second" | "회피" | "지연율" | "지연율리턴" | "";
  data: any;
}

function MatchingModal({}) {
  const navigation = useNavigate();
  // const [peerConnection, setPeerConnection] =
  //   useState<RTCPeerConnection | null>(null);
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  const matchStart = useSelector(
    (state: RootState) => state.bangState.matchStart
  );
  const matchFound = useSelector(
    (state: RootState) => state.bangState.matchFound
  );

  const [targetProp, setTargetProp] = useState({ nickname: "", bounti: false });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [clicked, setClicked] = useState(false);
  const newAudio = useAudio(allSfx.back);
  const matchId = useSelector((state: RootState) => state.bangState.matchId);
  const matchTimer = useSelector(
    (state: RootState) => state.bangState.matchTimer
  );
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const dispatch = useDispatch<AppDispatch>();
  const matchAudio = useAudio(allSfx.match);
  // 소켓연결후 조인큐 보내는 훅
  useEffect(() => {
    console.log("소켓변경감지");

    //  peerConnection
    if (socket == null) return;
    /* 소켓에서 매칭 되었을때 타이머와 모달을 생성 */
    const matchFound = (payload: {
      roomId: string;
      targetProps: { nickname: string; bounti: boolean };
    }) => {
      console.log(payload.targetProps.nickname);
      matchAudio.play();
      setTargetProp({
        nickname: payload.targetProps.nickname,
        bounti: payload.targetProps.bounti,
      });
      dispatch(setMatchFound(true));
      dispatch(setMatchId(payload.roomId));
      const timeoutId = setTimeout(() => {
        socket.emit("cancelMatch", payload.roomId);
        dispatch(setMatchFound(false));
        dispatch(setMatchStart(false));
        socket.disconnect();
      }, 5000);
      dispatch(setMatchTimer(timeoutId));
    };

    /* 상대방에 의해 매칭이 취소된 경우에 새롭게 큐를 잡아줌 */
    const cancelMatch = () => {
      setTimeout(() => {
        socket.emit("joinQueue", {
          id: infomation.id,
          nickname: infomation.nickname,
        });
      }, 2000);
      clearTimeout(matchTimer!);
      setClicked(false);
      dispatch(setMatchFound(false));
      dispatch(setMatchId(""));

      // dispatch(setMatchStart(false));
      dispatch(setMatchTimer(null));
    };

    const closeRoom = () => {
      setClicked(false);
      dispatch(setMatchFound(false));
    };

    socket.emit("joinQueue", {
      id: infomation.id,
      nickname: infomation.nickname,
    });

    socket.on("matchFound", matchFound);

    socket.on("cancelMatch", cancelMatch);

    socket.on("closeRoom", closeRoom);

    socket.on("goBang", async () => {
      const props = {
        gameTitle: gameState.gameTitle!,
        costObj: gameState.costObj!,
      };
      const { record, updateSource } = await recordGame(props);
      updateCostState(updateSource);
      dispatch(setInfomation({ ...updateSource }));
      dispatch(setMatchStart(false));
      setEncryptedCookie("bang", {
        type: "cool",
        nickname: targetProp.nickname,
        bounti: targetProp.bounti,
        _id: record._id,
      });
      navigation("/games/bang");
      closeRoom();
    });

    return () => {
      socket.emit("cancelMatch", matchId);
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [socket]);

  // 소켓 연결해주는 훅
  useEffect(() => {
    if (!matchStart) return;

    console.log(SOCKET_URI, "로 접속 시도");
    setSocket(
      io(`${SOCKET_URI}`, {
        transports: ["websocket"],
      })
    );
    return () => {
      setSocket(null);
    };
  }, [matchStart]);
  return (
    <ModalContainer visible={matchFound}>
      <View style={{ alignItems: "center" }}>
        <Text.Light_32>결투!</Text.Light_32>
        <EmptyBox height={15} />
        <Text.Light_20 color={colors.Accent_Red}>
          {targetProp.nickname}
        </Text.Light_20>
        <EmptyBox height={15} />
        <Text.Light_16>
          {targetProp.bounti ? "현상수배" : "카우보이"}
        </Text.Light_16>
        <EmptyBox height={15} />

        <EmptyBox height={30} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <PrevBtn
          style={clicked ? { opacity: 0.5 } : {}}
          onClick={() => {
            if (clicked) return;
            socket?.emit("cancelMatch", matchId);
            socket?.disconnect();
            clearTimeout(matchTimer!);
            setClicked(false);
            dispatch(setMatchStart(false));
            dispatch(setMatchFound(false));
            dispatch(setMatchTimer(null));
          }}
        >
          <Text.Light_20>거절</Text.Light_20>
        </PrevBtn>
        <EmptyBox width={20} />
        <PrevBtn
          style={clicked ? { opacity: 0.5 } : {}}
          onClick={() => {
            // navigation("wieogjweoigj", { state: socket });
            if (clicked) return;
            clearTimeout(matchTimer!);
            dispatch(setMatchTimer(null));
            setClicked(true);
            socket?.emit("acceptMatch", matchId);
          }}
        >
          <Text.Light_20>수락</Text.Light_20>
        </PrevBtn>
      </View>
    </ModalContainer>
  );
}

export default MatchingModal;
