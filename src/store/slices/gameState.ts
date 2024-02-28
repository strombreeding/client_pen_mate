// gameStateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameTitle =
  | "Cosmic Junkyard"
  | "Gravity WorkShop"
  | "Bang!"
  | "우주 고철장"
  | "중력 작업장"
  | "결투!"
  | undefined;
export type GamePlayer = "ai" | "2p" | "rank" | "bounties" | undefined;
export type MatchType = "regular" | "oneShot";
export type GameStatus = {
  gameTitle?: GameTitle;
  bet?: number;
  player?: GamePlayer;
  matchType?: MatchType;
};
interface GameState {
  status: GameStatus;
}

const initialState: GameState = {
  status: {
    gameTitle: undefined,
    player: undefined,
    bet: 0,
    matchType: "regular",
  },
};

const gameStateSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameStatus>) => {
      state.status = { ...state.status, ...action.payload };
    },
  },
});

export const { setGameState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
