import CryptoJS from "crypto-js";

const secretKey: string = process.env.REACT_APP_CRYPTO_SECRET_KEY || "secret";

export const encrypt = (data: any) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return ciphertext;
};

export const decrypt = (encryptString: string) => {
  // Decrypt
  console.log(encryptString);
  const bytes = CryptoJS.AES.decrypt(encryptString, secretKey);
  console.log(bytes);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(decryptedData);
  return decryptedData;
};
