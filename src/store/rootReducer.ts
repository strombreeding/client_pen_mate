// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUp";
import userReducer from "./slices/userState";
import appReducer from "./slices/appState";
import gameReducer from "./slices/gameState";
import bangReducer from "./slices/bangState";

const rootReducer = combineReducers({
  appState: appReducer,
  userState: userReducer,
  sighUp: signUpReducer,
  gameState: gameReducer,
  bangState: bangReducer,
  // 추가적인 리듀서들이 있다면 여기에 추가
});

export default rootReducer;
