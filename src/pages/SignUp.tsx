import React, { useEffect } from "react";
import { Container, EmptyBox } from "../styles";
import FirstStep from "../components/sign-up/FirstStep";
import SecondStep from "../components/sign-up/SecondStep";
import ThirdStep from "../components/sign-up/ThirdStep";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setStep } from "../store/slices/signUp";
import { useNavigate } from "react-router";
import SimpleHeader from "../components/SimpleHeader";
import { MOBILE } from "../configs/device";
import { useParams, useMatch, Route } from "react-router-dom";
export const getURLParams = (search: string, type?: "string" | "number") => {
  const urlParams = new URLSearchParams(window.location.search);
  const specificParamValue = urlParams.get(search);
  if (specificParamValue == null) return -1;
  if (type === "number") {
    return Number(specificParamValue);
  }
  return specificParamValue;
};
/* Component */
const SignUp: React.FC = () => {
  const params = getURLParams("step", "number");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <SimpleHeader goBack={goBack} />
      {MOBILE && <EmptyBox height={40} />}

      {params == 0 && <FirstStep step={params} />}
      {params == 1 && <SecondStep step={params} />}
      {params == 2 && <ThirdStep step={params} />}
    </Container>
  );
};

export default React.memo(SignUp);
