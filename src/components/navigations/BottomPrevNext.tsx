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
import { useEffect } from "react";

export const PrevBtn = styled(Pressable)`
  flex: 1;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  padding: 16px 12px 17px 11px;
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
}: {
  style?: React.CSSProperties;
  visible: boolean;
  prevText?: string;
  nextText?: string;
  nextAction?: () => void;
  prevAction?: () => void;
  justHome?: boolean;
}) {
  const navigate = useNavigate();
  const pageState = usePageState();
  const dispatch = useDispatch<AppDispatch>();

  if (prevAction == null) {
    prevAction = function () {
      window.history.back();
    };
  }
  if (prevText == null) prevText = "이전";
  if (nextText == null) nextText = "스토어";

  const goHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <BottomLayer style={style} visible={visible}>
      {justHome ? (
        <View style={styles.contentView}>
          <PrevBtn onClick={goHome}>
            <Text.Light_12>{"처음으로"}</Text.Light_12>
          </PrevBtn>
        </View>
      ) : (
        <View style={styles.contentView}>
          <PrevBtn onClick={prevAction}>
            <Text.Light_12>{prevText}</Text.Light_12>
          </PrevBtn>
          <EmptyBox width={5} />
          <PrevBtn onClick={nextAction}>
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
