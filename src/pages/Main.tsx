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
import { useEffect, useState } from "react";
import { setNavTab } from "../store/slices/appState";
import Store from "./Store";
import { useLocation } from "react-router-dom";
import Ranking from "./Ranking";
import BottomPrevNext, {
  PrevBtn,
} from "../components/navigations/BottomPrevNext";
import { Text } from "../assets/fontStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";

function Main() {
  const [give, setGive] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
      <View
        style={{
          width: SCREEN_WIDTH - 50,
          height: 30,
        }}
      >
        <PrevBtn onClick={() => setGive(true)}>
          <Text.SemiBold_24>🍺시-원한 맥주 사주기</Text.SemiBold_24>
        </PrevBtn>
      </View>
      {give && (
        <View
          style={{
            position: "absolute",
            top: "30%",
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 2,
            zIndex: 100000,
          }}
        >
          {!loaded && (
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Text.Light_24>로딩중...</Text.Light_24>
            </View>
          )}
          <iframe
            style={{ flex: 1, display: loaded ? "flex" : "none" }}
            src="https://www.buymeacoffee.com/jiny_tree"
            onLoad={() =>
              setTimeout(() => {
                setLoaded(true);
              }, 300)
            }
          />
          <View style={{ flexDirection: "row", width: "100% " }}>
            <PrevBtn
              onClick={() => {
                setGive(false);
                setLoaded(false);
              }}
            >
              <Text.Light_12>닫기</Text.Light_12>
            </PrevBtn>
          </View>
        </View>
      )}

      <EmptyBox height={60} />
      <BottomNav />
    </Container>
  );
}

export default Main;
