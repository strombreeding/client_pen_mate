import React from "react";
import { Container, EmptyBox, SafeArea, Wrap } from "../styles";
import FirstStep from "../components/sign-up/FirstStep";
import SecondStep from "../components/sign-up/SecondStep";
import ThirdStep from "../components/sign-up/ThirdStep";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setStep } from "../store/slices/signUp";
import { devicePadding } from "../utils/getDevicePadding";
import { useNavigate } from "react-router";
import SimpleHeader from "../components/SimpleHeader";

/* Component */
const SignUp: React.FC = () => {
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);
  const step = useSelector((state: RootState) => state.sighUp.step);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const goBack = () => {
    if (step > 0) {
      dispatch(setStep(step - 1));
    } else {
      navigate(-1);
    }
  };
  // const padding = devicePadding([40, 40], [250, 300]);

  return (
    <Container>
      <SimpleHeader goBack={goBack} />
      <EmptyBox height={40} />
      {step === 0 && <FirstStep step={step} />}
      {step === 1 && <SecondStep step={step} />}
      {step === 2 && <ThirdStep step={step} />}
    </Container>
  );
};

export default React.memo(SignUp);
