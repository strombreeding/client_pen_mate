// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import visitedPageReducer from "./slices/visitedPage";
import signUpReducer from "./slices/signUp";
import appReducer from "./slices/appState";

const rootReducer = combineReducers({
  appState: appReducer,
  visted: visitedPageReducer,
  sighUp: signUpReducer,
  // 추가적인 리듀서들이 있다면 여기에 추가
});

export default rootReducer;
