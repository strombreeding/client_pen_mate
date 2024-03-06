// visitedPageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  visitedPages: string[];
  pageState: string[]; // 최대 2개 length
}

const initialState: CounterState = {
  visitedPages: ["/"],
  pageState: ["", ""],
};

const visitedPageSlice = createSlice({
  name: "visit",
  initialState,
  reducers: {
    setVisitPage: (state, action: PayloadAction<string>) => {
      state.visitedPages = [...state.visitedPages, action.payload];
    },
    setPageState: (state, action: PayloadAction<string>) => {
      const prevPage = state.pageState[1];
      const nextPage = action.payload;
      state.pageState = [prevPage, nextPage];
    },
  },
});

export const { setVisitPage, setPageState } = visitedPageSlice.actions;

export default visitedPageSlice.reducer;
