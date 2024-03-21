import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";

export const useAudio = (src: string) => {
  const [newAudio, setNewAudio] = useState<HTMLAudioElement>(new Audio());
  const dispatch = useDispatch<AppDispatch>();
  const mute = useSelector((state: RootState) => state.appState.mute);
  newAudio.muted = mute;
  useEffect(() => {
    const newAudio = new Audio(src);
    // newAudio.muted = mute;
    setNewAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.load(); // 오디오 리로드
      }
    };
  }, []);

  return newAudio;
};
