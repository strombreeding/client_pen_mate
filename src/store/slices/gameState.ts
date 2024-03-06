// gameStateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameTitle =
  | "Cosmic Junkyard"
  | "Gravity WorkShop"
  | "Bang!"
  | "고철장"
  | "작업장"
  | "결투!"
  | undefined;
export type GamePlayer = string | undefined;
export type GameStatus = {
  gameTitle?: GameTitle;
  cost?: number;
  player?: GamePlayer;
  matchType?: string;
  aiOption?: string;
};
interface GameState {
  status: GameStatus;
  selectState: "move" | "choice";
}

const initialState: GameState = {
  status: {
    gameTitle: undefined,
    player: undefined,
    cost: 0,
    matchType: "regular",
  },
  selectState: "move",
};

const gameStateSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameStatus>) => {
      state.status = { ...state.status, ...action.payload };
    },

    setGameSelectState: (state, action: PayloadAction<"move" | "choice">) => {
      state.selectState = action.payload;
    },
  },
});

export const { setGameState, setGameSelectState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
