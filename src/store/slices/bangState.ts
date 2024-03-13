// bangSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { iceServers, SOCKET_URI } from "../../configs/server";
import { BangTargetReadt } from "../../types";
interface IWillAction {
  action: "공격" | "회피" | "";
  path: number[];
}
type StepProps = "action" | "first" | "second" | "final" | "ready" | "init";

interface SocketState {
  dataChannel: RTCDataChannel | undefined;
  matchStart: boolean;
  matchFound: boolean;
  matchId: string;
  matchTimer: NodeJS.Timeout | null;
  // 게임에 들어가서 필요한 props들
  actionWait: number; // 액션에 필요한 숫자 3, 2, 1 이후 0될때의 숫자
  ready: boolean; // 내가 준비했는지
  targetReady: BangTargetReadt; // 적이 준비했는지
  nowAction: IWillAction[];
  // step: StepProps;
  step: number;
  gameStatus: StepProps;
  actionModal: boolean;
}

const initialState: SocketState = {
  dataChannel: undefined,
  matchStart: false,
  matchFound: false,
  matchId: "",
  matchTimer: null,
  actionWait: 0,
  ready: false,
  targetReady: "notYet",
  nowAction: [
    { action: "", path: [] },
    { action: "", path: [] },
    { action: "", path: [] },
  ],
  step: 0,
  gameStatus: "init",
  actionModal: false,
};

const bangSlice = createSlice({
  name: "bang",
  initialState,
  reducers: {
    setDataChannel: (
      state,
      action: PayloadAction<RTCDataChannel | undefined>
    ) => {
      if (action.payload == undefined) {
        state.dataChannel = undefined;
      } else {
        state.dataChannel = action.payload;
      }
    },
    setMatchStart: (state, action: PayloadAction<boolean>) => {
      state.matchStart = action.payload;
    },
    setMatchFound: (state, action: PayloadAction<boolean>) => {
      state.matchFound = action.payload;
    },
    setMatchId: (state, action: PayloadAction<string>) => {
      state.matchId = action.payload;
    },
    setMatchTimer: (state, action: PayloadAction<NodeJS.Timeout | null>) => {
      state.matchTimer = action.payload;
    },
    setActionWait: (state, action: PayloadAction<number>) => {
      state.actionWait = action.payload;
    },
    setReady: (state, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    },
    setTargetReady: (state, action: PayloadAction<BangTargetReadt>) => {
      state.targetReady = action.payload;
    },
    setNowAction: (state, action: PayloadAction<IWillAction[]>) => {
      state.nowAction = [...action.payload];
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setActionModal: (state, action: PayloadAction<boolean>) => {
      state.actionModal = action.payload;
    },
  },
});

export const {
  setDataChannel,
  setMatchStart,
  setMatchFound,
  setMatchId,
  setMatchTimer,
  setActionWait,
  setReady,
  setTargetReady,
  setNowAction,
  setStep,
  setActionModal,
} = bangSlice.actions;

export default bangSlice.reducer;
