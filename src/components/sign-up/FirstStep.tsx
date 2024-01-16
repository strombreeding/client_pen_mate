import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
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
import { MOBILE, SCREEN_HEIGHT } from "../../configs/device";
import styled from "styled-components";
const EmptySpace = styled.div<{ height: number }>`
  height: ${(props) => props.height} px;
  @keyframes smooth {
    from {
      height: 0px;
    }
    to {
      height: ${(props) => props.height};
    }
  }
  animation: smooth ease-in-out 2s;
`;
interface IFirstStepProps {
  step: number;
}
const FirstStep: React.FC<IFirstStepProps> = ({ step }) => {
  const [viewportHeight, setViewportHeight] = useState(SCREEN_HEIGHT);
  const formData = useSelector((state: RootState) => state.sighUp.formData);
  const dispatch = useDispatch<AppDispatch>();
  const showAnimation = useShowAnimation("FirstStep");
  useEffect(() => {
    const handleResize = () => {
      if (!MOBILE || !window.visualViewport) return;
      // 뷰포트 높이에서 창 높이를 뺀 값이 키보드의 높이일 수 있습니다.
      const newKeyboardHeight =
        window.innerHeight - window.visualViewport.height;

      // 키보드의 높이가 음수이면 키보드가 닫혔다는 것입니다.
      setViewportHeight(Math.max(0, newKeyboardHeight));
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러를 해제합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div>{viewportHeight}</div>
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
        <EmptySpace height={viewportHeight} />
      </FadeInSection>
    </Wrap>
  );
};

export default React.memo(FirstStep);
