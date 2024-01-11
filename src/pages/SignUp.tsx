import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Container, EmptyBox, FadeIn, Text, colors } from "../styles";
import PrimaryBtn from "../components/styles/PrimaryBtn";
import { BtnStatus, SignInFormData } from "../types";
import { useNavigate } from "react-router-dom";
import FirstStep from "../components/sign-up/FirstStep";
import SecondStep from "../components/sign-up/SecondStep";

/* Styled Components */
export const Section = styled.section<{ btn?: boolean }>`
  padding: ${(props) => (!props.btn ? "121px 30px 0px 30px" : "none")};
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  animation: ${FadeIn} 0.7s ease-in-out;
`;

export const Pressable = styled.div`
  width: 100%;
  padding: 14px 30px 14px 30px;
  border: 1px solid ${colors.Grey200};
  border-radius: 20px;
  justify-content: center;
  flex-direction: row;
  display: flex;
`;
export const TextInput = styled.input`
  ${Text.Subhead}
  width: 20px;
  text-align: center;
  outline: none;
  border: 0px;
`;

/* Context */
interface ISignUpContext {
  formData: SignInFormData;
  setFormData: Dispatch<SetStateAction<SignInFormData>>;
}
export const SignUpContext = createContext<undefined | ISignUpContext>(
  undefined
);

/* Component */
const SignUp: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({} as SignInFormData);
  const navigate = useNavigate();

  // useEffect(() => {
  //   alert(step);
  // }, [step]);
  return (
    <SignUpContext.Provider value={{ formData, setFormData }}>
      <Container>
        <FirstStep step={step} setStep={setStep} setFormData={setFormData} />
        <SecondStep step={step} setStep={setStep} setFormData={setFormData} />
      </Container>
    </SignUpContext.Provider>
  );
};

export default React.memo(SignUp);
