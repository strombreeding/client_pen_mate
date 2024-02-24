import type { Dispatch, SetStateAction, FC } from "react";
import type { SachunsungGameSetting } from "../../../types";
import { Text } from "../../../assets/fontStyles";

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
          <Text.Spo_Medium_16>FOOL</Text.Spo_Medium_16>
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
          <Text.Spo_Medium_16>COLLEGE</Text.Spo_Medium_16>
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
          <Text.Spo_Medium_16>GENIUS</Text.Spo_Medium_16>
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
          <Text.Spo_Medium_16>GOD</Text.Spo_Medium_16>
        </div>
      </div>
    </>
  );
};

export default SelectAiIntellect;
