import { Dispatch, Fragment, SetStateAction } from "react";
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
import { MOBILE } from "../../configs/device";

interface IFirstStepProps {
  step: number;
}
const FirstStep: React.FC<IFirstStepProps> = ({ step }) => {
  const formData = useSelector((state: RootState) => state.sighUp.formData);
  const dispatch = useDispatch<AppDispatch>();
  const showAnimation = useShowAnimation("FirstStep");

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
    dispatch(setStep(1));
  };

  if (step !== 0) return <Fragment></Fragment>;
  return (
    <Wrap style={{ justifyContent: "space-between" }}>
      <FadeInSection isVisited={showAnimation}>
        <Wrap style={{ justifyContent: "start" }}>
          <StepIndicator items={[0, 0, 0]} index={step} />
          <EmptyBox height={30} />
          <Text.Title3>뭐라고 불러드리면 될까요?</Text.Title3>
          <EmptyBox height={42} />
          <Input
            text={formData.nickname}
            autoFocus={true}
            maxLength={12}
            receiveText={receiveText}
            placeHolder={"냥냥펀치"}
            nextFunction={goNext}
          />
          <EmptyBox height={10} />
          <Text.Footnote
            color={
              formData.nickname.length > 12 ? colors.Red100 : colors.Grey600
            }
          >
            닉네임은 한글, 영어, 숫자 12자로만 입력가능해요.
          </Text.Footnote>
        </Wrap>
        {!MOBILE && <EmptyBox height={100} />}

        <PrimaryBtn
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

export default React.memo(FirstStep);
