import type { Dispatch, SetStateAction, FC } from "react";
import type { SachunsungGameSetting } from "../../../types";
import { Text } from "../../../styles";

const SelectAiIntellect: FC<{
  setGameSetting: Dispatch<SetStateAction<SachunsungGameSetting>>;
  setSettingStep: Dispatch<SetStateAction<number>>;
}> = ({ setGameSetting, setSettingStep }) => {
  return (
    <>
      <div>AI Intellect </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            margin: 20,
          }}
          onClick={() => {
            setGameSetting((prev) => ({ ...prev, intAI: 5 }));
            setSettingStep(3);
          }}
        >
          <Text.Headline>FOOL</Text.Headline>
        </div>
        <div
          style={{
            margin: 20,
          }}
          onClick={() => {
            setGameSetting((prev) => ({ ...prev, intAI: 3 }));
            setSettingStep(3);
          }}
        >
          <Text.Headline>COLLEGE</Text.Headline>
        </div>
        <div
          style={{
            margin: 20,
          }}
          onClick={() => {
            setGameSetting((prev) => ({ ...prev, intAI: 1 }));
            setSettingStep(3);
          }}
        >
          <Text.Headline>GENIUS</Text.Headline>
        </div>
        <div
          style={{
            margin: 20,
          }}
          onClick={() => {
            setGameSetting((prev) => ({ ...prev, intAI: 0 }));
            setSettingStep(3);
          }}
        >
          <Text.Headline>GOD</Text.Headline>
        </div>
      </div>
    </>
  );
};

export default SelectAiIntellect;
