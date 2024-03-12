// visitedPageSlice.ts
import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { NavTab, SignInFormData } from "../../types";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import { allBgm } from "../../assets/sound";

interface AppState {
  popup: boolean;
  modal: boolean;
  keyboardHeight: number;
  safeArea: number[];
  navTab: string;
  canPopstateEvent: string | undefined;
  bgImg: string | undefined;
  loading: boolean;
  canScroll: boolean;
  bgm: string;
  mute: boolean;
}

const initialState: AppState = {
  popup: false,
  modal: false,
  keyboardHeight: 0,
  safeArea: [0, 0],
  navTab: window.location.pathname,
  canPopstateEvent: Cookies.get("canPopstate"),
  bgImg: undefined,
  loading: false,
  canScroll: true,
  bgm: allBgm.home,
  mute: Cookies.get("mute") === "false" ? false : true,
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

    setCanPopstateEvent: (state, action: PayloadAction<string | undefined>) => {
      state.canPopstateEvent = action.payload;
    },

    setBgImg: (state, action: PayloadAction<string | undefined>) => {
      state.bgImg = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCanScroll: (state, action: PayloadAction<boolean>) => {
      state.canScroll = action.payload;
    },

    setBgm: (state, action: PayloadAction<string>) => {
      state.bgm = action.payload;
    },

    setMute: (state, action: PayloadAction<boolean>) => {
      state.mute = action.payload;
    },
  },
});

export const {
  showPopup,
  showModal,
  editKeyboardHeight,
  setSafeArea,
  setNavTab,
  setCanPopstateEvent,
  setBgImg,
  setLoading,
  setCanScroll,
  setBgm,
  setMute,
} = appState.actions;

export default appState.reducer;
