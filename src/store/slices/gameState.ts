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
export interface GameStatus {
  gameTitle?: GameTitle;
  player?: GamePlayer;
  matchType?: string;
  aiOption?: string;
}
interface GameState {
  status: GameStatus;
  selectState: "move" | "choice";
}

const initialState: GameState = {
  status: {
    gameTitle: undefined,
    player: undefined,
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
