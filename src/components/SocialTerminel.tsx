import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URI } from "../configs/server";

const SocialTerminel: React.FC = () => {
  const location = useLocation();
  const URL = new URLSearchParams(location.search);
  const code = URL.get("code");
  const navigate = useNavigate();
  console.log(code);
  const req = async () => {
    const res = await axios.post(SERVER_URI + "social/oauth", { code });
    console.log(res.data.data);
    if (res.data.data === "sign-up") {
      console.log("움직여 ㅅㅂ럼아");
      navigate("/sign-up", { replace: true });
    }
  };
  req();

  //   navigate("/", { replace: true });
  return <></>;
};

export default React.memo(SocialTerminel);
