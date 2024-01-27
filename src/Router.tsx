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
import Login from "./pages/Login";
import SocialTerminel from "./components/SocialTerminel";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import useDisablePinchZoom from "./hooks/disabledPinchZoom";
import EditAvatar from "./components/EditAvatar";
import Background from "./pages/Background";
import PublicPage from "./routes/PublicPage";
import Home from "./pages/Home";
import SaChunSung from "./pages/SaChunSung";

const Routers: React.FC = () => {
  useDisablePinchZoom();
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인이 없어도 실행가능한 레터,  */}
        {/* <Route element={<PublicPage />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/edit-avatar" element={<EditAvatar />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/social/kakao" element={<SocialTerminel />} />
        <Route path="/sign-up" element={<SignUp />} />
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
