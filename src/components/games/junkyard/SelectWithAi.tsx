import React, { Dispatch, SetStateAction, type FC } from "react";
import type { SachunsungGameSetting } from "../../../types";
import { Text } from "../../../assets/fontStyles";

const WithAiBot: FC<{
  setGameSetting: Dispatch<SetStateAction<SachunsungGameSetting>>;
  setSettingStep: Dispatch<SetStateAction<number>>;
}> = ({ setGameSetting, setSettingStep }) => {
  return (
    <>
      {/* <Text.Spo_Medium_12>YOU vs AI</Text.Spo_Medium_12>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Text.Spo_Medium_12
          style={{ margin: 20 }}
          onClick={(e) => {
            setGameSetting((prev) => ({
              ...prev,
              matchAI: true,
            }));
            setSettingStep(2);
          }}
        >
          Do Fight!{" "}
        </Text.Spo_Medium_12>
        <Text.Spo_Medium_12
          style={{ margin: 20 }}
          onClick={(e) => {
            setGameSetting((prev) => ({
              ...prev,
              matchAI: false,
            }));
            setSettingStep(3);
          }}
        >
          {" "}
          Im Chicken
        </Text.Spo_Medium_12>
      </div> */}
    </>
  );
};

export default WithAiBot;
