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

function Main() {
  const dispatch = useDispatch<AppDispatch>();
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
      {navType === "/ranking" && <Profile />}
      {navType === "/store" && <Profile />}
      {navType === "/profile" && <Profile />}

      <EmptyBox height={60} />
      <BottomNav />
    </Container>
  );
}

export default Main;
