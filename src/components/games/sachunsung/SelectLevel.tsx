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
        <Text.Esa_Bold_16>난이도</Text.Esa_Bold_16>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text.Esa_Bold_12
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
          </Text.Esa_Bold_12>
          <Text.Esa_Bold_12
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
          </Text.Esa_Bold_12>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text.Esa_Bold_12
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
          </Text.Esa_Bold_12>
          <Text.Esa_Bold_12
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
          </Text.Esa_Bold_12>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text.Esa_Bold_12
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
          </Text.Esa_Bold_12>
          <Text.Esa_Bold_12
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({ ...prev, level: gamelevel.HARD }));
              setSettingStep(1);
            }}
          >
            {" "}
            HARD
          </Text.Esa_Bold_12>
        </div>
      </>
    </div>
  );
};

export default SelectLevel;
