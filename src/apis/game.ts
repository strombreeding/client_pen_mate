import axios from "axios";
import { CostObjProps } from "../pages/SelectGames";
import { SERVER_URI } from "../configs/server";
import { jwtApiRequest } from "./jwtApiService";

export const checkCost = async (costObj: CostObjProps[]): Promise<boolean> => {
  try {
    const res = await jwtApiRequest(SERVER_URI + "user/checkCost", "POST", {
      costObj,
      at: window.localStorage.getItem("at"),
    });
    return res;
  } catch (err: any) {
    const errMsg = err.response.data.message;
    if (errMsg.includes("not enough")) {
      throw new Error("재화가 부족합니다.");
    } else {
      throw new Error("문제가 발생했습니다.");
    }
  }
};
