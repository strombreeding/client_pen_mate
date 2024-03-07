import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
  useNavigation,
  useNavigationType,
} from "react-router-dom";
import SocialTerminel from "./components/SocialTerminel";
import NotFound from "./pages/NotFound";
import useDisablePinchZoom from "./hooks/disabledPinchZoom";
import Background from "./pages/Background";
import PublicPage from "./routes/PublicPage";
import Main from "./pages/Main";
import Junkyard from "./pages/Junkyard";
import SelectGames from "./pages/SelectGames";
import Join from "./pages/Join";
import BangMain from "./pages/BangMain";
import Reward from "./pages/Reward";
import PrivatePage from "./routes/PrivatePage";

const Routers: React.FC = () => {
  useDisablePinchZoom();
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인이 필요한 페이지 */}
        <Route element={<PrivatePage />}>
          <Route path="/" element={<Main />} />
          <Route path="/ranking" element={<Main />} />
          <Route path="/store" element={<Main />} />
          <Route path="/profile" element={<Main />} />

          {/* 게임 모음 */}
          <Route path="/games" element={<SelectGames />} />
          <Route path="/games/junkyard" element={<Junkyard />} />
          <Route path="/games/bang" element={<BangMain />} />
          <Route path="/games/tetris" element={<BangMain />} />
          <Route path="/games/reward" element={<Reward />} />
        </Route>

        {/* 로그인 시 접근이 불가능한 페이지 */}
        <Route element={<PublicPage />}>
          {/* <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Join />} />
          <Route path="/social/kakao" element={<SocialTerminel />} />
        </Route>

        {/* <Route element={<PublicPage />}> */}
        {/* <Route path="/edit-avatar" element={<EditAvatar />} /> */}

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
