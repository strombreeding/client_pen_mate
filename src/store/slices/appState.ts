// visitedPageSlice.ts
import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { NavTab, SignInFormData } from "../../types";
import { Dispatch, SetStateAction } from "react";

interface AppState {
  popup: boolean;
  modal: boolean;
  keyboardHeight: number;
  safeArea: number[];
  navTab: string;
}

const initialState: AppState = {
  popup: false,
  modal: false,
  keyboardHeight: 0,
  safeArea: [0, 0],
  navTab: window.location.pathname,
};

const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<boolean>) => {
      state.popup = action.payload;
    },
    showModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    editKeyboardHeight: (state, action: PayloadAction<number>) => {
      state.keyboardHeight = action.payload;
    },
    setSafeArea: (state, action: PayloadAction<number[]>) => {
      state.safeArea = [...action.payload];
    },

    setNavTab: (state, action: PayloadAction<string>) => {
      state.navTab = action.payload;
    },
  },
});

export const {
  showPopup,
  showModal,
  editKeyboardHeight,
  setSafeArea,
  setNavTab,
} = appState.actions;

export default appState.reducer;
