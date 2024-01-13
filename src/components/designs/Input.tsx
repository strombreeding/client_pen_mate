import styled from "styled-components";
import { Text, colors } from "../../styles";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import X_14 from "./X_14";

export const Pressable = styled.div<{ state: "wrong" | "default" }>`
  width: 100%;
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
  ${Text.Subhead}
  display: flex;
  border: 0px;
  text-align: start;
  width: 100%;
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
}> = ({
  text,
  placeHolder,
  maxLength,
  receiveText,
  nextFunction,
  autoFocus,
}) => {
  // const [text, setText] = useState("");
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setText(e.currentTarget.value);
    receiveText(e.currentTarget.value);
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
  return (
    <Pressable state={text.length > maxLength ? "wrong" : "default"}>
      <TextInput
        autoFocus={autoFocus}
        type="text"
        placeholder={placeHolder}
        aria-placeholder="center"
        onFocus={() => {
          console.log("포커스!!");
          // setPlaceHolder("");
        }}
        // defaultValue={text}
        value={text}
        onBlur={(e) => {
          if (e.currentTarget.value.length === 0) {
            // setPlaceHolder(placeText);
          }
          onChangeText(e);
        }}
        onChange={onChangeText}
        onKeyDown={handleKeyDown}
      />
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
