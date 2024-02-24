// visitedPageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  history: string[];
}

const initialState: CounterState = {
  history: [],
};

const visitedPageSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {
    setPageHistory: (state, action: PayloadAction<string>) => {
      console.log("셋!");
      state.history = [...state.history, action.payload];
    },
  },
});

export const { setPageHistory } = visitedPageSlice.actions;

export default visitedPageSlice.reducer;
