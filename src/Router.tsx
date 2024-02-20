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
import Home from "./pages/Home";
import SaChunSung from "./pages/SaChunSung";

const Routers: React.FC = () => {
  useDisablePinchZoom();
  return (
    <BrowserRouter>
      <Routes>
        {/* 바텀네비스택 */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ranking" element={<Home />} />
        <Route path="/store" element={<Home />} />
        <Route path="/profile" element={<Home />} />
        {/* <Route element={<PublicPage />}> */}
        {/* <Route path="/edit-avatar" element={<EditAvatar />} /> */}
        <Route path="/social/kakao" element={<SocialTerminel />} />
        <Route path="/games" element={<SaChunSung />} />
        {/* </Route> */}
        {/* 로그인이 필요한것들, 매칭-AI서비스 */}
        <Route></Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
