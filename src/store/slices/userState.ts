// visitedPageSlice.ts
import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { SignInFormData } from "../../types";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import { getDecryptedCookie } from "../../utils/cookies";

interface IInfomation {
  nickname: string;
  energy: number;
  atataPoint: number;
  atataStone: number;
  id: string;
}
interface UserState {
  logedIn: boolean;
  infomation: IInfomation;
}

const initialState: UserState = {
  logedIn: false,
  infomation: {
    nickname: "",
    energy: 0,
    atataPoint: 0,
    atataStone: 0,
    id: "",
  },
};

const UserState = createSlice({
  name: "UserState",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.logedIn = action.payload;
    },
    setInfomation: (state, action: PayloadAction<IInfomation>) => {
      state.infomation = action.payload;
    },
  },
});

export const { setLoginState, setInfomation } = UserState.actions;

export default UserState.reducer;
