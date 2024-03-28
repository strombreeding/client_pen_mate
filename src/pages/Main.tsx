import HeaderHome from "../components/home/HeaderHome";
import { Container, EmptyBox } from "../styles";
import { Pressable, View } from "../nativeView";
import { imgSrc } from "../assets/img";
import BigGameBtn from "../components/designs/BigGameBtn";
import BottomNav from "../components/navigations/BottomNav";
import Profile from "./Profile";
import SelectGames from "./SelectGames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { usePageState } from "../hooks/getVisitedPage";
import { useEffect } from "react";
import { setNavTab } from "../store/slices/appState";
import Store from "./Store";
import { useLocation } from "react-router-dom";
import Ranking from "./Ranking";

function Main() {
  const dispatch = useDispatch<AppDispatch>();
  // const location = useLocation().state.nav;
  const navType = useSelector((state: RootState) => state.appState.navTab);
  useEffect(() => {
    dispatch(setNavTab(window.location.pathname));
  }, []);
  const pageState = usePageState();

  return (
    <Container
      style={{
        position: "relative",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <HeaderHome />
      {navType === "/" && <BigGameBtn />}
      {navType === "/ranking" && <Ranking />}
      {navType === "/store" && <Store />}
      {navType === "/profile" && <Profile />}

      <EmptyBox height={60} />
      <BottomNav />
    </Container>
  );
}

export default Main;
