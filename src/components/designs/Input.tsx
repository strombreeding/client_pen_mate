import styled from "styled-components";
import { colors } from "../../styles";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import X_14 from "./X_14";
import { getTextWidth } from "../../utils/getFontWidth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { editKeyboardHeight } from "../../store/slices/appState";
import { IOS, MOBILE } from "../../configs/device";

export const Pressable = styled.div<{
  state: "wrong" | "default";
  exception: boolean | undefined;
}>`
  width: ${MOBILE ? "100%" : "320px"};
  padding: 14px 30px 14px 30px;
  border: 1px solid
    ${(props) => (props.state === "default" ? colors.Grey200 : colors.Red30)};
  border-radius: 20px;
  justify-content: center;
  flex-direction: row;
  display: flex;
  position: relative;
`;
export const TextInput = styled.input`
  font-family: "Pretendard Regular";
  font-weight: 400;
  font-display: swap;
  font-size: 15px;
  line-height: 20px;
  color: ${(props) => (props.color == null ? colors.Black : props.color)};
  white-space: pre-line;
  display: flex;
  border: 0px;
  text-align: center;
  width: auto;
  outline: none;
  padding: 0px;
  &::placeholder {
    text-align: center;
  }
`;
const Input: React.FC<{
  text: string;
  placeHolder: string;
  maxLength: number;
  receiveText: (text: string) => void;
  nextFunction?: (e?: any) => any;
  autoFocus?: boolean;
  exception?: boolean;
  divRef?: React.MutableRefObject<HTMLDivElement | null>;
}> = ({
  text,
  placeHolder,
  maxLength,
  receiveText,
  nextFunction,
  autoFocus,
  exception,
  divRef,
}) => {
  placeHolder = "냥냥펀치이이이";
  const safeArea = useSelector((state: RootState) => state.appState.safeArea);
  const isWebView = safeArea[0] + safeArea[1] > 5;
  const showKeyboardTime = IOS && !isWebView ? 600 : 200;
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const keyboardRef = useRef(false);
  const minWidth = getTextWidth(placeHolder, 15, "Pretendard Regular") + 20;
  // const maxWidth = getTextWidth("A", 15, "Pretendard Regular");

  // const [text, setText] = useState("");
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setText(e.currentTarget.value);
    const inputText = e.currentTarget.value;
    receiveText(inputText);

    // 입력된 텍스트의 너비를 측정하여 input 요소의 너비를 조절
    if (inputRef.current) {
      const textWidth = inputRef.current.scrollWidth;
      if (inputText.length > placeHolder.length) {
        inputRef.current.style.width = `${textWidth}px`;
      } else {
        inputRef.current.style.width = `${minWidth}px`;
      }
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (nextFunction) nextFunction();
    }
  };

  const actionX = () => {
    // setText("");
    receiveText("");
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleVisualViewPortResize = (e: any) => {
    setFocus(!focus);
    if (!MOBILE) return;
    setTimeout(() => {
      if (window.visualViewport && !keyboardRef.current) {
        keyboardRef.current = true;
        dispatch(
          editKeyboardHeight(window.innerHeight - window.visualViewport.height)
        );
      } else if (window.visualViewport && keyboardRef.current) {
        keyboardRef.current = false;
        dispatch(editKeyboardHeight(0));
      } else {
        alert("키보드 오류");
      }
      if (divRef?.current) {
        divRef.current.scrollTop = 0;
      }
    }, showKeyboardTime);
  };

  useEffect(() => {
    window.visualViewport!.addEventListener("resize", () => {
      if (focus && keyboardRef.current) {
        if (inputRef.current) {
          inputRef.current.blur();
          setFocus(false);
        }
      }
    });
  }, [focus]);

  useEffect(() => {
    try {
      //@ts-ignore
      if (MOBILE && window.ReactNativeWebView.postMessage) {
        setTimeout(() => {
          //@ts-ignore
          window.ReactNativeWebView.postMessage("keyOn");
        }, 1000);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 2500);
      }
    } catch (err: any) {
      console.log("zz");
    }
  }, []);

  return (
    <>
      <Pressable
        exception={exception}
        state={text.length > maxLength ? "wrong" : "default"}
      >
        <TextInput
          id="inputText"
          ref={inputRef}
          style={{ minWidth, width: minWidth }}
          autoFocus={autoFocus}
          // autoFocus={!isWebView ? false : autoFocus}
          type="text"
          onFocus={handleVisualViewPortResize}
          onBlur={handleVisualViewPortResize}
          // placeholder={zz.toString()}
          placeholder={focus ? "" : placeHolder}
          value={text}
          onChange={onChangeText}
          onKeyDown={handleKeyDown}
          onSubmit={(e) => alert("던시벌래마")}
        />
        {text.length > 0 && (
          <X_14
            onClick={actionX}
            style={{
              // position: "relative",
              position: "absolute",
              zIndex: 1,
              right: 17,
              top: 17,
              cursor: "pointer",
            }}
          />
        )}
      </Pressable>
    </>
  );
};

export default Input;
