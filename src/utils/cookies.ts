import Cookies from "js-cookie";
import { decrypt, encrypt } from "./crypto";

export const setEncryptedCookie = (name: string, data: any) => {
  try {
    const encryptData = encrypt(data);
    Cookies.set(name, encryptData);
    return true;
  } catch (err) {
    console.error("쿠키 저장 실패");
  }
};
export const getDecryptedCookie = (name: string) => {
  try {
    const cookieData = Cookies.get(name);
    if (!cookieData) throw new Error(name + " 이름의 쿠키가 없습니다.");

    const decryptData = decrypt(cookieData);
    return decryptData;
  } catch (err: any) {
    console.error("쿠키 불러오기 실패 " + err.message);
  }
};
