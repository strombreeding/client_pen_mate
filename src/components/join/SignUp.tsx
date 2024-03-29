import { View } from "../../nativeView";
import { Text } from "../../assets/fontStyles";
import { Container, EmptyBox } from "../../styles";
import styled, { keyframes } from "styled-components";
import BottomNav from "../navigations/BottomNav";
import BottomPrevNext, { PrevBtn } from "../navigations/BottomPrevNext";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { imgSrc } from "../../assets/img";
import axios from "axios";
import { SERVER_URI } from "../../configs/server";
import { colors } from "../../assets/colors";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setEncryptedCookie } from "../../utils/cookies";
import { setInfomation, setLoginState } from "../../store/slices/userState";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { encrypt } from "../../utils/crypto";
import { setStorageCrypto } from "../../utils/localStorage";

const shake = keyframes`
  0% {
    transform: translateX(-12px);
  }
  25% {
    transform: translateX(12px);
  }
  50% {
    transform: translateX(-12px);
  }
  75% {
    transform: translateX(12px);
  }
  100% {
    transform: translateX(-12px);
  }
    
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  background-color: transparent;
  border-color: transparent;
  border-bottom-color: #c1c1c1;
  text-align: start;
  outline: none;
  caret-color: #c1c1c1;
  color: white;
  font-family: Roboto;
  font-size: 16px;
`;

const Form = styled.form<{ shake: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${(props) => (props.shake ? shake : {})} 0.25s linear;
  width: 100%;
  padding: 0px 30px 0px 30px;
`;

let cnt = 0;
function SignUp({ step }: { step: string }) {
  const [timer, setTimer] = useState<NodeJS.Timeout>(setTimeout(() => {}, 0));
  const [text, setText] = useState("");
  const [canNext, setCanNext] = useState(false);
  const [shake, setShake] = useState(false);
  const [errReason, setErrReason] = useState("");

  const oauthData = useLocation().state;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef(false);

  const joinReq = async () => {
    try {
      const res = await axios.post(SERVER_URI + "user/create", {
        ...oauthData,
        nickname: text,
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
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const req = async () => {
    if (text.length <= 0) return;

    const wasted = validateString(text);
    if (wasted) {
      setErrReason(wasted);
      setShake(true);
      return;
    }

    const res = await axios.get(SERVER_URI + "user/" + text);
    if (!res.data) {
      setShake(true);
      setErrReason("이미 존재하는 닉네임 입니다.");
    } else {
      if (!inputRef.current) return;
      passRef.current = true;
      setCanNext(true);
    }

    try {
    } catch (err: any) {
      setShake(true);
      setErrReason("서비스가 혼잡합니다. 잠시후에 시도해주세요.");
    }
  };

  useEffect(() => {
    setCanNext(false);
    passRef.current = false;
    const checkNick = setTimeout(() => {
      if (passRef.current === true) return;
      req();
    }, 800);
    setTimer(checkNick);

    return () => {
      clearTimeout(timer);
      clearTimeout(checkNick);
    };
  }, [text]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (text.length === 10) return;
    console.log(text === e.currentTarget.value);
    if (text === e.currentTarget.value) return;
    setText(e.currentTarget.value);
    setShake(false);
  };

  return (
    <Container style={{ flex: 1 }}>
      <EmptyBox height={20} />
      <Form ref={formRef} onSubmit={(e) => e.preventDefault()} shake={shake}>
        <Text.Spo_Medium_16>닉네임</Text.Spo_Medium_16>
        <Input
          ref={inputRef}
          type="text"
          maxLength={12}
          value={text}
          placeholder="닉네임을 입력해주세요."
          onChange={onChange}
          onBlur={(e) => {
            e.stopPropagation();
            console.log("실행", passRef.current);
            setCanNext(passRef.current);
            console.log("정료");
          }}
        />
        {text.length > 0 && (
          <View
            onClick={() => {
              setText("");
              setShake(false);
            }}
            style={{
              padding: 5,
              position: "absolute",
              right: 25,
              bottom: 3,
            }}
          >
            <img src={imgSrc.close} width={25} />
          </View>
        )}
      </Form>
      {shake ? (
        <View style={{ width: "100%", paddingLeft: 30, paddingTop: 10 }}>
          <Text.Regular_16 color="#F828B1">{errReason}</Text.Regular_16>
        </View>
      ) : (
        <EmptyBox height={26} />
      )}
      <EmptyBox height={60} />

      {canNext && (
        <PrevBtn
          onClick={() => {
            joinReq();
          }}
          style={{
            width: "90%",
            backgroundColor: colors.Main_Button1,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text.Spo_Light_18>완료</Text.Spo_Light_18>
        </PrevBtn>
      )}
      {!canNext && (
        <PrevBtn
          style={{
            width: "90%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text.Spo_Light_18>...</Text.Spo_Light_18>
        </PrevBtn>
      )}
    </Container>
  );
}

export default SignUp;

const validateString = (string: string) => {
  const koreanConsonants = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
    "ㄳ",
    "ㄵ",
    "ㄶ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅄ",
  ];

  let wasted: string | false = false;
  for (let i = 0; i < koreanConsonants.length; i++) {
    if (string.includes(koreanConsonants[i])) {
      wasted = "자음이 포함되어있습니다.";
      break;
    }
    if (string.includes(" ")) {
      wasted = "공백이 포함되어있습니다.";
      break;
    }
    if (string.length < 3) {
      wasted = "3음절 미만입니다.";
    }
  }
  return wasted;
};
