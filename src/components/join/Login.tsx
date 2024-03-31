import styled from "styled-components";
import { View } from "../../nativeView";
import { MOBILE } from "../../configs/device";
import { Text } from "../../assets/fontStyles";
import { imgSrc } from "../../assets/img";
import { colors } from "../../assets/colors";
import { EmptyBox } from "../../styles";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setBgImg, setLoading } from "../../store/slices/appState";
import { getOauthUrl } from "../../apis/login/read";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setInfomation, setLoginState } from "../../store/slices/userState";
import { setStorageCrypto } from "../../utils/localStorage";
import { SERVER_URI } from "../../configs/server";

type SocialPlatform = "kakao" | "apple" | "google";
function Login({ step }: { step: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const onPress = useCallback(
    (platform: SocialPlatform) => async () => {
      // 예제 코드에서는 비동기 작업을 실행하는 것으로 보이지만 주석 처리되어 있습니다.
      const res = await getOauthUrl(platform);
      console.log(res);
      // navigation(res);
      window.location.href = res;

      // alert(`${platform} SDK 로그인`);
      // window.location.href = "/home";
      return true;
    },
    []
  );

  const adminLogin = async () => {
    const res = await axios.post(SERVER_URI + "user/admin", {
      id: 1234,
      email: "admin",
    });
    const resData = res.data;
    console.log(resData);
    dispatch(setLoginState(true));
    dispatch(
      setInfomation({
        id: resData.id,
        nickname: resData.nickname,
        atata_point: resData.atata_point,
        atata_stone: resData.atata_stone,
        energy: resData.energy,
      })
    );
    setStorageCrypto("atata_point", resData.atata_point);
    setStorageCrypto("atata_stone", resData.atata_stone);
    setStorageCrypto("energy", resData.energy);

    window.localStorage.setItem("at", resData.at);
    window.localStorage.setItem("rt", resData.rt);
    navigation("/");
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        position: "relative",
      }}
    >
      <View
        style={{ position: "fixed", top: 0, width: 100 }}
        onClick={adminLogin}
      >
        관리자 접속
      </View>
      <Text.Spo_Medium_20>소셜로그인 후 랭킹에 참여하세요</Text.Spo_Medium_20>
      <EmptyBox height={20} />
      <SocialLoginBtn onClick={onPress("kakao")} bgcolor="#FEE500">
        <BtnIcon src={imgSrc.kakao} />
        <Text.Spo_Medium_12 color="#391B1B">카카오로 로그인</Text.Spo_Medium_12>
      </SocialLoginBtn>
      {/* <SocialLoginBtn onClick={onPress("google")}>
        <BtnIcon src={imgSrc.google} />
        <Text.Spo_Medium_12 color="#000000">구글로 로그인</Text.Spo_Medium_12>
      </SocialLoginBtn>
      <SocialLoginBtn
        onClick={onPress("apple")}
        bgcolor="black"
        color="white"
        style={{ border: "1px solid", borderColor: colors.Grey500 }}
      >
        <BtnIcon src={imgSrc.apple} />
        <Text.Spo_Medium_12>애플로 로그인</Text.Spo_Medium_12>
      </SocialLoginBtn> */}
    </View>
  );
}

export default Login;

const BtnIcon = styled.img`
  width: 20px;
  aspect-ratio: 1;
  margin-right: 10px;
`;
const SocialLoginBtn = styled.div<{ bgcolor?: string; color?: string }>`
  background-color: ${(props) =>
    props.bgcolor == null ? "white" : props.bgcolor};
  padding: 14px 30px 14px 30px;
  border: ${(props) => props.bgcolor == null && "solid 1px #EFEFEF"};
  border-radius: 100px;
  width: ${MOBILE ? "100%" : "300px"};
  /* width: calc(100% * 0.8333); */
  max-width: 350px;
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
