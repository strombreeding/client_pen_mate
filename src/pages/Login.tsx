import styled from "styled-components";
import { imgSrc } from "../assets/img";
import { Container, EmptyBox, FadeIn, Text, Wrap, colors } from "../styles";
import { getOauthUrl } from "../apis/login/read";
import { useShowAnimation } from "../hooks/getShowAnimation";
import { devicePadding } from "../utils/getDevicePadding";
import { MOBILE, SCREEN_HEIGHT } from "../configs/device";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { showModal } from "../store/slices/appState";
import Modal from "../components/designs/Modal";
import HeartBounce from "../components/animations/HeartBounce";

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
  opacity: 0.8;
`;

export const FadeInSection = styled.section<{ isVisited: boolean }>`
  display: flex;
  width: 100%;
  text-align: center;
  flex-direction: column;
  align-items: center;
  animation: ${(props) => (props.isVisited ? {} : FadeIn)} 0.2s ease-in-out;
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
      const res = await getOauthUrl(platform);
      window.location.href = res;
      window.sessionStorage.setItem("Login", "1");
    };

  const padding = devicePadding([226, 0], [40, 0]);
  return (
    // <Container>
    <Container>
      <Wrap
        style={{
          height: SCREEN_HEIGHT,
          padding,
        }}
      >
        <HeartBounce vis={true} />
        <Title isVisited={showAnimation}>
          <Text.ChangwonDangamAsac
            style={{ textAlign: "center" }}
            color={colors.White}
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

          <SocialLoginBtn
            bgColor="black"
            color="white"
            style={{ border: "1px solid", borderColor: colors.Grey500 }}
          >
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
            <Text.Subhead color={colors.Grey300}>
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
  );
};

export default Login;
