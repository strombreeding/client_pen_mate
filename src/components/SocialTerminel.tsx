import axios from "axios";
import React, { useEffect } from "react";
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
    console.log(res);
    const resData = res.data.data;
    navigate(resData.result, {
      state: { id: resData.id, email: resData.email },
    });
    // if (res.data.data === "sign-up") {
    //   dispatch(setLoginState(true));
    //   navigate("/sign-up?step=0", { replace: true });
    // }
  };
  useEffect(() => {
    req();
  }, []);
  //   navigate("/", { replace: true });
  return <Container></Container>;
};

export default React.memo(SocialTerminel);
