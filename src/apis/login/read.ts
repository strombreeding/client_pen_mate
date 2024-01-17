import axios from "axios";
import { SERVER_URI } from "../../configs/server";

export const getOauthUrl = async (platform: string) => {
  try {
    console.log(SERVER_URI + "social?type=kakao", "");
    const res = await axios.get(SERVER_URI + "social?type=" + platform);
    return res.data.data;
  } catch (err) {
    console.error(err, "에러!!");
  }
};
