import React, { Dispatch, SetStateAction, type FC } from "react";
import type { SachunsungGameSetting } from "../../../types";

const WithAiBot: FC<{
  setGameSetting: Dispatch<SetStateAction<SachunsungGameSetting>>;
  setSettingStep: Dispatch<SetStateAction<number>>;
}> = ({ setGameSetting, setSettingStep }) => {
  return (
    <>
      <div>YOU vs AI</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
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
        </div>
        <div
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
        </div>
      </div>
    </>
  );
};

export default WithAiBot;
