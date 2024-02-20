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
          <Text.Esa_Bold_16>FOOL</Text.Esa_Bold_16>
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
          <Text.Esa_Bold_16>COLLEGE</Text.Esa_Bold_16>
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
          <Text.Esa_Bold_16>GENIUS</Text.Esa_Bold_16>
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
          <Text.Esa_Bold_16>GOD</Text.Esa_Bold_16>
        </div>
      </div>
    </>
  );
};

export default SelectAiIntellect;
