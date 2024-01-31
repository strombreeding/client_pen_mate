import React, { Dispatch, SetStateAction, type FC } from "react";
import { SachunsungGameSetting, gamelevel } from "../../../types";

const SelectLevel: FC<{
  setGameSetting: Dispatch<SetStateAction<SachunsungGameSetting>>;
  setSettingStep: Dispatch<SetStateAction<number>>;
}> = ({ setGameSetting, setSettingStep }) => {
  return (
    <div>
      <>
        <div>난이도</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
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
          </div>
          <div
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
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
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
          </div>
          <div
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
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
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
          </div>
          <div
            style={{ margin: 20 }}
            onClick={(e) => {
              setGameSetting((prev) => ({ ...prev, level: gamelevel.HARD }));
              setSettingStep(1);
            }}
          >
            {" "}
            HARD
          </div>
        </div>
      </>
    </div>
  );
};

export default SelectLevel;
