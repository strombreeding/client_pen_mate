// visitedPageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  visited: string[];
}

const initialState: CounterState = {
  visited: [],
};

const visitedPageSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {
    visit: (state, action: PayloadAction<string>) => {
      state.visited.push(action.payload);
    },
  },
});

export const { visit } = visitedPageSlice.actions;

export default visitedPageSlice.reducer;
