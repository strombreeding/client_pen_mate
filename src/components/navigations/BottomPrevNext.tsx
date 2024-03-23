import styled, { CSSProperties } from "styled-components";
import { Text } from "../../assets/fontStyles";
import { Pressable, View } from "../../nativeView";
import { EmptyBox } from "../../styles";
import BottomLayer from "./BottomLayer";
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setCanPopstateEvent } from "../../store/slices/appState";
import { usePageState } from "../../hooks/getVisitedPage";
import { useEffect, useRef, useState } from "react";
import { allSfx } from "../../assets/sound";
import { useAudio } from "../../hooks/useAudio";

export const PrevBtn = styled(Pressable)`
  flex: 1;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  padding: 16px 12px 17px 11px;
  min-height: 60px;
  /* height: 60px; */
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px) contrast(90%);
  -webkit-backdrop-filter: blur(10px) contrast(60%);
`;

function BottomPrevNext({
  style,
  visible,
  prevText,
  nextText,
  nextAction,
  prevAction,
  justHome,
  rightBtnColor,
}: {
  style?: React.CSSProperties;
  visible: boolean;
  prevText?: string;
  nextText?: string;
  nextAction?: () => void;
  prevAction?: () => void;
  justHome?: boolean;
  rightBtnColor?: string;
}) {
  const [nextBtnClick, setNextBtnClick] = useState(false);
  const [prevBtnClick, setPrevBtnClick] = useState(false);
  const navigate = useNavigate();
  const pageState = usePageState();
  const dispatch = useDispatch<AppDispatch>();
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const nextAudio = useAudio(allSfx.click);
  const prevAudio = useAudio(allSfx.back);

  if (prevAction == null) {
    prevAction = function () {
      prevAudio.play();
      setTimeout(() => {
        window.history.back();
      }, 150);
    };
  }
  if (prevText == null) prevText = "이전";
  if (nextText == null) nextText = "스토어";

  const goHome = () => {
    prevAudio.load();
    prevAudio.play();
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 150);
  };

  const pressDown = (type: "prev" | "next") => () => {
    if (type === "next") {
      setNextBtnClick(true);
    } else {
      setPrevBtnClick(true);
    }
  };
  const pressUp = (type: "prev" | "next") => () => {
    if (type === "next") {
      nextAudio.load();
      nextAudio.play();
      setNextBtnClick(false);
    } else {
      setPrevBtnClick(false);
    }
  };

  return (
    <BottomLayer style={style} visible={visible}>
      {justHome ? (
        <View style={styles.contentView}>
          <PrevBtn
            ref={nextRef}
            onTouchStart={pressDown("prev")}
            onTouchEnd={pressUp("prev")}
            onMouseDown={pressDown("prev")}
            onMouseUp={pressUp("prev")}
            onClick={goHome}
            style={{
              opacity: prevBtnClick ? 0.7 : 1,
            }}
          >
            <Text.Light_12>{"처음으로"}</Text.Light_12>
          </PrevBtn>
        </View>
      ) : (
        <View style={styles.contentView}>
          <PrevBtn
            ref={prevRef}
            onClick={prevAction}
            onTouchStart={pressDown("prev")}
            onTouchEnd={pressUp("prev")}
            onMouseDown={pressDown("prev")}
            onMouseUp={pressUp("prev")}
            style={{
              opacity: prevBtnClick ? 0.7 : 1,
            }}
          >
            <Text.Light_12>{prevText}</Text.Light_12>
          </PrevBtn>
          <EmptyBox width={5} />
          <PrevBtn
            ref={nextRef}
            onTouchStart={pressDown("next")}
            onTouchEnd={pressUp("next")}
            onMouseDown={pressDown("next")}
            onMouseUp={pressUp("next")}
            style={{
              backgroundColor: rightBtnColor || "auto",
              opacity: nextBtnClick ? 0.7 : 1,
            }}
            onClick={nextAction}
          >
            <Text.Light_12>{nextText}</Text.Light_12>
          </PrevBtn>
        </View>
      )}
    </BottomLayer>
  );
}

export default BottomPrevNext;

const styles: {
  [key: string]: CSSProperties;
} = {
  contentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
};
