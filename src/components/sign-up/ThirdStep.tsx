import { Dispatch, Fragment, SetStateAction } from "react";
import { EmptyBox, Text, Wrap, colors } from "../../styles";
import React from "react";
import PrimaryBtn from "../designs/PrimaryBtn";
import { FadeInSection } from "../../pages/Login";
import { useShowAnimation } from "../../hooks/getShowAnimation";
import SimpleHeader from "../SimpleHeader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setStep } from "../../store/slices/signUp";
import StepIndicator from "../designs/StepIndicator";
import { MOBILE } from "../../configs/device";

const GenderView = styled.div`
  padding: 0px 20px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const GenderItem = styled.div<{ select: boolean }>`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 125px;
  border: 1.5px solid
    ${(props) => (props.select ? colors.Grey600 : colors.Grey100)};
  cursor: pointer;
`;
interface IThirdStepProps {
  step: number;
}
const ThirdStep: React.FC<IThirdStepProps> = ({ step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.sighUp.formData);
  const showAnimation = useShowAnimation("ThirdStep");
  const goNext = () => {
    alert("모달창 띄우기");
  };
  const goBack = () => {
    dispatch(setStep(step - 1));
  };
  if (step !== 2) return <Fragment></Fragment>;
  return (
    <Wrap style={{ justifyContent: "space-between" }}>
      <FadeInSection isVisited={showAnimation}>
        <Wrap style={{ justifyContent: "start" }}>
          <StepIndicator items={[0, 0, 0]} index={step} />
          <EmptyBox height={30} />
          <Text.Title2>
            {formData.nickname}님의
            <br />
            아바타를 꾸며주세요.
          </Text.Title2>
          <EmptyBox height={62} />
          <GenderView>
            <GenderItem
              onClick={() => {
                navigate("/edit-avatar");
              }}
              select={false}
            >
              <Text.Callout color={colors.Grey600}>img</Text.Callout>
            </GenderItem>
          </GenderView>
        </Wrap>
        {!MOBILE && <EmptyBox height={100} />}

        <PrimaryBtn onClick={goNext} state={"default"} text={"다음에 할게요"} />
      </FadeInSection>
    </Wrap>
  );
};

export default React.memo(ThirdStep);
