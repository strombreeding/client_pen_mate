import { decrypt, encrypt } from "./crypto";

export const setStorageCrypto = (name: string, value: any) => {
  const cryptoValue = encrypt(value);
  window.localStorage.setItem(name, cryptoValue);
};
export const getStorageCrypto = (name: string) => {
  const encryptValue = window.localStorage.getItem(name);
  if (encryptValue == null) return "";
  const decryptValue = decrypt(encryptValue);
  return decryptValue;
};

export const updateCostState = (updateSource: any) => {
  const updateStateList = Object.entries(updateSource);
  updateStateList.map((item) => {
    const key = item[0];
    const value = item[1];
    setStorageCrypto(key, value);
  });
};
