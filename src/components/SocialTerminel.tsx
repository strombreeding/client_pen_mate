import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URI } from "../configs/server";
import { Container } from "../styles";

const SocialTerminel: React.FC = () => {
  const location = useLocation();
  const URL = new URLSearchParams(location.search);
  const code = URL.get("code");
  const navigate = useNavigate();

  const req = async () => {
    const res = await axios.post(SERVER_URI + "social/oauth", { code });

    if (res.data.data === "sign-up") {
      navigate("/sign-up?step=0", { replace: true });
    }
  };
  req();

  //   navigate("/", { replace: true });
  return <Container></Container>;
};

export default React.memo(SocialTerminel);
