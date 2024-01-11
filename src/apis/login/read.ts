import axios from "axios";
import { SERVER_URI } from "../../configs/server";

export const getUrl = async () => {
  await axios.get(SERVER_URI + "");
};
