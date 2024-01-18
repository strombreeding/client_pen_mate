import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useState,
} from "react";
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
import { editSignUpData, setStep } from "../../store/slices/signUp";
import StepIndicator from "../designs/StepIndicator";
import { IOS, MOBILE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";

const GenderView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const GenderItem = styled.div<{ select: boolean }>`
  width: ${SCREEN_WIDTH * 0.22222278}px;
  height: ${SCREEN_WIDTH * 0.22222278}px;
  max-width: 100px;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 125px;
  border: 1.5px solid
    ${(props) => (props.select ? colors.Grey600 : colors.Grey100)};
  cursor: pointer;
`;
interface ISecondStepProps {
  step: number;
}
const SecondStep: React.FC<ISecondStepProps> = ({ step }) => {
  const showAnimation = useShowAnimation("SecondStep");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.sighUp.formData);
  const [select, setSelect] = useState(formData.gender);

  const genderTypes: Array<"여자" | "남자" | "기타"> = ["여자", "남자", "기타"];
  const goNext = () => {
    if (select.length < 1) {
      return;
    }
    dispatch(setStep(step + 1));
    navigate(`/sign-up?step=2`);
  };
  if (step !== 1) return <Fragment></Fragment>;
  return (
    <Wrap style={{ padding: "0px 20px 0px 20px" }}>
      <FadeInSection isVisited={showAnimation}>
        <StepIndicator items={[0, 0, 0]} index={step} />

        <EmptyBox height={30} />

        <Text.Title2>
          {formData.nickname}님의
          <br />
          성별을 선택해주세요.
        </Text.Title2>

        <EmptyBox height={44} />

        <GenderView>
          {genderTypes.map((item, index) => {
            return (
              <GenderItem
                onClick={() => {
                  setSelect(item);
                  dispatch(editSignUpData({ ...formData, gender: item }));
                }}
                key={index}
                select={select === item}
                style={{ margin: index === 1 ? "0px 10px 0px 10px" : "" }}
              >
                <div
                  style={{ width: 38, height: 38, backgroundColor: "grey" }}
                />
                <Text.Footnote>{item}</Text.Footnote>
              </GenderItem>
            );
          })}
        </GenderView>

        {!MOBILE && <EmptyBox height={100} />}

        <PrimaryBtn
          exception={!MOBILE && true}
          style={{ bottom: MOBILE && IOS ? 40 : 20 }}
          onClick={goNext}
          state={select.length < 1 ? "disabled" : "default"}
          text={"다음"}
        />
      </FadeInSection>
    </Wrap>
  );
};

export default React.memo(SecondStep);
