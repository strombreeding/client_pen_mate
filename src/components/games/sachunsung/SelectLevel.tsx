import React, { Dispatch, SetStateAction, type FC } from "react";
import { SachunsungGameSetting, gamelevel } from "../../../types";
import { Text } from "../../../assets/fontStyles";

const SelectLevel: FC<{
  setGameSetting: Dispatch<SetStateAction<SachunsungGameSetting>>;
  setSettingStep: Dispatch<SetStateAction<number>>;
}> = ({ setGameSetting, setSettingStep }) => {
  return (
    <div>
      <>
        <Text.Spo_Medium_16>난이도</Text.Spo_Medium_16>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text.Spo_Medium_12
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({
                ...prev,
                level: gamelevel.BEGINNER,
              }));
              setSettingStep(1);
            }}
          >
            BEGINNER{" "}
          </Text.Spo_Medium_12>
          <Text.Spo_Medium_12
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({
                ...prev,
                level: gamelevel.FRESHMAN,
              }));
              setSettingStep(1);
            }}
          >
            {" "}
            FRESHMAN
          </Text.Spo_Medium_12>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text.Spo_Medium_12
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({
                ...prev,
                level: gamelevel.SOPHOMORE,
              }));
              setSettingStep(1);
            }}
          >
            SOPHOMORE{" "}
          </Text.Spo_Medium_12>
          <Text.Spo_Medium_12
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({
                ...prev,
                level: gamelevel.JUNIOR,
              }));
              setSettingStep(1);
            }}
          >
            {" "}
            JUNIOR
          </Text.Spo_Medium_12>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text.Spo_Medium_12
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({
                ...prev,
                level: gamelevel.SENIOR,
              }));
              setSettingStep(1);
            }}
          >
            SENIOR{" "}
          </Text.Spo_Medium_12>
          <Text.Spo_Medium_12
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({ ...prev, level: gamelevel.HARD }));
              setSettingStep(1);
            }}
          >
            {" "}
            HARD
          </Text.Spo_Medium_12>
        </div>
      </>
    </div>
  );
};

export default SelectLevel;
