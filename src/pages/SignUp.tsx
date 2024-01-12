import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import styled from "styled-components";
import { Container, FadeIn } from "../styles";
import { SignInFormData } from "../types";
import { useNavigate } from "react-router-dom";
import FirstStep from "../components/sign-up/FirstStep";
import SecondStep from "../components/sign-up/SecondStep";
import { useShowAnimation } from "../hooks/getShowAnimation";

/* Styled Components */

/* Context */
interface ISignUpContext {
  formData: SignInFormData;
  setFormData: Dispatch<SetStateAction<SignInFormData>>;
}
export const SignUpContext = createContext<ISignUpContext>({
  formData: {} as SignInFormData,
  setFormData: () => {},
});

/* Component */
const SignUp: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nickname: "",
    agreement: false,
    avatar: "",
    gender: "E",
    country: "",
    interested: [""],
    language: "",
  } as SignInFormData);
  // const show = useShowAnimation("SignUp");
  const navigate = useNavigate();

  return (
    <SignUpContext.Provider value={{ formData, setFormData }}>
      <Container>
        {step === 0 && (
          <FirstStep step={step} setStep={setStep} setFormData={setFormData} />
        )}
        <SecondStep step={step} setStep={setStep} setFormData={setFormData} />
      </Container>
    </SignUpContext.Provider>
  );
};

export default React.memo(SignUp);
