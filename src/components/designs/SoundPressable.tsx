import { useEffect, useRef, useState } from "react";
import { Pressable } from "../../nativeView";
import { allSfx } from "../../assets/sound";
import { PrevBtn } from "../navigations/BottomPrevNext";
import { useAudio } from "../../hooks/useAudio";

interface ISoundPressableProps {
  style?: React.CSSProperties;
  onClick?: (data?: any) => any;
  pressDownStyle?: React.CSSProperties;
  pressUpStyle?: React.CSSProperties;
  children?: React.ReactNode;
}
function SoundPressable({
  style,
  onClick,
  pressDownStyle,
  children,
}: ISoundPressableProps) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const audio = useAudio(allSfx.click);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener("click", () => audio.play());
    }
  }, []);
  const pressDown = () => {
    setIsPressed(true);
  };

  if (pressDownStyle == null) {
    pressDownStyle = {
      opacity: 0.5,
    };
  }
  const pressUp = () => {
    setIsPressed(false);
  };
  return (
    <PrevBtn
      ref={buttonRef}
      onClick={onClick}
      onTouchStart={pressDown}
      onMouseDown={pressDown}
      onTouchEnd={pressUp}
      onMouseUp={pressUp}
      style={isPressed ? pressDownStyle : style}
    >
      {children}
    </PrevBtn>
  );
}

export default SoundPressable;
