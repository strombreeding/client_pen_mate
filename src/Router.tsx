import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SocialTerminel from "./components/SocialTerminel";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import useDisablePinchZoom from "./hooks/disabledPinchZoom";
import EditAvatar from "./components/EditAvatar";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { SCREEN_HEIGHT } from "./configs/device";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const Routers: React.FC = () => {
  useDisablePinchZoom();

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인이 없어도 실행가능한 레터,  */}
        <Route path="/" element={<Login />} />
        <Route path="/social/kakao" element={<SocialTerminel />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/edit-avatar" element={<EditAvatar />} />
        {/* 로그인이 필요한것들, 매칭-AI서비스 */}
        <Route></Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
