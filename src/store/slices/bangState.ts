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
export type ActionType = "jump" | "stand" | "atk" | "walk";

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
  targetAvoidPath: number[];
  targetAtkPath: number[];
  // step: StepProps;
  step: number;
  gameStatus: StepProps;
  actionModal: boolean;
  aAction: ActionType;
  bAction: ActionType;
  round: number;
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
  targetAvoidPath: [-11, -11],
  targetAtkPath: [-11, -11],
  step: 0,
  gameStatus: "init",
  actionModal: false,
  aAction: "stand",
  bAction: "stand",
  round: 1,
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
    setTargetAvoidPath: (state, action: PayloadAction<number[]>) => {
      state.targetAvoidPath = [...action.payload];
    },
    setTargetAtkPath: (state, action: PayloadAction<number[]>) => {
      state.targetAtkPath = [...action.payload];
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setActionModal: (state, action: PayloadAction<boolean>) => {
      state.actionModal = action.payload;
    },
    setAAction: (state, action: PayloadAction<ActionType>) => {
      state.aAction = action.payload;
    },
    setBAction: (state, action: PayloadAction<ActionType>) => {
      state.bAction = action.payload;
    },
    setRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload;
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
  setTargetAvoidPath,
  setTargetAtkPath,
  setStep,
  setActionModal,
  setAAction,
  setBAction,
  setRound,
} = bangSlice.actions;

export default bangSlice.reducer;
