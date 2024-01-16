import styled from "styled-components";
import { Text, colors } from "../../styles";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import X_14 from "./X_14";
import { getTextWidth } from "../../utils/getFontWidth";

export const Pressable = styled.div<{
  state: "wrong" | "default";
  exception: boolean | undefined;
}>`
  max-width: 300px;
  width: ${(props) => (props.exception == undefined ? "300px" : "100%")};
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
  text-align: start;
  width: auto;
  outline: none;
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
}> = ({
  text,
  placeHolder,
  maxLength,
  receiveText,
  nextFunction,
  autoFocus,
  exception,
}) => {
  placeHolder = "냥냥펀치이이이";
  const minWidth = getTextWidth(placeHolder, 15, "Pretendard Regular") + 5;
  // const maxWidth = getTextWidth("A", 15, "Pretendard Regular");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const [text, setText] = useState("");
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setText(e.currentTarget.value);
    const inputText = e.currentTarget.value;
    receiveText(inputText);
    // 입력된 텍스트의 너비를 측정하여 input 요소의 너비를 조절
    if (inputRef.current) {
      const textWidth = inputRef.current.scrollWidth;
      console.log(textWidth);
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
  console.log(exception, "11");
  return (
    <Pressable
      exception={exception}
      state={text.length > maxLength ? "wrong" : "default"}
    >
      <TextInput
        style={{ minWidth, width: minWidth }}
        ref={inputRef}
        autoFocus={autoFocus}
        type="text"
        placeholder={placeHolder}
        value={text}
        onChange={onChangeText}
        onKeyDown={handleKeyDown}
      />
      <Text.Subhead></Text.Subhead>
      {text.length > 0 && (
        <X_14
          onClick={actionX}
          style={{
            position: "absolute",
            zIndex: 1,
            right: 17,
            cursor: "pointer",
          }}
        />
      )}
    </Pressable>
  );
};

export default Input;
