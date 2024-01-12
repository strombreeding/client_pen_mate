import React, { memo, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { imgSrc } from "../assets/img";
import { Container, EmptyBox, FadeIn, FadeOut, Text, colors } from "../styles";
import { getOauthUrl } from "../apis/login/read";
import {
  unstable_HistoryRouter,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useShowAnimation } from "../hooks/getShowAnimation";

/* Styled-Components */

const Title = styled.img<{ show: boolean }>`
  margin-top: 256px;
  width: calc(100% * 0.722);
  font-size: 60px;
  font-weight: 900;
  /* animation: ${FadeIn} 1s ease-in-out; */
  animation: ${(props) => (!props.show ? {} : FadeIn)} 1s ease-in-out;
`;

const SocialLoginBtn = styled.div<{ bgColor?: string; color?: string }>`
  background-color: ${(props) =>
    props.bgColor == null ? "white" : props.bgColor};
  padding: 14px 30px 14px 30px;
  border: ${(props) => props.bgColor == null && "solid 1px #EFEFEF"};
  border-radius: 100px;
  width: calc(100% * 0.8333);
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.color == null ? "black" : props.color)};
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  flex-direction: row;
  display: flex;
`;

export const FadeInSection = styled.section<{ show: boolean }>`
  display: flex;
  width: 100%;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (!props.show ? {} : FadeIn)} 1s ease-in-out;
`;

const BtnIcon = styled.img`
  width: 20px;
  aspect-ratio: 1;
  margin-right: 10px;
`;

/* Compoent */
const Login = () => {
  const navigation = useNavigate();
  const showAnimation = useShowAnimation("Login");
  console.log(showAnimation, "LOGIN");
  const onClick =
    (platform: "kakao" | "google" | "facebook" | "apple") => async () => {
      const res = await getOauthUrl(platform);
      window.location.href = res;
      window.sessionStorage.setItem("Login", "1");
      // navigation(res);
    };

  return (
    <Container>
      <Title show={showAnimation} src={imgSrc.penMate} />
      <EmptyBox height={115} />
      <FadeInSection show={showAnimation}>
        <SocialLoginBtn bgColor="#FEE500" onClick={onClick("kakao")}>
          <BtnIcon src={imgSrc.kakao} />
          <Text.Headline color="#391B1B">카카오로 로그인</Text.Headline>
        </SocialLoginBtn>

        <SocialLoginBtn>
          <BtnIcon src={imgSrc.google} />
          <Text.Headline>구글로 로그인</Text.Headline>
        </SocialLoginBtn>

        <SocialLoginBtn bgColor="black" color="white">
          <BtnIcon src={imgSrc.apple} />
          <Text.Headline color={colors.White}>애플로 로그인</Text.Headline>
        </SocialLoginBtn>

        <EmptyBox height={17} />
        <Text.Subhead color={colors.Grey700}>도움이 필요하신가요?</Text.Subhead>
      </FadeInSection>
    </Container>
  );
};

export default Login;
