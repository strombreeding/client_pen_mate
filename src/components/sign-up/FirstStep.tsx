import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { EmptyBox, Text, Wrap, colors } from "../../styles";
import React from "react";
import PrimaryBtn from "../designs/PrimaryBtn";
import Input from "../designs/Input";
import { FadeInSection } from "../../pages/Login";
import { useShowAnimation } from "../../hooks/getShowAnimation";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "../SimpleHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { editSignUpData, setStep } from "../../store/slices/signUp";
import StepIndicator from "../designs/StepIndicator";
import { devicePadding } from "../../utils/getDevicePadding";
import { IOS, MOBILE, SCREEN_HEIGHT } from "../../configs/device";
import styled from "styled-components";
interface IFirstStepProps {
  step: number;
}
const FirstStep: React.FC<IFirstStepProps> = ({ step }) => {
  const keyboardHeight = useSelector(
    (state: RootState) => state.appState.keyboardHeight
  );

  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.sighUp.formData);
  const dispatch = useDispatch<AppDispatch>();
  const showAnimation = useShowAnimation("FirstStep");
  const divRef = useRef<HTMLDivElement | null>(null);

  const receiveText = (text: string) => {
    dispatch(editSignUpData({ ...formData, nickname: text }));
  };
  const goNext = () => {
    if (formData.nickname.length === 0) {
      return;
    }
    if (formData.nickname.length > 12) {
      return;
    }
    navigate("/sign-up?step=1");
  };

  if (step !== 0) return <Fragment></Fragment>;
  return (
    <Wrap ref={divRef} style={{ padding: "0px 30px 0px 30px" }}>
      <FadeInSection isVisited={showAnimation}>
        <StepIndicator items={[0, 0, 0]} index={step} />
        <EmptyBox height={30} />
        <Text.Title3>뭐라고 불러드리면 될까요?</Text.Title3>
        <EmptyBox height={42} />
        <Input
          divRef={divRef}
          text={formData.nickname}
          autoFocus={true}
          maxLength={12}
          receiveText={receiveText}
          placeHolder={"냥냥펀치"}
          nextFunction={goNext}
        />
        <EmptyBox height={10} />
        <Text.Footnote
          color={formData.nickname.length > 12 ? colors.Red100 : colors.Grey600}
        >
          닉네임은 한글, 영어, 숫자 12자로만 입력가능해요.
        </Text.Footnote>

        {!MOBILE && <EmptyBox height={100} />}

        <PrimaryBtn
          exception={!MOBILE && true}
          style={{ bottom: MOBILE ? keyboardHeight + (IOS ? 40 : 20) : 0 }}
          onClick={goNext}
          state={
            formData.nickname.length === 0 || formData.nickname.length > 12
              ? "disabled"
              : "default"
          }
          // state={"default"}
          text={"다음"}
        />
      </FadeInSection>
    </Wrap>
  );
};

export default FirstStep;
