import HeaderHome from "../components/home/HeaderHome";
import { Container, EmptyBox } from "../styles";
import { Pressable, View } from "../nativeView";
import { imgSrc } from "../assets/img";
import BigGameBtn from "../components/designs/BigGameBtn";
import BottomNav from "../components/navigations/BottomNav";
import Profile from "./Profile";
import SelectGames from "./SelectGames";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { usePageState } from "../hooks/getVisitedPage";

function Main() {
  const navType = useSelector((state: RootState) => state.appState.navTab);
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
