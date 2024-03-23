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
import { decrypt, encrypt } from "../../utils/crypto";
import { getStorageCrypto } from "../../utils/localStorage";

interface IInfomation {
  nickname: string;
  energy: number | null;
  atataPoint: number | null;
  atataStone: number | null;
  id: string;
}
interface UserState {
  logedIn: boolean;
  infomation: IInfomation;
}
const atataPoint = Number(getStorageCrypto("atataPoint"));
const atataStone = Number(getStorageCrypto("atataStone"));
const energy = Number(getStorageCrypto("energy"));

console.log("으아아아");
console.log(atataPoint);
console.log(atataStone);
console.log(energy);
console.log("####");
const initialState: UserState = {
  logedIn: false,
  infomation: {
    nickname: "",
    atataPoint,
    atataStone,
    energy,
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
      state.infomation = { ...state.infomation, ...action.payload };
    },
  },
});

export const { setLoginState, setInfomation } = UserState.actions;

export default UserState.reducer;
