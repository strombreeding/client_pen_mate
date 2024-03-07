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

interface UserState {
  logedIn: boolean;
}

const initialState: UserState = {
  logedIn: getDecryptedCookie("chkin") ? true : false,
};

const UserState = createSlice({
  name: "UserState",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.logedIn = action.payload;
    },
  },
});

export const { setLoginState } = UserState.actions;

export default UserState.reducer;
