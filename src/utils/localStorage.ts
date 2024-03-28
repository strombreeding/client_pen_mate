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

export const updateCostState = (
  updateSource: { cnt: number; item_name: string }[]
) => {
  console.log(updateSource);
  if (Object.keys(updateSource).length === 0) {
    return {};
  }
  const updateStateList = Object.entries(updateSource);

  updateStateList.map((item) => {
    const key = item[0]; // cnt 가 들어왔으면
    const value = item[1];
    if (key === "atata_stone" || key === "atata_point" || key === "energy") {
      setStorageCrypto(key, value);
    }
  });
};
