import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Pressable, View } from "../nativeView";
import SoundPressable from "./designs/SoundPressable";
import { Text } from "../assets/fontStyles";
import { imgSrc } from "../assets/img";
import { setBgm, setMute } from "../store/slices/appState";
import { allBgm, allSfx } from "../assets/sound";
import { PrevBtn } from "./navigations/BottomPrevNext";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import styled from "styled-components";
import { EmptyBox } from "../styles";
import { colors } from "../assets/colors";
import { useAudio } from "../hooks/useAudio";
import Cookies from "js-cookie";

function AudioComponent() {
  const mute = useSelector((state: RootState) => state.appState.mute);
  const nowBgm = useSelector((state: RootState) => state.appState.bgm);
  const [modal, setModal] = useState(
    Cookies.get("mute") == undefined ? true : false
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const pressRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const audio = useAudio(nowBgm);
  // const audio = useAudio(allSfx.gun_fire);
  // console.log(audio.src);

  useEffect(() => {
    if (!audio || mute) return;

    audio.autoplay = true;
    if (audio.src !== nowBgm) {
      audio.src = nowBgm;
    }
    const handleEnded = () => {
      if (audio) {
        audio.currentTime = 0; // 재생 시간을 초기화하여 무한 재생을 구현합니다.
        setTimeout(() => {
          audio.play();
        }, 2000);
      }
    };

    // if (audio) {
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
    // }

    // return () => {};
  }, [nowBgm, mute]);

  const toUnMute = () => {
    dispatch(setMute(false));
    Cookies.set("mute", "false");
    // console.log("언뮽", audio.muted);
    audio.play();
    setModal(false);
  };

  const toMute = () => {
    dispatch(setMute(true));
    Cookies.set("mute", "true");
    // console.log("언뮽", audio.muted);
    audio.pause();
    setModal(false);
  };

  const muteToggle = () => {
    if (mute) {
      toUnMute();
    } else {
      toMute();
    }
  };

  return (
    <View style={{ position: "relative", backgroundColor: "blue" }}>
      <Pressable
        ref={pressRef}
        onClick={muteToggle}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 30,
          height: 30,
          zIndex: 10000,
        }}
      >
        <img src={!mute ? imgSrc.sound_un_mute : imgSrc.sound_mute} alt="" />
        <audio ref={audioRef}>
          <source src={nowBgm} />
        </audio>
      </Pressable>

      {modal && (
        <Pressable
          style={{
            position: "absolute",
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            padding: 30,
            backgroundColor: "#000000",
            zIndex: 100000,
            justifyContent: "center",
          }}
        >
          <Zzz>
            <Text.Light_16>Sound On?</Text.Light_16>
            <EmptyBox height={30} />
            <View style={{ flexDirection: "row" }}>
              <PrevBtn onClick={toMute}>
                <Text.Light_16>Off</Text.Light_16>
              </PrevBtn>
              <EmptyBox width={30} />
              <PrevBtn
                onClick={toUnMute}
                style={{ backgroundColor: colors.Pale_Puple }}
              >
                <Text.Light_16>On</Text.Light_16>
              </PrevBtn>
            </View>
          </Zzz>
        </Pressable>
      )}
    </View>
  );
}
const Zzz = styled(View)`
  padding: 30px;
  border-radius: 50px 50px 50px 50px;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px) contrast(60%);
  -webkit-backdrop-filter: blur(10px) contrast(60%);
`;
export default AudioComponent;
