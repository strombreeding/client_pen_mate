import styled, { CSSProperties } from "styled-components";
import { Text } from "../../assets/fontStyles";
import { Pressable, View } from "../../nativeView";
import { EmptyBox } from "../../styles";
import BottomLayer from "./BottomLayer";
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setCanPopstateEvent } from "../../store/slices/appState";
import { usePageState } from "../../hooks/getVisitedPage";
import { useCustomNavi } from "../../utils/navigate";

const PrevBtn = styled(Pressable)`
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
}: {
  style: React.CSSProperties;
  visible?: boolean;
}) {
  const pageState = usePageState();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const goBack = () => {
    console.log(pageState);
    dispatch(setCanPopstateEvent(true));
    navigate(pageState[0]);
  };
  return (
    <BottomLayer style={style}>
      <View style={styles.contentView}>
        <PrevBtn onClick={goBack}>
          <Text.Light_12>{"이전"}</Text.Light_12>
        </PrevBtn>
        <EmptyBox width={5} />
        <PrevBtn>
          <Text.Light_12>gd</Text.Light_12>
        </PrevBtn>
      </View>
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
