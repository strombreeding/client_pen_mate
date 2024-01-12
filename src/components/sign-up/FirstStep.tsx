import {
  Dispatch,
  Fragment,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { SignUpContext } from "../../pages/SignUp";
import { EmptyBox, Text } from "../../styles";
import React from "react";
import PrimaryBtn from "../designs/PrimaryBtn";
import { SignInFormData } from "../../types";
import X_14 from "../designs/X_14";
import Input from "../designs/Input";
import { FadeInSection } from "../../pages/Login";
import { useShowAnimation } from "../../hooks/getShowAnimation";

interface IFirstStepProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<SignInFormData>>;
}
const FirstStep: React.FC<IFirstStepProps> = ({
  step,
  setStep,
  setFormData,
}) => {
  const context = useContext(SignUpContext);
  const showAnimation = useShowAnimation("FirstStep");
  const receiveText = (text: string) => {
    setFormData((prev) => ({ ...prev, nickname: text }));
  };
  const goNext = () => {
    if (context.formData.nickname.length === 0) {
      return;
    }
    setStep(1);
  };

  console.log("하이하이");
  if (step !== 0) return <Fragment></Fragment>;
  return (
    <Fragment>
      <FadeInSection
        show={showAnimation}
        style={{ padding: "50px 30px 0px 30px" }}
      >
        <Text.Title3>뭐라고 불러드리면 될까요?</Text.Title3>
        <EmptyBox height={40} />
        <Input
          maxLength={12}
          receiveText={receiveText}
          placeHolder={"냥냥펀치"}
        />
      </FadeInSection>
      <EmptyBox height={90} />
      <FadeInSection show={showAnimation}>
        <PrimaryBtn
          onClick={goNext}
          state={
            context.formData.nickname.length === 0 ? "disabled" : "default"
          }
          // state={"default"}
          text={"다음"}
        />
      </FadeInSection>
    </Fragment>
  );
};

export default React.memo(FirstStep);
