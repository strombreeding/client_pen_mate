import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setPageState, setVisitPage } from "../store/slices/visitedPage";
import { useEffect, useState } from "react";
import { setCanPopstateEvent } from "../store/slices/appState";
import Cookies from "js-cookie";

export const useVisitedPage = () => {
  const path = window.location.pathname;
  const cookieName = "history";
  const cookie = JSON.parse(Cookies.get(cookieName)!);
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

export const usePageState = (zz?: boolean) => {
  const cookieName = "history";
  const path = window.location.pathname;
  const cookie = JSON.parse(Cookies.get(cookieName)!);
  if (cookie[1] === path) return;
  cookie[0] = cookie[1];
  cookie[1] = path;
  Cookies.set(cookieName, JSON.stringify(cookie));
  console.log(cookie);
  return cookie;
};

export const useAuthVisitPage = () => {
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const navigation = useNavigate();
  useEffect(() => {
    // if (gameState.gameTitle === undefined) {
    //   navigation("/games");
    // }
  }, []);
};
