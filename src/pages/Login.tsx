import styled from "styled-components";
import { imgSrc } from "../assets/img";
import {
  Container,
  EmptyBox,
  FadeIn,
  FadeInPopup,
  FadeOutPopup,
  SafeArea,
  Text,
  Wrap,
  colors,
} from "../styles";
import { getOauthUrl } from "../apis/login/read";
import { useNavigate } from "react-router-dom";
import { useShowAnimation } from "../hooks/getShowAnimation";
import { devicePadding } from "../utils/getDevicePadding";
import { MOBILE, SCREEN_HEIGHT } from "../configs/device";
import Popup from "../components/designs/Popup";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { showModal, showPopup } from "../store/slices/appState";
import Modal from "../components/designs/Modal";

/* Styled-Components */

const Title = styled.div<{ isVisited: boolean }>`
  animation: ${(props) => (props.isVisited ? {} : FadeIn)} 1s ease-in-out;
  text-align: center;
`;
const SocialLoginBtn = styled.div<{ bgColor?: string; color?: string }>`
  background-color: ${(props) =>
    props.bgColor == null ? "white" : props.bgColor};
  padding: 14px 30px 14px 30px;
  border: ${(props) => props.bgColor == null && "solid 1px #EFEFEF"};
  border-radius: 100px;
  width: ${MOBILE ? "100%" : "320px"};
  /* width: calc(100% * 0.8333); */
  max-width: 320px;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.color == null ? "black" : props.color)};
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  flex-direction: row;
  display: flex;
`;

export const FadeInSection = styled.section<{ isVisited: boolean }>`
  display: flex;
  width: 100%;
  text-align: center;
  flex-direction: column;
  align-items: center;
  animation: ${(props) => (props.isVisited ? {} : FadeIn)} 1s ease-in-out;
`;

const BG = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
  cursor: pointer;
  animation: ${(props) => (props.show ? FadeInPopup : FadeOutPopup)} ease-in-out
    0.3s;
`;

const BtnIcon = styled.img`
  width: 20px;
  aspect-ratio: 1;
  margin-right: 10px;
`;

/* Compoent */
const Login = () => {
  const modalState = useSelector((state: RootState) => state.appState.modal);
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);

  const dispatch = useDispatch<AppDispatch>();
  const showAnimation = useShowAnimation("Login");
  const onClick =
    (platform: "kakao" | "google" | "facebook" | "apple") => async () => {
      // dispatch(showPopup(true));
      // return;
      const res = await getOauthUrl(platform);
      window.location.href = res;
      window.sessionStorage.setItem("Login", "1");
      // navigation(res);
    };
  // const unShowPopup = () => {
  //   setTimeout(() => {
  //     dispatch(showModal(false));
  //   }, 300);
  // };
  const padding = devicePadding([226, 0], [40, 0]);
  return (
    // <Container>
    <SafeArea safeArea={safeArea}>
      <Container>
        <div>{safeArea[0]}</div>
        <div>{safeArea[1]}</div>
        <Wrap
          style={{
            height: SCREEN_HEIGHT,
            padding,
          }}
        >
          <Title isVisited={showAnimation}>
            <Text.ChangwonDangamAsac
              style={{ textAlign: "center" }}
              color={colors.Red200}
            >
              Pen Mate
            </Text.ChangwonDangamAsac>
          </Title>
          <EmptyBox height={110} />
          <FadeInSection isVisited={showAnimation}>
            <SocialLoginBtn bgColor="#FEE500" onClick={onClick("kakao")}>
              <BtnIcon src={imgSrc.kakao} />
              <Text.Headline cursor="pointer" color="#391B1B">
                카카오로 로그인
              </Text.Headline>
            </SocialLoginBtn>

            <SocialLoginBtn>
              <BtnIcon src={imgSrc.google} />
              <Text.Headline cursor="pointer">구글로 로그인</Text.Headline>
            </SocialLoginBtn>

            <SocialLoginBtn bgColor="black" color="white">
              <BtnIcon src={imgSrc.apple} />
              <Text.Headline cursor="pointer" color={colors.White}>
                애플로 로그인
              </Text.Headline>
            </SocialLoginBtn>

            <EmptyBox height={5} />
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(showModal(true));
              }}
            >
              <Text.Subhead color={colors.Grey700}>
                도움이 필요하신가요?
              </Text.Subhead>
            </div>
          </FadeInSection>
          <EmptyBox height={52} width={100} />
        </Wrap>
        {/* {popupState && (
        <Popup
          title={"아바타 수정 나가기"}
          content={`수정하던 내용이 저장되지 않습니다.
          정말 나가시겠어요?`}
          leftText={"취소"}
          rightText={"나가기"}
          rightBtnAction={() => {
            alert("완료로직");
          }}
        />
      )} */}
        {modalState && (
          <Modal
            title={"로그인에 어려움이 있으신가요?"}
            content={"문제가 있으시다면\n하단 버튼을 눌러 문의를 남겨주세요."}
            leftText={""}
            rightText={"문의를 남길래요"}
            rightBtnAction={() => {
              dispatch(showModal(false));
              window.location.href = "https://naver.com";
            }}
          />
        )}
      </Container>
    </SafeArea>
  );
};

export default Login;
