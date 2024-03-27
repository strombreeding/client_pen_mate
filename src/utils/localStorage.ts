import { decrypt, encrypt } from "./crypto";

export const setStorageCrypto = (name: string, value: any) => {
  const cryptoValue = encrypt(value);
  window.localStorage.setItem(name, cryptoValue);
};
export const getStorageCrypto = (name: string) => {
  const encryptValue = window.localStorage.getItem(name);
  if (encryptValue == null) return "";
  console.log("시발");
  const decryptValue = decrypt(encryptValue);
  return decryptValue;
};

export const updateCostState = (updateSource: any) => {
  const updateStateList = Object.entries(updateSource[0]);
  const resultObj: any = {};
  let realKey: any;
  let realValue: any;
  updateStateList.map((item) => {
    const key = item[0]; // cnt 가 들어왔으면
    const value = item[1];
    if (key === "cnt") {
      realValue = value;
    } else if (key === "itemName") {
      realKey = value;
    }
    console.log(realKey, realValue);
    setStorageCrypto(realKey, realValue);
    if (realKey && realValue) {
      resultObj[`${realKey}`] = realValue;
    }
  });

  return resultObj;
};
