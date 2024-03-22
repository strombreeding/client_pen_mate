import axios from "axios";
import { CostObjProps } from "../pages/SelectGames";
import { SERVER_URI } from "../configs/server";
import { jwtApiRequest } from "./jwtApiService";

export interface IRecordGameProps {
  gameTitle: string;
  costObj: CostObjProps[];
}

export const recordGame = async (recordProps: IRecordGameProps) => {
  try {
    const res = await jwtApiRequest(SERVER_URI + "game/new", "POST", {
      recordProps,
      at: window.localStorage.getItem("at"),
    });
    return res;
  } catch (err: any) {
    const errMsg = err.response.data.message;
    console.log(errMsg);
    if (errMsg === "not enough energy" || errMsg === "not enough atataStone") {
      throw new Error("재화가 부족합니다.");
    } else {
      throw new Error("문제가 발생했습니다.");
    }
  }
};
