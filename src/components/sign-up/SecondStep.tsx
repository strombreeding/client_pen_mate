import {
  Dispatch,
  Fragment,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  Pressable,
  Section,
  SignUpContext,
  TextInput,
} from "../../pages/SignUp";
import { EmptyBox, Text } from "../../styles";
import React from "react";
import PrimaryBtn from "../styles/PrimaryBtn";
import { SignInFormData } from "../../types";

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
      <Section>
        <Text.Title3>
          {context?.formData.nickname}님의
          {"\n"}성별을 선택해주세요.
        </Text.Title3>
        <EmptyBox height={40} />
        <Pressable>
          <TextInput
            type="text"
            placeholder={placeHolder}
            maxLength={14}
            onFocus={() => {
              console.log("포커스!!");
              setPlaceHolder("");
            }}
            defaultValue={text}
            onBlur={(e) => {
              if (e.currentTarget.value.length === 0) {
                setPlaceHolder(placeText);
              }
              onChangeText(e);
            }}
            onChange={onChangeText}
            onKeyDown={handleKeyDown}
          />
        </Pressable>
      </Section>
      <EmptyBox height={90} />
      <Section btn={true}>
        <PrimaryBtn
          onClick={goNext}
          state={text.length < 1 ? "disabled" : "default"}
          text={"다음"}
        />
      </Section>
    </Fragment>
  );
};

export default React.memo(SecondStep);
