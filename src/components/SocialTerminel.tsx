import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URI } from "../configs/server";
import { Container } from "../styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setInfomation, setLoginState } from "../store/slices/userState";
import { setStorageCrypto } from "../utils/localStorage";

const SocialTerminel: React.FC = () => {
  const location = useLocation();
  const URL = new URLSearchParams(location.search);
  const code = URL.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const req = async () => {
    const res = await axios.post(SERVER_URI + "social/oauth", { code });
    const resData = res.data.data;
    console.log(res);
    if (resData.result === "/join") {
      navigate(resData.result, {
        state: { id: resData.id, email: resData.email },
      });
    } else {
      console.log(resData);
      dispatch(setLoginState(true));
      dispatch(
        setInfomation({
          id: resData.result.id,
          nickname: resData.result.nickname,
          atata_point: resData.result.atata_point,
          atata_stone: resData.result.atata_stone,
          energy: resData.result.energy,
        })
      );
      setStorageCrypto("atata_point", resData.result.atata_point);
      setStorageCrypto("atata_stone", resData.result.atata_stone);
      setStorageCrypto("energy", resData.result.energy);
      window.localStorage.setItem("at", resData.result.at);
      window.localStorage.setItem("rt", resData.result.rt);
      navigate("/", { replace: true });
    }
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
