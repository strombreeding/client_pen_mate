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
  modal: boolean;
  overFlow: boolean;
  keyboardHeight: number;
}

const initialState: AppState = {
  popup: false,
  modal: false,
  overFlow: false,
  keyboardHeight: 0,
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
    setOverFlow: (state, action: PayloadAction<boolean>) => {
      state.overFlow = action.payload;
    },
  },
});

export const { showPopup, showModal, editKeyboardHeight, setOverFlow } =
  appState.actions;

export default appState.reducer;
