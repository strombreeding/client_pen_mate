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
  if (specificParamValue == null) return null;
  if (type === "number") {
    return Number(specificParamValue);
  }
  return specificParamValue;
};
/* Component */
const SignUp: React.FC = () => {
  const params = getURLParams("step", "number");
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);
  const formData = useSelector((state: RootState) => state.sighUp.formData);
  const step = useSelector((state: RootState) => state.sighUp.step);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const goBack = () => {
    if (step > 0) {
      dispatch(setStep(step - 1));
      navigate(-1);
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {}, []);
  // const padding = devicePadding([40, 40], [250, 300]);
  return (
    <Container>
      <SimpleHeader goBack={goBack} />
      {MOBILE && <EmptyBox height={40} />}

      {/* {step == 0 && <FirstStep step={step} />}
      {step == 1 && <SecondStep step={step} />}
      {step == 2 && <ThirdStep step={step} />} */}
      {params == 0 && <FirstStep step={step} />}
      {params == 1 && <SecondStep step={step} />}
      {params == 2 && <ThirdStep step={step} />}
    </Container>
  );
};

export default React.memo(SignUp);
