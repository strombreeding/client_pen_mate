import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setPageHistory } from "../store/slices/visitedPage";

export const useVisitedPage = () => {
  window.sessionStorage.clear();
  const thisPage = window.location.pathname;
  const dispath = useDispatch<AppDispatch>();
  window.sessionStorage.setItem("history", thisPage + thisPage + thisPage);
  const pageHistory = window.sessionStorage;

  // const pageHistory = useSelector(
  //   (state: RootState) => state.visitedPage.history
  // );

  console.log(thisPage, pageHistory);
  // if (pageHistory.includes(thisPage)) {
  //   return true;
  // } else {
  //   dispath(setPageHistory(thisPage));
  //   return false;
  // }
  return true;
};
