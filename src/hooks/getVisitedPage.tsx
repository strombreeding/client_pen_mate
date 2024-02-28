import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setPageState, setVisitPage } from "../store/slices/visitedPage";
import { useEffect } from "react";
import { setCanPopstateEvent } from "../store/slices/appState";

export const useVisitedPage = () => {
  const path = window.location.pathname;
  const dispath = useDispatch<AppDispatch>();
  const visitedPages = useSelector(
    (state: RootState) => state.visitedPage.visitedPages
  );
  if (visitedPages.includes(path)) {
    return true;
  } else {
    return false;
  }
};

export const usePageState = (canPopState?: boolean) => {
  if (canPopState == null) canPopState = true;

  const dispatch = useDispatch<AppDispatch>();

  const path = window.location.pathname;
  const storageData = window.localStorage.getItem("history");
  const history = storageData ? JSON.parse(storageData) : ["/", path];

  const reduxHistory = useSelector(
    (state: RootState) => state.visitedPage.pageState
  );
  // console.log("시발", reduxHistory);
  // console.log(history);
  if (history[1] === path) return history;

  history[0] = history[1];
  history[1] = path;
  window.localStorage.setItem("history", JSON.stringify(history));

  // dispatch(setPageState(path));
  if (!canPopState) {
    dispatch(setCanPopstateEvent(false));
  }
  return history;
};

export const useAuthVisitPage = () => {
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const navigation = useNavigate();
  useEffect(() => {
    if (gameState.gameTitle === undefined) {
      navigation("/games");
    }
  }, []);
};
