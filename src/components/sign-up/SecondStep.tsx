import {
  Dispatch,
  Fragment,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SignUpContext } from "../../pages/SignUp";
import { EmptyBox, Text } from "../../styles";
import React from "react";
import PrimaryBtn from "../designs/PrimaryBtn";
import { SignInFormData } from "../../types";
import Input from "../designs/Input";
import { FadeInSection } from "../../pages/Login";
import { useShowAnimation } from "../../hooks/getShowAnimation";

const placeText = "성별입력? 셀렉터? 버튼?";

interface ISecondStepProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<SignInFormData>>;
}
const SecondStep: React.FC<ISecondStepProps> = ({
  step,
  setStep,
  setFormData,
}) => {
  const [placeHolder, setPlaceHolder] = useState(placeText);
  const [text, setText] = useState("");
  const context = useContext(SignUpContext);
  const showAnimation = useShowAnimation("SecondStep");
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      goNext();
    }
  };
  const goNext = () => {
    setFormData((prev) => ({ ...prev, gender: "M" }));
    alert("이 다음엔 다음스탭으로~");
    // setStep(2);
  };
  if (step !== 1) return <Fragment></Fragment>;
  return (
    <Fragment>
      <FadeInSection show={showAnimation}>
        <Text.Title3>
          {context?.formData.nickname}님의
          {"\n"}성별을 선택해주세요.
        </Text.Title3>
        <EmptyBox height={40} />
      </FadeInSection>
      <EmptyBox height={90} />
      <FadeInSection show={showAnimation}>
        <PrimaryBtn
          onClick={goNext}
          state={text.length < 1 ? "disabled" : "default"}
          text={"다음"}
        />
      </FadeInSection>
    </Fragment>
  );
};

export default React.memo(SecondStep);
