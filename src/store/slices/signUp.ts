// visitedPageSlice.ts
import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { SignInFormData } from "../../types";
import { Dispatch, SetStateAction } from "react";

interface SignUpState {
  formData: SignInFormData;
  step: number;
}

const initialState: SignUpState = {
  formData: {
    nickname: "",
    agreement: false,
    avatar: "",
    gender: "",
    country: "",
    interested: [""],
    language: "",
  },
  step: 0,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    editSignUpData: (state, action: PayloadAction<SignInFormData>) => {
      //   state.formData.push(action.payload);
      state.formData = { ...state.formData, ...action.payload };
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { editSignUpData, setStep } = signUpSlice.actions;

export default signUpSlice.reducer;
