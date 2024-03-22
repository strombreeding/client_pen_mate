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
