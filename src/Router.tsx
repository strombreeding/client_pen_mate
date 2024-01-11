import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const Routers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인이 없어도 실행가능한 레터,  */}
        <Route path="/" element={<Login />} />

        {/* 로그인이 필요한것들, 매칭-AI서비스 */}
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
