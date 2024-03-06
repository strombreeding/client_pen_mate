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

const Routers: React.FC = () => {
  useDisablePinchZoom();
  return (
    <BrowserRouter>
      <Routes>
        {/* 바텀네비스택 */}

        <Route path="/" element={<Main />} />
        <Route path="/ranking" element={<Main />} />
        <Route path="/store" element={<Main />} />
        <Route path="/profile" element={<Main />} />

        <Route path="/join" element={<Join />} />
        {/* <Route element={<PublicPage />}> */}
        {/* <Route path="/edit-avatar" element={<EditAvatar />} /> */}
        <Route path="/social/kakao" element={<SocialTerminel />} />

        {/* 게임 모음 */}
        <Route path="/games" element={<SelectGames />} />
        <Route path="/games/junkyard" element={<Junkyard />} />
        <Route path="/games/bang" element={<BangMain />} />
        <Route path="/games/tetris" element={<BangMain />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
