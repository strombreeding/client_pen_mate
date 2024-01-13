// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import visitedPageReducer from "./slices/visitedPage";
import signUpReducer from "./slices/signUp";

const rootReducer = combineReducers({
  visted: visitedPageReducer,
  sighUp: signUpReducer,
  // 추가적인 리듀서들이 있다면 여기에 추가
});

export default rootReducer;
