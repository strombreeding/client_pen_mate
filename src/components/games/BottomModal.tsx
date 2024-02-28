import styled, { keyframes } from "styled-components";
import { Pressable, ScrollView, View } from "../../nativeView";
import { Text } from "../../assets/fontStyles";
import { langueage } from "../../configs/language";
import { EmptyBox } from "../../styles";
import { useNavigate } from "react-router-dom";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import BottomLayer from "../navigations/BottomLayer";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../configs/device";
import { GameTitle, setGameState } from "../../store/slices/gameState";
import { imgSrc } from "../../assets/img";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { usePageState } from "../../hooks/getVisitedPage";

interface IBottomModalProps {
  visible: boolean;
}

const fadeIn = keyframes`
  from{
    bottom:0px;
    height: 0;
    opacity: 0;
  }
  to{
    bottom:${SCREEN_HEIGHT / 3}px;
    opacity: 1;
    height: auto;
  }
`;

const fadeOut = keyframes`
  from{
    opacity: 1;
    bottom:${SCREEN_HEIGHT / 3}px;

    height: auto;

  }
  to{
    bottom:0px;

    opacity: 0;
    height: 0;

  }
`;
const PopupLayer = styled(View)<{ visible?: boolean }>`
  position: absolute;
  max-height: ${SCREEN_HEIGHT}px;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding: 25px 20px 25px 20px;
  border-radius: 50px 50px 50px 50px;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px) contrast(60%);
  -webkit-backdrop-filter: blur(10px) contrast(60%);

  animation: ${(props) => (props.visible ? fadeIn : fadeOut)} linear 0.3s
    forwards;

  z-index: ${(props) => (props.visible ? 100 : -1)};
`;

const Layer = styled.div`
  /* background-color: white; */
  background-color: rgba(0, 0, 0, 0.2);
  /* background-color: rgba(255, 255, 255, 0.2); */
  position: absolute;
  top: 0.7px;
  left: 0;
  right: 0;
  border-radius: 50px 50px 50px 50px;
  width: 100%;
  height: 100%;
  /* backdrop-filter: blur(10px) contrast(50%);
    -webkit-backdrop-filter: blur(10px) contrast(60%); */

  will-change: transform;
`;
function BottomModal({ visible }: IBottomModalProps) {
  const [viewHeight, setViewHeight] = useState(0);
  const navigation = useNavigate();
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const dispatch = useDispatch<AppDispatch>();
  const scrollViewHeight = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollViewHeight.current) {
      const elementHeight =
        scrollViewHeight.current.getBoundingClientRect().top;
      setViewHeight(SCREEN_HEIGHT - elementHeight - 50 - 100 - 36);
    }
  }, []);

  const goBack = () => {
    if (visible) {
      setTimeout(() => {
        dispatch(setGameState({ gameTitle: undefined }));
      }, 200);
      return;
    }
  };

  return (
    <PopupLayer ref={scrollViewHeight} visible={visible}>
      <Layer />
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text.SemiBold_32>{gameState.gameTitle}</Text.SemiBold_32>
        <EmptyBox height={20} />
      </View>
      <ScrollView
        style={{
          width: "100%",
          maxHeight: viewHeight,
        }}
      >
        <ContentBox visible={true}>
          {/* <EmptyBox width={SCREEN_WIDTH} height={SCREEN_HEIGHT / 2.5} /> */}
          <ContentView>
            <ContentPressable>
              <Text.Spo_Regular_14>2p</Text.Spo_Regular_14>
            </ContentPressable>

            <EmptyBox width={15} />

            <ContentPressable>
              <Text.Spo_Regular_14>AI</Text.Spo_Regular_14>
            </ContentPressable>

            <EmptyBox width={15} />

            <ContentPressable>
              <Text.Spo_Regular_14>매칭</Text.Spo_Regular_14>
            </ContentPressable>
          </ContentView>

          <EmptyBox height={15} />

          <ContentView>
            <ContentPressable style={{ borderRadius: "50px 0px 0px 50px" }}>
              <Text.Spo_Regular_14>단판</Text.Spo_Regular_14>
            </ContentPressable>
            <EmptyBox width={1} />
            <ContentPressable style={{ borderRadius: "0px 50px 50px 0px" }}>
              <Text.Spo_Regular_14>정식</Text.Spo_Regular_14>
            </ContentPressable>
          </ContentView>

          <EmptyBox height={15} />
        </ContentBox>

        <EmptyBox height={15} />
      </ScrollView>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <BottomBtn onClick={goBack} left={true}>
          <Text.Regular_16>{langueage.prevBtn[0]}</Text.Regular_16>
        </BottomBtn>
        <EmptyBox width={8} />
        <BottomBtn left={false} active={visible}>
          <Text.Regular_16 color={visible ? "white" : "#A5A5A5"}>
            {"시작"}
          </Text.Regular_16>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <EmptyBox width={5} />
            <Text.Light_12>-{1000}</Text.Light_12>
            <img
              src={imgSrc.atata_un}
              style={{
                marginTop: -1,
                width: 20,
                height: 20,
              }}
            />
          </View>
        </BottomBtn>
      </View>
      <EmptyBox height={15} />
    </PopupLayer>
  );
}

export default BottomModal;

const ContentPressable = styled(Pressable)`
  flex: 1;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  padding: 10px 12px 10px 12px;
`;

const ContentView = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const BottomBtn = styled(Pressable)<{ left: boolean; active?: boolean }>`
  background-color: ${(props) =>
    props.left
      ? "rgba(255, 255, 255, 0.2)"
      : !props.left && props.active
      ? "#304FFE"
      : "#F0F0F0"};
  border: ${(props) => !props.active && "1px solid rgba(255, 255, 255, 0.5)"};
  padding: 12px 16px 11px 17px;
  border-radius: 30px;
  height: 60px;
  display: flex;
  flex: 1;
  backdrop-filter: blur(40px);
  align-items: center;
  justify-content: center;
`;

const slideUp = keyframes`
  from{
    height: 0px;
  }
  to{
    height: 100%;
  }
`;
const slideDown = keyframes`
  from{
    height: 100%;
  }
  to{
    height: 0px;
  }
`;
const ContentBox = styled(View)<{ visible: boolean }>`
  flex-direction: column;
  display: ${(props) => (props.visible ? "flex" : "none")};
  animation: ${(props) => (props.visible ? slideUp : slideDown)} 0.3s linear
    forwards;

  cursor: pointer;
`;
