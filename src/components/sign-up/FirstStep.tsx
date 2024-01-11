import {
  Dispatch,
  Fragment,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import { Pressable, Section, TextInput } from "../../pages/SignUp";
import { EmptyBox, Text } from "../../styles";
import React from "react";
import PrimaryBtn from "../styles/PrimaryBtn";
import { SignInFormData } from "../../types";

const placeText = "노래하는감자고양이";

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
  const [placeHolder, setPlaceHolder] = useState(placeText);
  const [text, setText] = useState("");

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      goNext();
    }
  };
  const goNext = () => {
    setFormData((prev) => ({ ...prev, nickname: text }));
    setStep(1);
  };
  if (step !== 0) return <Fragment></Fragment>;
  return (
    <Fragment>
      <Section>
        <Text.Title3>뭐라고 불러드리면 될까요?</Text.Title3>
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

export default React.memo(FirstStep);
