import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URI } from "../configs/server";
import { Container } from "../styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setLoginState } from "../store/slices/userState";

const SocialTerminel: React.FC = () => {
  const location = useLocation();
  const URL = new URLSearchParams(location.search);
  const code = URL.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const req = async () => {
    const res = await axios.post(SERVER_URI + "social/oauth", { code });

    if (res.data.data === "sign-up") {
      dispatch(setLoginState(true));
      navigate("/sign-up?step=0", { replace: true });
    }
  };
  req();

  //   navigate("/", { replace: true });
  return <Container></Container>;
};

export default React.memo(SocialTerminel);
