import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Container } from "../styles";
import { SignInFormData } from "../types";
import FirstStep from "../components/sign-up/FirstStep";
import SecondStep from "../components/sign-up/SecondStep";
import ThirdStep from "../components/sign-up/ThirdStep";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { editSignUpData } from "../store/slices/signUp";

/* Styled Components */

/* Component */
const SignUp: React.FC = () => {
  const step = useSelector((state: RootState) => state.sighUp.step);

  // const [formData, setFormData] = useState({
  //   nickname: "",
  //   agreement: false,
  //   avatar: "",
  //   gender: "기타",
  //   country: "",
  //   interested: [""],
  //   language: "",
  // } as SignInFormData);
  // const show = useShowAnimation("SignUp");

  return (
    // <SignUpContext.Provider value={{ formData, setFormData }}>
    <Container>
      {step === 0 && <FirstStep step={step} />}
      {step === 1 && <SecondStep step={step} />}
      {step === 2 && <ThirdStep step={step} />}
    </Container>
    // </SignUpContext.Provider>
  );
};

export default React.memo(SignUp);
