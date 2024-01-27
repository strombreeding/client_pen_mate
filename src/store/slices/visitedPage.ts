// visitedPageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  visited: string[];
  history: string[];
}

const initialState: CounterState = {
  visited: [],
  history: ["", ""],
};

const visitedPageSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {
    visit: (state, action: PayloadAction<string>) => {
      state.visited.push(action.payload);
    },
    setHistory: (state, action: PayloadAction<[string, string]>) => {
      state.history = action.payload;
    },
  },
});

export const { visit } = visitedPageSlice.actions;

export default visitedPageSlice.reducer;
