import styled, { keyframes } from "styled-components";
import {
  EmptyBox,
  FadeInPopup,
  FadeOutPopup,
  Text,
  colors,
} from "../../styles";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { TouchEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setOverFlow, showModal } from "../../store/slices/appState";
import { SCREEN_HEIGHT } from "../../configs/device";

const BG = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: #000000;
  opacity: 0.7;
  z-index: 1;
  cursor: pointer;
  animation: ${(props) => (props.show ? FadeInPopup : FadeOutPopup)} ease-in-out
    0.3s;
`;
const Modal: React.FC<{
  title: string;
  content: string;
  leftText: string;
  rightText: string;
  rightBtnAction: () => any;
}> = ({ title, content, leftText, rightText, rightBtnAction }) => {
  const modalState = useSelector((state: RootState) => state.appState.modal);
  const dispatch = useDispatch<AppDispatch>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState(modalState);

  const action = () => {
    rightBtnAction();
    setTimeout(() => {
      setState(false);
    }, 300);
  };
  const close = () => {
    setState(false);
    setTimeout(() => {
      //   dispatch(setOverFlow(false));
      dispatch(showModal(false));
    }, 500);
  };
  const [y, setY] = useState(0);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    // console.log(e.touches[0].clientY);
    // setY(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // const deltaY = e.touches[0].clientY - startY.current;
    const deltaY = e.touches[0].clientY - startY.current;
    // console.log(deltaY);
    setY(deltaY * -1);

    if (deltaY < 0) return;

    if (deltaY > 150) {
      close();
    }
  };

  return (
    <>
      {modalState && <BG onClick={close} show={modalState} />}

      <View y={y} ref={containerRef} show={state}>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={(e) => {
            console.log(y);
            if (y * -1 < 150) setY(0);
          }}
          style={{
            width: "100%",
            height: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 45,
              height: 6,
              backgroundColor: "#D9D9D9",
              borderRadius: 100,
              cursor: "pointer",
            }}
          />
        </div>

        <EmptyBox height={10} />
        <div>
          <Text.Title3>{title}</Text.Title3>
        </div>

        <EmptyBox height={20} />

        <div>
          <Text.Subhead color={colors.Grey500} style={{ textAlign: "center" }}>
            {content}
          </Text.Subhead>
        </div>

        <EmptyBox height={40} />

        <BtnContainer>
          <PrimaryBtn
            exception={true}
            onClick={action}
            text={rightText}
            state={"default"}
          />
        </BtnContainer>
      </View>
      {/* <EmptyBox height={500} /> */}
    </>
  );
};

export default Modal;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const slide = keyframes`
    from{
        bottom: ${-500}px
    }
    to{
        bottom:${0}px
    }
    `;
const slideDown = (bottom: number) => keyframes`
    from{
        bottom: ${bottom}px
    }
    to{
        bottom:${-500}px
    }
`;
const View = styled.div<{ show: boolean; y: number }>`
  width: calc(100%-1);
  position: fixed;
  right: 0;
  bottom: ${(props) => props.y}px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px 30px 30px;
  border: 1px solid ${colors.Grey200};
  border-radius: 30px;
  background-color: white;
  animation: ${(props) => (props.show ? slide : slideDown(props.y))} ease-in-out
    0.5s;
  z-index: 2;
`;
