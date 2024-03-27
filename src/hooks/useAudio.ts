import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";

export const useAudio = (src: string) => {
  const [newAudio, setNewAudio] = useState<HTMLAudioElement>(new Audio());
  const dispatch = useDispatch<AppDispatch>();
  const mute = useSelector((state: RootState) => state.appState.mute);
  useEffect(() => {
    const newAudio = new Audio(src);
    // newAudio.muted = mute;
    const asyncPlay = () => {
      console.log("플레이");
      setTimeout(() => {}, 200);
    };
    setNewAudio(newAudio);

    return () => {
      newAudio.removeEventListener("play", asyncPlay);
      if (newAudio) {
        newAudio.load(); // 오디오 리로드
      }
    };
  }, []);
  newAudio.muted = mute;
  // newAudio.load();
  return newAudio;
};
