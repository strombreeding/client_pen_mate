// visitedPageSlice.ts
import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { SignInFormData } from "../../types";
import { Dispatch, SetStateAction } from "react";

interface AppState {
  popup: boolean;
}

const initialState: AppState = {
  popup: false,
};

const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<boolean>) => {
      state.popup = action.payload;
    },
  },
});

export const { showPopup } = appState.actions;

export default appState.reducer;
