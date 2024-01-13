import { Dispatch, Fragment, SetStateAction } from "react";
import { EmptyBox, Text, colors } from "../../styles";
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

interface IFirstStepProps {
  step: number;
}
const FirstStep: React.FC<IFirstStepProps> = ({ step }) => {
  const formData = useSelector((state: RootState) => state.sighUp.formData);
  const dispatch = useDispatch<AppDispatch>();
  const showAnimation = useShowAnimation("FirstStep");
  const navigate = useNavigate();

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
  const goBack = () => {
    navigate(-1);
  };
  if (step !== 0) return <Fragment></Fragment>;
  return (
    <Fragment>
      <SimpleHeader nowPage={step} goBack={goBack} />
      <EmptyBox height={50} />
      <FadeInSection
        isVisited={showAnimation}
        style={{ padding: "0px 30px 0px 30px" }}
      >
        <Text.Title3>뭐라고 불러드리면 될까요?</Text.Title3>
        <EmptyBox height={50} />
        <Input
          text={formData.nickname}
          autoFocus={true}
          maxLength={12}
          receiveText={receiveText}
          placeHolder={"냥냥펀치"}
          nextFunction={goNext}
        />
        <EmptyBox height={10} />
        {formData.nickname.length > 12 && (
          <Text.Footnote color={colors.Red100}>
            닉네임은 한글, 영어, 숫자 12자로만 입력가능해요.
          </Text.Footnote>
        )}
      </FadeInSection>
      <EmptyBox height={60} />
      <FadeInSection isVisited={showAnimation}>
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
    </Fragment>
  );
};

export default React.memo(FirstStep);
