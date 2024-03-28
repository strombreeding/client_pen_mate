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
  atata_point: number | null;
  atata_stone: number | null;
  id: string;
}
interface UserState {
  logedIn: boolean;
  infomation: IInfomation;
}
const atata_point = Number(getStorageCrypto("atata_point"));
const atata_stone = Number(getStorageCrypto("atata_stone"));
const energy = Number(getStorageCrypto("energy"));

console.log("으아아아");
console.log(atata_point);
console.log(atata_stone);
console.log(energy);
console.log("####");
const initialState: UserState = {
  logedIn: false,
  infomation: {
    nickname: "",
    atata_point,
    atata_stone,
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
